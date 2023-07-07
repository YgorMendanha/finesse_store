-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categortyFather" TEXT NOT NULL,
    "categortyChild" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "ratings" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "imagens" TEXT[],

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
