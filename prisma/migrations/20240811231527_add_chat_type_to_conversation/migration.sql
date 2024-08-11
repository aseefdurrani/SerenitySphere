/*
  Warnings:

  - Added the required column `chatType` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('Fitness', 'Inspiration', 'Journal', 'Mindfulness', 'Mood', 'LiveSupport');

-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "chatType" "ChatType" NOT NULL;
