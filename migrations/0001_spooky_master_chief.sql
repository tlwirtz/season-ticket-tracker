DO $$ BEGIN
 CREATE TYPE "public"."matchType" AS ENUM('MLS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_alerts" (
	"should_display" boolean DEFAULT false NOT NULL,
	"message_header" text,
	"message_text" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_key" text NOT NULL,
	"available" boolean DEFAULT true,
	"away_team" integer,
	"home_team" integer,
	"claimed_user_id" text,
	"date" text,
	"location" text,
	"matchType" "matchType",
	"qty_tickets_available" integer DEFAULT 0 NOT NULL,
	"ticket_price" integer DEFAULT 0 NOT NULL,
	"time" text,
	"timestamp" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "redemption_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	CONSTRAINT "redemption_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"img" text
);
--> statement-breakpoint
DROP TABLE "posts_table";--> statement-breakpoint
DROP TABLE "users_table";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "matches_away_team_teams_id_fk" FOREIGN KEY ("away_team") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "matches_home_team_teams_id_fk" FOREIGN KEY ("home_team") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
