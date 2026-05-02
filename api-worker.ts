/**
 * Cloudflare Worker wrapper for OPC Global API
 * Uses nodejs_compat for Express.js compatibility
 */

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname.startsWith("/api/")) {
      try {
        // Import the Express server (lazy loaded for cold starts)
        const { createServer } = await import("../server/index");
        const server = await createServer({ env });

        // Convert Request to Node.js IncomingMessage
        const req = await requestToNodeRequest(request);

        // Get the response
        const response = await new Promise<Response>((resolve, reject) => {
          const res = server._onNetServerRequest(req);
          if (!res) {
            // No response generated, return 404
            resolve(new Response("Not Found", { status: 404 }));
            return;
          }
          resolve(new Response(res.body, {
            status: res.statusCode,
            headers: res.headers,
          }));
        });

        return response;
      } catch (error) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Static file serving handled by Cloudflare Pages
    return new Response("Not Found", { status: 404 });
  },
};

// Simple request conversion (placeholder - actual implementation would be more complex)
async function requestToNodeRequest(request: Request): Promise<any> {
  // This is a placeholder - full implementation would convert Fetch Request to Node IncomingMessage
  return {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    body: await request.text(),
  };
}

interface Env {
  DB: D1Database;
  HYPERDRIVE: Hyperdrive;
  ASSETS_BUCKET: R2Bucket;
  NODE_ENV: string;
}