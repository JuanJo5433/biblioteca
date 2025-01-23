/*
  Warnings:

  - Added the required column `description` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "description" TEXT NOT NULL;
