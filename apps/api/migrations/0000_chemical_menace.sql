CREATE TABLE "matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_name" text NOT NULL,
	"job_title" text NOT NULL,
	"analysis" text NOT NULL,
	"feedback" text,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
