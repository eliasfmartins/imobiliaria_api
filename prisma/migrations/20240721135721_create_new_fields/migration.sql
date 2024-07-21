-- AlterTable
ALTER TABLE "imoveis" ADD COLUMN     "condominium" TEXT,
ADD COLUMN     "highlight" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT;
