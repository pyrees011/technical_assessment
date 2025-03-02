import { inngest } from "./inngest.js";
import { db } from "../db/db.js";
import { matches } from "../db/schema.js";
import { sendSlackNotification } from "../lib/slack.js";

export const generateFakeMatch = inngest.createFunction(
  { id: "Generate Fake Match" },
  { cron: "*/5 * * * *" }, // Runs every 5 min
  async () => {
    const fakeCandidate = {
      candidateName: "John Doe",
      jobTitle: "Customer Support @Doctolib",
      analysis: "Candidate has strong communication skills.",
      status: "in_review",
    };

    const [newMatch] = await db
      .insert(matches)
      .values(fakeCandidate)
      .returning({ id: matches.id });

    await sendSlackNotification(fakeCandidate.candidateName, fakeCandidate.jobTitle, newMatch.id);

    return { success: true, matchId: newMatch.id };
  }
);
