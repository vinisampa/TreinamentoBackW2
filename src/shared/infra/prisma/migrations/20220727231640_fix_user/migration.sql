/*
  Warnings:

  - You are about to drop the column `birthDate` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_id_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "birthDate",
ADD COLUMN     "password" TEXT NOT NULL;
