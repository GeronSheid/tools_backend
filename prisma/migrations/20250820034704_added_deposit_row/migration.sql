/*
  Warnings:

  - The values [GENETATOR] on the enum `ToolType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `deposit` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ToolType_new" AS ENUM ('HAND', 'HEAVY', 'GENERATOR', 'CONSTRUCTION');
ALTER TABLE "public"."Tool" ALTER COLUMN "toolType" TYPE "public"."ToolType_new" USING ("toolType"::text::"public"."ToolType_new");
ALTER TYPE "public"."ToolType" RENAME TO "ToolType_old";
ALTER TYPE "public"."ToolType_new" RENAME TO "ToolType";
DROP TYPE "public"."ToolType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Tool" ADD COLUMN     "deposit" DOUBLE PRECISION NOT NULL;
