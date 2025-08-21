-- CreateEnum
CREATE TYPE "public"."ToolType" AS ENUM ('HAND', 'HEAVY', 'GENETATOR', 'CONSTRUCTION');

-- CreateTable
CREATE TABLE "public"."Tool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "toolType" "public"."ToolType" NOT NULL,
    "toolName" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "dayPrice" DOUBLE PRECISION NOT NULL,
    "weekPrice" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);
