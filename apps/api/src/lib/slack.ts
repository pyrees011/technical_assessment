import { WebClient } from "@slack/web-api";
import { config } from "dotenv";

config({ path: ".env" });

const slackToken = process.env.BOT_USER_OAUTH_TOKEN;
const slackChannel = process.env.CHANNEL_LINK;

const slackClient = new WebClient(slackToken);

export async function sendSlackNotification(candidateName: string, jobTitle: string, matchId: number) {
    // created a message using chat to send in the slack channel
  const message = `👀 New Match: *${candidateName}* for *${jobTitle}*  
  Please provide feedback using the following:  
  ✅ *Accept* → /feedback ${matchId} accept  
  ❌ *Reject* → /feedback ${matchId} reject`;

  try {
    await slackClient.chat.postMessage({
      channel: slackChannel!,
      text: message,
    });
    console.log("Slack notification sent!");
  } catch (error) {
    console.error("Error sending Slack message:", error);
  }
}
