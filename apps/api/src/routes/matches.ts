import { Hono } from "hono";
import { db } from "../db/db.js";
import { matches } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

const matchRouter = new Hono();

// Schema validation
const MatchSchema = z.object({
    candidateName: z.string(),
    jobTitle: z.string(),
    analysis: z.string(),
    status: z.enum(["in_review", "done", "canceled"]),
  });
  
  const FeedbackSchema = z.object({
    feedback: z.string(),
  });
  
  const StatusSchema = z.object({
    status: z.enum(["in_review", "done", "canceled"]),
  });
  
  matchRouter.post("/matches", async (c) => {
    const body = await c.req.json();
    const parsed = MatchSchema.safeParse(body);
  
    if (!parsed.success) {
      return c.json({ error: "Invalid request body", details: parsed.error }, 400);
    }
  
    const [newMatch] = await db.insert(matches).values({
      candidateName: body.candidateName,
      jobTitle: body.jobTitle,
      analysis: body.analysis,
      status: body.status,
    }).returning();
  
    return c.json(newMatch, 201);
  });
  

  matchRouter.get("/matches", async (c) => {
    const allMatches = await db.select().from(matches);
    return c.json(allMatches);
  });
  

  matchRouter.get("/matches/:id", async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid match ID" }, 400);
  
    const match = await db.select().from(matches).where(eq(matches.id, id));
  
    if (!match.length) return c.json({ error: "Match not found" }, 404);
  
    return c.json(match[0]);
  });
  
  
  matchRouter.patch("/matches/:id/status", async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid match ID" }, 400);
  
    const body = await c.req.json();
    const parsed = StatusSchema.safeParse(body);
  
    if (!parsed.success) {
      return c.json({ error: "Invalid request body", details: parsed.error }, 400);
    }
  
    const [updatedMatch] = await db.update(matches)
      .set({ status: body.status })
      .where(eq(matches.id, id))
      .returning();
  
    if (!updatedMatch) return c.json({ error: "Match not found" }, 404);
  
    return c.json(updatedMatch);
  });
  
  
  matchRouter.patch("/matches/:id/feedback", async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid match ID" }, 400);
  
    const body = await c.req.json();
    const parsed = FeedbackSchema.safeParse(body);
  
    if (!parsed.success) {
      return c.json({ error: "Invalid request body", details: parsed.error }, 400);
    }
  
    const [updatedMatch] = await db.update(matches)
      .set({ feedback: body.feedback, status: "done" })
      .where(eq(matches.id, id))
      .returning();
  
    if (!updatedMatch) return c.json({ error: "Match not found" }, 404);
  
    return c.json(updatedMatch);
  });

export default matchRouter;