/*
  Warnings:

  - Added the required column `city` to the `imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imoveis" ADD COLUMN     "area" TEXT,
ADD COLUMN     "bathrooms" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "garages" TEXT;
