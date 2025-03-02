# Repio Real-Time Candidate Match Feedback App

## Overview

This application automates the workflow of collecting recruiter feedback on AI-generated candidate matches for job postings. The system generates candidate-job matches, notifies recruiters via Slack, and tracks feedback within a time constraint.

## Features

- **Automated Match Analysis**: Generates fake candidate-job matches every 5 minutes.
- **Slack Integration**: Sends match notifications via the Repio Bot.
- **Feedback Collection**: Stores recruiter feedback in the database.
- **Match Status Updates**:
  - `in_review`: When a match is created.
  - `done`: If feedback is received within 2 minutes.
  - `canceled`: If no feedback is provided within 2 minutes.

## Tech Stack

- **Frontend**: Next.js 15 + Better Auth + ShadcnUI
- **Backend**: Hono
- **Database**: Neon + Drizzle ORM
- **Serverless Functions**: Inngest
- **Messaging**: Slack Integration
- **Monorepo**: Turborepo
- **Strict TypeScript**

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+)
- **pnpm** (latest)

### Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/pyrees011/technical_assessment.git
cd repio-feedback

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the apps/api directory and add the required environment variables:

```env
# Database Connection
DATABASE_URL=your_neon_database_url

# Slack Integration
BOT_USER_OAUTH_TOKEN=your_slack_bot_token
CHANNEL_LINK=your_slack_channel_id
```

### Running the Application

#### **1. Start the Backend (Hono API)**

```sh
cd apps/api
pnpm dev
```

By default, the API runs on `http://localhost:3001`.

#### **2. Start the inngest local server(create a new terminal)**

```sh
cd apps/api
npx inngest-cli@latest dev
```

By default, the inngest local server runs on `http://localhost:8288`.

#### **3. Start the Frontend (Next.js App)**

```sh
cd apps/web
pnpm dev
```

By default, the frontend runs on `http://localhost:3000`.

## API Endpoints

### **1. Matches API** (`/matches`)

#### **GET /matches**

Fetch all matches.

```sh
curl -X GET http://localhost:8787/api/v1/matches
```

#### **POST /matches**

Create a new match.

```sh
curl -X POST http://localhost:8787/api/v1/matches \
-H "Content-Type: application/json" \
-d '{
  "candidateName": "John Doe",
  "jobTitle": "Customer Support",
  "analysis": "Strong communication skills",
  "status": "in_review"
}'
```

#### **GET /matches/:id**

gets a perticular job-candidate match.

```sh
curl -X GET http://localhost:8787/api/v1/matches/1
```

#### **PATCH /matches/:id/status**

updates a job-candidate match's status.

```sh
curl -X POST http://localhost:8787/api/v1/matches/1/status \
-H "Content-Type: application/json" \
-d '{
  "status": "done"
}'
```

#### **POST /matches/:id/feedback**

updates a job-candidate match's feedback.

```sh
curl -X POST http://localhost:8787/api/v1/matches/1/feeback \
-H "Content-Type: application/json" \
-d '{
  "feedback": "this is the updated feedback"
}'
```

### **2. inngest API** (`/feedback`)

#### **POST /feedback/:id**

posts feedback given by the employer on the match

```sh
curl -X POST http://localhost:8787/api/v1/feedback/1 \
-H "Content-Type: application/json" \
-d '{
  "feedback": "this is the feedback provided"
}'
```

---

## Slack Integration

The Repio Bot sends notifications to Slack when a new match is created. If a recruiter provides feedback, the status updates to `done`; otherwise, it auto-updates to `canceled` after 2 minutes.

To enable Slack integration, add your bot token and channel ID in `.env` and ensure your Slack bot has `chat:write` permissions.

---

## Project Structure

```
repio-feedback/
│── apps/
│   ├── api/          # Backend
│   │   ├── src/
│   │   │   ├── db/      # Drizzle ORM database schemas
│   │   │   ├── inngest/   # inngest severless functions(feedback handler, fake match generator, feedback timeout handler)
│   │   │   ├── lib/slack # sends notification using slack sdk
│   │   │   ├── routes/matches # api routes /matches
│   │   │   ├── index # hono api application's main page
│   ├── web/          # Frontend (Next.js 15 + ShadcnUI)
│── turbo.json            # Turborepo configuration
│── README.md             # Documentation
```

---


