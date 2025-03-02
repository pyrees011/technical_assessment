import { inngest } from "./inngest.js";
import { db } from "../db/db.js";
import { matches } from "../db/schema.js";

import { lt, eq, and } from "drizzle-orm";

export const cancelUnansweredMatches = inngest.createFunction(
  { id: "Cancel Unanswered Matches" },
  { cron: "*/2 * * * *" }, // Runs every 2 min
  async () => {
    await db
      .update(matches)
      .set({ status: "canceled" })
      .where(
        and(
          eq(matches.status, "in_review"),
          lt(matches.createdAt, new Date(Date.now() - 120000))
        )
      );

    return { success: true };
  }
);