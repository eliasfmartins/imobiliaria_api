-- CreateTable
CREATE TABLE "imoveis" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "rooms" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "imoveis_pkey" PRIMARY KEY ("id")
);
