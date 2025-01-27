/*
  Warnings:

  - You are about to drop the column `address` on the `Clients` table. All the data in the column will be lost.
  - Added the required column `password` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "address",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "documentType" DROP NOT NULL,
ALTER COLUMN "codeDocument" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street1" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
