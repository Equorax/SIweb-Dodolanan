/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "updatedAt",
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "updatedAt",
ALTER COLUMN "total" SET DATA TYPE DOUBLE PRECISION;
