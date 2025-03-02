import { inngest } from "./inngest.js";
import { db } from "../db/db.js";
import { matches } from "../db/schema.js";

import { eq } from "drizzle-orm";

export const handleFeedback = inngest.createFunction(
  { id: "Handle Feedback" },
  { event: "feedback.received" },
  async ({ event }) => {
    const { matchId, feedback } = event.data;

    await db
      .update(matches)
      .set({
        feedback,
        status: "done",
      })
      .where(eq(matches.id, matchId));

    return { success: true };
  }
);
