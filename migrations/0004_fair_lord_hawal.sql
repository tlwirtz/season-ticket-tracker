ALTER TABLE "admins" ADD COLUMN "external_uid" text NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_external_uid_unique" UNIQUE("external_uid");