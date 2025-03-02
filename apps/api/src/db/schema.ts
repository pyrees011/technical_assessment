import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  candidateName: text("candidate_name").notNull(),
  jobTitle: text("job_title").notNull(),
  analysis: text("analysis").notNull(),
  feedback: text("feedback"),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
