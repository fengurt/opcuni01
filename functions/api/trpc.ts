import { initTRPC, TRPCError } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { D1Database, Hyperdrive } from "@cloudflare/workers-types";

// Context type matching Cloudflare Workers
type Context = {
  db: D1Database;
  hyperdrive: Hyperdrive;
  env: {
    NODE_ENV: string;
  };
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Health check
export const healthRouter = router({
  check: publicProcedure.query(() => ({ status: "ok" })),
});

export function createTRPCHandler() {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: healthRouter,
    createContext: () => ({
      db: null as unknown as D1Database,
      hyperdrive: null as unknown as Hyperdrive,
      env: { NODE_ENV: "production" },
    }),
    req: new Request("http://localhost/"),
    opts: {
      responseMeta: {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  });
}

export { TRPCError };