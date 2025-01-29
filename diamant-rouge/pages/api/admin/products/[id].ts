import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (!session || session.user?.role !== 'admin') {
        return res.status(401).json({ error: 'Not authorized' });
    }

    const { id } = req.query;

    if (req.method === 'PUT') {
        const { sku, basePrice, translations } = req.body;
        // Update logic
        const updated = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                sku,
                basePrice,
                translations: {
                    // Upsert or update translations
                    // For simplicity, maybe delete existing then create new
                },
            },
        });
        return res.status(200).json(updated);
    } else if (req.method === 'DELETE') {
        // Delete logic
        await prisma.product.delete({ where: { id: Number(id) } });
        return res.status(200).json({ message: 'Product deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
