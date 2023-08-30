-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "namePT" TEXT NOT NULL,
    "categortyPT" TEXT NOT NULL,
    "colorPT" TEXT NOT NULL,
    "nameEN" TEXT NOT NULL,
    "categortyEN" TEXT NOT NULL,
    "colorEN" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ratings" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "images" TEXT[],
    "variants" INTEGER[],

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "products" JSONB,
    "userId" INTEGER,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
