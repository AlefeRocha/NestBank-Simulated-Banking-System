CREATE TABLE "public"."account" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "email" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("email"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
