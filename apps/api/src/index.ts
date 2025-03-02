import { Hono } from "hono";
import { serve as serveHono } from "@hono/node-server";
import { cors } from "hono/cors";
import { inngest } from "./inngest/inngest.js";
import { serve as serveInngest } from "inngest/hono";

// inngest functions
import { handleFeedback } from "./inngest/feedbackHandler.js";
import { generateFakeMatch } from "./inngest/matchGeneratory.js"
import { cancelUnansweredMatches } from "./inngest/timeoutHandler.js";

// router
import matchRouter from "./routes/matches.js";

const app = new Hono();
const inngestFunctions = [handleFeedback, generateFakeMatch, cancelUnansweredMatches]

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (c) => {
  return c.text("Hello, Repio API!");
});

app.route("/api/v1", matchRouter);

app.use("/api/inngest", serveInngest({ client: inngest, functions: inngestFunctions }));

app.post("/api/v1/feedback/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  
  // Send event to Inngest
  await inngest.send({
    name: "feedback.received",
    data: {
      matchId: id,
      feedback: body.feedback,
      timestamp: new Date().toISOString()
    }
  });
  
  return c.json({ success: true, message: "Feedback received" });
});

const port = 3001;

serveHono({ fetch: app.fetch, port });

console.log(`Server running on http://localhost:${port}`);