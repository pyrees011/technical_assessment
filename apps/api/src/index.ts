import { Hono } from "hono";
import { serve } from "@hono/node-server";

// router
import matchRouter from "./routes/matches.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, Repio API!");
});

app.route("/matches", matchRouter);

const port = 3001;

serve({ fetch: app.fetch, port });

console.log(`🔥 Server running on http://localhost:${port}`);
