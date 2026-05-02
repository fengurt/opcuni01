import { Hono } from "hono";
import { trpcHandler } from "./trpc";

const api = new Hono();

api.route("/trpc", trpcHandler);

export default api;