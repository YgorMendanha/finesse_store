-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categorty" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ratings" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "images" TEXT[],
    "variants" INTEGER[],

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
