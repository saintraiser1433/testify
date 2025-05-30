/*
  Warnings:

  - You are about to drop the column `address` on the `FollowUp` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `FollowUp` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `FollowUp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FollowUp" DROP COLUMN "address",
DROP COLUMN "birth_date",
DROP COLUMN "email",
ADD COLUMN     "strand" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "middle_name" DROP NOT NULL;
