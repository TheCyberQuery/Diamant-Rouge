/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Wishlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "createdAt";

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_productId_key" ON "Wishlist"("userId", "productId");
