import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { getLogtoConfigForMiddleware, safeLogtoMiddleware } from "./logto";
import * as db from "../db";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

async function authenticateViaLogto(
  req: CreateExpressContextOptions["req"]
): Promise<User | null> {
  const config = getLogtoConfigForMiddleware();
  if (!config) return null;

  try {
    const success = await safeLogtoMiddleware(config, req as any);
    if (!success) return null;

    const logtoUser = (req as any).user;
    if (!logtoUser?.isAuthenticated || !logtoUser?.claims?.sub) return null;

    const logtoId = logtoUser.claims.sub;
    const openId = `logto_${logtoId}`;

    let user = await db.getUserByOpenId(openId);
    if (!user) {
      await db.upsertUser({
        openId,
        name: logtoUser.claims.name || null,
        email: logtoUser.claims.email || null,
        loginMethod: "logto",
        lastSignedIn: new Date(),
      });
      user = await db.getUserByOpenId(openId);
    }

    return user ?? null;
  } catch (error) {
    console.warn("[Logto] Context auth failed:", (error as any)?.message || "unknown");
    return null;
  }
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  const user = await authenticateViaLogto(opts.req);

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
