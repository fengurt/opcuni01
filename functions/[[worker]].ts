import { Hono } from "hono";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { logger } from "hono/logger";
import { trpcHandler } from "./api/trpc";
import { dataRoutes } from "./api/data";

type Env = {
  DB: D1Database;
  HYPERDRIVE: Hyperdrive;
  ASSETS_BUCKET_BUCKET: R2Bucket;
  Bindings: {
    NODE_ENV: string;
  };
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", logger());
app.use("*", compress());
app.use("*", cors({
  origin: ["https://opcglobal.ai", "https://www.opcglobal.ai", "http://localhost:5173"],
  credentials: true,
}));

// Health check
app.get("/health", (c) => c.json({ status: "ok", timestamp: Date.now() }));

// API Routes
app.route("/api/trpc", trpcHandler);
app.route("/api/data", dataRoutes);

// Fallback to static files (for Cloudflare Pages)
app.get("*", async (c) => {
  const url = new URL(c.req.url);
  const pathname = url.pathname;

  // Serve static assets from R2 or dist/public
  const cacheKey = `static:${pathname}`;

  try {
    const object = await c.env.ASSETS_BUCKET.get(pathname);
    if (object) {
      return c.body(object.body, {
        headers: {
          "Content-Type": getContentType(pathname),
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch {
    // R2 not available, continue to static files
  }

  // Return 404 for API routes that don't exist
  if (pathname.startsWith("/api/")) {
    return c.json({ error: "API endpoint not found" }, 404);
  }

  // Serve index.html for client-side routing
  return c.html("<!-- Cloudflare Pages -->", 404);
});

function getContentType(path: string): string {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".css")) return "text/css; charset=utf-8";
  if (path.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (path.endsWith(".json")) return "application/json; charset=utf-8";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".ico")) return "image/x-icon";
  return "application/octet-stream";
}

export default app;