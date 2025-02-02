import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const { sku, basePrice, categoryId, translations, images } = req.body;

            // ✅ Ensure `translations` array does not contain `id`
            const cleanedTranslations = translations.map(({ id, ...rest }) => rest);

            // ✅ Step 1: Delete existing translations (before update)
            await prisma.productTranslation.deleteMany({
                where: { productId: Number(id) },
            });

            // ✅ Step 2: Update product
            const updatedProduct = await prisma.product.update({
                where: { id: Number(id) },
                data: {
                    sku,
                    basePrice: parseFloat(basePrice), // ✅ Ensure basePrice is a float
                    categoryId: categoryId ? parseInt(categoryId) : null, // ✅ Ensure categoryId is an integer or null
                    images: Array.isArray(images) ? images : [], // ✅ Ensure images is an array
                },
                include: { translations: true },
            });

            // ✅ Step 3: Recreate translations
            await prisma.productTranslation.createMany({
                data: cleanedTranslations.map((t) => ({
                    ...t,
                    productId: Number(id),
                })),
            });

            return res.status(200).json(updatedProduct);
        } catch (error: any) {
            console.error("❌ Product update error:", error);
            return res.status(500).json({ error: "Failed to update product" });
        }
    }

    if (req.method === 'DELETE') {
        try {
            // ✅ First, delete related translations and variations
            await prisma.productTranslation.deleteMany({
                where: { productId: Number(id) },
            });

            await prisma.productVariation.deleteMany({
                where: { productId: Number(id) },
            });

            // ✅ Now, delete the product itself
            await prisma.product.delete({
                where: { id: Number(id) },
            });

            return res.status(200).json({ message: "Product deleted successfully" });
        } catch (error: any) {
            console.error("❌ Product delete error:", error);
            return res.status(500).json({ error: "Failed to delete product" });
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
