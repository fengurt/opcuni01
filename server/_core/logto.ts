import type { LogtoExpressConfig } from "@logto/express";
import { withLogto } from "@logto/express";
import NodeClient from "@logto/node";
import { Router } from "express";
import type { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { ENV } from "./env";
import * as db from "../db";

// 健康检查状态
let logtoAvailable = true;
let lastHealthCheck = 0;
const HEALTH_CHECK_INTERVAL = 60_000;

const LOGTO_ROUTE_PREFIX = "/api/logto";

function getLogtoConfig(): LogtoExpressConfig {
  const baseUrl = ENV.isProduction
    ? (process.env.VITE_APP_URL || "https://www.opcglobal.cn")
    : `http://localhost:${process.env.PORT || "3000"}`;

  return {
    endpoint: ENV.logtoEndpoint,
    appId: ENV.logtoAppId,
    appSecret: ENV.logtoAppSecret,
    baseUrl,
    scopes: ["openid", "profile", "email"],
  };
}

declare module "express-session" {
  interface SessionData {
    logtoUser?: {
      sub: string;
      name?: string;
      email?: string;
      picture?: string;
    };
    [key: string]: any;
  }
}

class ExpressStorage {
  constructor(private request: Request) {}

  async setItem(key: string, value: string) {
    (this.request.session as any)[key] = value;
  }

  async getItem(key: string): Promise<string | null> {
    const value = (this.request.session as any)[key];
    if (value === undefined) return null;
    return String(value);
  }

  async removeItem(key: string) {
    (this.request.session as any)[key] = undefined;
  }
}

function createNodeClient(req: Request, res: Response, config: LogtoExpressConfig): InstanceType<typeof NodeClient> {
  const storage = new ExpressStorage(req);
  return new NodeClient(config, {
    storage,
    navigate: (url: string) => {
      res.redirect(url);
    },
  });
}

async function checkLogtoHealth(): Promise<boolean> {
  const now = Date.now();
  if (now - lastHealthCheck < HEALTH_CHECK_INTERVAL) {
    return logtoAvailable;
  }
  lastHealthCheck = now;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${ENV.logtoEndpoint}oidc/.well-known/openid-configuration`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    logtoAvailable = res.ok;
  } catch {
    logtoAvailable = false;
  }

  if (!logtoAvailable) {
    console.warn("[Logto] Endpoint unreachable, Logto auth temporarily disabled");
  }
  return logtoAvailable;
}

function createSafeAuthRoutes(config: LogtoExpressConfig): Router {
  const router = Router();

  // 登录
  router.get(`${LOGTO_ROUTE_PREFIX}/sign-in`, async (req: Request, res: Response) => {
    try {
      const healthy = await checkLogtoHealth();
      if (!healthy) {
        return res.redirect("/?logto_error=unavailable");
      }
      const client = createNodeClient(req, res, config);
      await client.signIn({
        ...config.signInOptions,
        redirectUri: `${config.baseUrl}${LOGTO_ROUTE_PREFIX}/sign-in-callback`,
      });
    } catch (error: any) {
      console.error("[Logto] Sign-in error:", error?.message || error);
      if (!res.headersSent) {
        return res.redirect("/?logto_error=sign_in_failed");
      }
    }
  });

  // OAuth 回调
  router.get(`${LOGTO_ROUTE_PREFIX}/sign-in-callback`, async (req: Request, res: Response) => {
    try {
      const healthy = await checkLogtoHealth();
      if (!healthy) {
        return res.redirect("/?logto_error=unavailable");
      }
      const client = createNodeClient(req, res, config);
      const callbackUrl = `${config.baseUrl}${req.originalUrl}`;
      await client.handleSignInCallback(callbackUrl);

      await new Promise<void>((resolve, reject) => {
        (req.session as any).save((err: any) => err ? reject(err) : resolve());
      });
      if (!res.headersSent) {
        return res.redirect("/");
      }
    } catch (error: any) {
      console.error("[Logto] Sign-in callback error:", error?.message || error);
      if (!res.headersSent) {
        const errorType = error?.message?.includes("session") ? "session_expired" : "callback_failed";
        return res.redirect(`/?logto_error=${errorType}`);
      }
    }
  });

  // 登出
  router.get(`${LOGTO_ROUTE_PREFIX}/sign-out`, async (req: Request, res: Response) => {
    try {
      const client = createNodeClient(req, res, config);
      await client.signOut(config.baseUrl);
    } catch (error: any) {
      console.error("[Logto] Sign-out error:", error?.message || error);
      if (!res.headersSent) {
        return res.redirect("/");
      }
    }
  });

  // 用户信息
  router.get(`${LOGTO_ROUTE_PREFIX}/user`, async (req: Request, res: Response) => {
    try {
      const success = await safeWithLogto(config, req);
      if (!success) {
        res.json({ authenticated: false, user: null, error: "logto_unavailable" });
        return;
      }

      if (!(req as any).user?.isAuthenticated || !(req as any).user?.claims?.sub) {
        res.json({ authenticated: false, user: null });
        return;
      }

      const claims = (req as any).user.claims;
      const logtoId = claims.sub;
      const name = (claims.name as string) || null;
      const email = (claims.email as string) || null;

      let existingUser = await db.getUserByOpenId(`logto_${logtoId}`);

      if (!existingUser) {
        await db.upsertUser({
          openId: `logto_${logtoId}`,
          name,
          email,
          loginMethod: "logto",
          lastSignedIn: new Date(),
        });
        existingUser = await db.getUserByOpenId(`logto_${logtoId}`);
      } else {
        await db.upsertUser({
          openId: `logto_${logtoId}`,
          name: name || existingUser.name,
          email: email || existingUser.email,
          lastSignedIn: new Date(),
        });
      }

      res.json({
        authenticated: true,
        user: existingUser,
        claims: { sub: logtoId, name, email, picture: claims.picture || null },
      });
    } catch (error) {
      console.error("[Logto] Error fetching user info:", error);
      res.status(500).json({ error: "Failed to get user info", authenticated: false });
    }
  });

  // 认证状态
  router.get(`${LOGTO_ROUTE_PREFIX}/status`, async (req: Request, res: Response) => {
    try {
      const success = await safeWithLogto(config, req);
      if (!success) {
        res.json({ authenticated: false, claims: null, logtoAvailable: false });
        return;
      }
      res.json({
        authenticated: (req as any).user?.isAuthenticated ?? false,
        claims: (req as any).user?.claims ?? null,
        logtoAvailable: true,
      });
    } catch {
      res.json({ authenticated: false, claims: null, logtoAvailable: false });
    }
  });

  return router;
}

export async function safeWithLogto(
  config: LogtoExpressConfig,
  req: Request
): Promise<boolean> {
  if (!logtoAvailable) return false;

  try {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Logto withLogto timeout"));
      }, 8000);

      const middleware = withLogto(config);
      middleware(req as any, {} as any, (err?: any) => {
        clearTimeout(timeout);
        if (err) reject(err);
        else resolve();
      });
    });
    return true;
  } catch (error: any) {
    console.warn("[Logto] withLogto failed:", error?.message || "unknown error");
    return false;
  }
}

export function registerLogtoRoutes(app: Express) {
  if (!ENV.logtoEndpoint || !ENV.logtoAppId) {
    console.warn("[Logto] Not configured (missing LOGTO_ENDPOINT or LOGTO_APP_ID). Skipping.");
    return;
  }

  const config = getLogtoConfig();

  app.use(cookieParser());
  app.use(
    session({
      secret: ENV.logtoCookieSecret,
      resave: false,
      saveUninitialized: false,
      name: "logto_session",
      cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: ENV.isProduction,
        sameSite: "lax",
      },
    })
  );

  app.use(createSafeAuthRoutes(config));

  checkLogtoHealth().then((available) => {
    if (available) {
      console.log("[Logto] Routes registered and endpoint is reachable");
    } else {
      console.warn("[Logto] Routes registered but endpoint is currently unreachable");
    }
  });
}

export function getLogtoConfigForMiddleware(): LogtoExpressConfig | null {
  if (!ENV.logtoEndpoint || !ENV.logtoAppId) return null;
  if (!logtoAvailable) return null;
  return getLogtoConfig();
}

export { safeWithLogto as safeLogtoMiddleware };
