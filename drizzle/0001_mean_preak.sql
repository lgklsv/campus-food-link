CREATE TABLE "vendors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vendors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"image_key" text NOT NULL,
	"estimated_minutes_min" integer NOT NULL,
	"estimated_minutes_max" integer NOT NULL,
	"owner_user_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "vendors_slug_unique" UNIQUE("slug"),
	CONSTRAINT "vendors_estimated_minutes_min_nonnegative" CHECK ("vendors"."estimated_minutes_min" >= 0),
	CONSTRAINT "vendors_estimated_minutes_range" CHECK ("vendors"."estimated_minutes_max" >= "vendors"."estimated_minutes_min")
);
--> statement-breakpoint
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_owner_user_id_user_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "vendors_owner_user_id_idx" ON "vendors" USING btree ("owner_user_id");