CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"location" varchar(256) NOT NULL,
	"installation_date" date,
	"system_type" varchar(256),
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "account" CASCADE;--> statement-breakpoint
DROP TABLE "category" CASCADE;--> statement-breakpoint
DROP TABLE "product" CASCADE;--> statement-breakpoint
DROP TABLE "product_variant" CASCADE;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
DROP TABLE "verification" CASCADE;