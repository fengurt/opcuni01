import { Hono } from "hono";
import type { D1Database, Hyperdrive } from "@cloudflare/workers-types";

type Env = {
  DB: D1Database;
  HYPERDRIVE: Hyperdrive;
};

const data = new Hono<{ Bindings: Env }>();

// Placeholder data endpoints - these will be connected to actual database
// when D1/Hyperdrive is configured
data.get("/courses", (c) => {
  return c.json({
    courses: [],
    message: "Connect D1/Hyperdrive for real data",
  });
});

data.get("/experts", (c) => {
  return c.json({
    experts: [],
    message: "Connect D1/Hyperdrive for real data",
  });
});

data.get("/milestones", (c) => {
  return c.json({
    milestones: [],
    message: "Connect D1/Hyperdrive for real data",
  });
});

export const dataRoutes = data;