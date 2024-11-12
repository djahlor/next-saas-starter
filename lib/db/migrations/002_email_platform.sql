CREATE TABLE IF NOT EXISTS "products" (
    "id" serial PRIMARY KEY NOT NULL,
    "brand_id" integer NOT NULL,
    "name" varchar(100) NOT NULL,
    "description" text,
    "price" decimal(10,2),
    "image_url" text,
    "external_id" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "brands" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "name" varchar(100) NOT NULL,
    "website_url" text NOT NULL,
    "profile" jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "generations" (
    "id" serial PRIMARY KEY NOT NULL,
    "brand_id" integer NOT NULL,
    "flow_id" text NOT NULL,
    "variation_id" text NOT NULL,
    "template_id" text NOT NULL,
    "content" jsonb NOT NULL,
    "status" varchar(20) DEFAULT 'draft' NOT NULL,
    "version" integer DEFAULT 1 NOT NULL,
    "language" varchar(10) DEFAULT 'en' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "generation_versions" (
    "id" serial PRIMARY KEY NOT NULL,
    "generation_id" integer NOT NULL,
    "content" jsonb NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

-- Add foreign key constraints
DO $$ BEGIN
 ALTER TABLE "brands" ADD CONSTRAINT "brands_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "generations" ADD CONSTRAINT "generations_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "generation_versions" ADD CONSTRAINT "generation_versions_generation_id_generations_id_fk" FOREIGN KEY ("generation_id") REFERENCES "generations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_brands_user_id ON brands(user_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_generations_brand_id ON generations(brand_id);
CREATE INDEX IF NOT EXISTS idx_generation_versions_generation_id ON generation_versions(generation_id);