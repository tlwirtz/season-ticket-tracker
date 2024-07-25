CREATE TABLE IF NOT EXISTS "ticket_redemptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_id" integer NOT NULL,
	"redemption_code_id" integer NOT NULL,
	"claim_qty" integer NOT NULL,
	"claimed_user_id" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_redemptions" ADD CONSTRAINT "ticket_redemptions_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_redemptions" ADD CONSTRAINT "ticket_redemptions_redemption_code_id_redemption_codes_id_fk" FOREIGN KEY ("redemption_code_id") REFERENCES "public"."redemption_codes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
