CREATE TABLE IF NOT EXISTS "stripe_webhook_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"object_id" text NOT NULL,
	"event_type" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"processed_ok" boolean DEFAULT false NOT NULL,
	"event_body" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ticket_redemptions" ADD COLUMN "stripe_event_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_redemptions" ADD CONSTRAINT "ticket_redemptions_stripe_event_id_stripe_webhook_events_id_fk" FOREIGN KEY ("stripe_event_id") REFERENCES "public"."stripe_webhook_events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
