-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "shippingAddress" TEXT;

-- AlterTable
ALTER TABLE "ProductVariation" ADD COLUMN     "inventory" INTEGER NOT NULL DEFAULT 0;
