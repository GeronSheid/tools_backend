/*
  Warnings:

  - The values [HAND,HEAVY,GENERATOR,CONSTRUCTION] on the enum `ToolType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ToolType_new" AS ENUM ('hand', 'heavy', 'generator', 'construction');
ALTER TABLE "public"."Tool" ALTER COLUMN "toolType" TYPE "public"."ToolType_new" USING ("toolType"::text::"public"."ToolType_new");
ALTER TYPE "public"."ToolType" RENAME TO "ToolType_old";
ALTER TYPE "public"."ToolType_new" RENAME TO "ToolType";
DROP TYPE "public"."ToolType_old";
COMMIT;
