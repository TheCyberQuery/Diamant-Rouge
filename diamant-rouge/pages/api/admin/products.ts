import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (!session || session.user?.role !== 'admin') {
        return res.status(401).json({ error: 'Not authorized' });
    }

    // Handle different HTTP methods
    if (req.method === 'POST') {
        try {
            const { sku, basePrice, translations } = req.body;
            // Minimal validation
            if (!sku || !basePrice || !translations) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Create product
            const product = await prisma.product.create({
                data: {
                    sku,
                    basePrice,
                    translations: {
                        create: translations.map((t: any) => ({
                            language: t.language,
                            name: t.name,
                            description: t.description,
                        })),
                    },
                },
            });

            return res.status(200).json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Could handle GET for listing all products, but we do that in GSSP
    return res.status(405).json({ error: 'Method not allowed' });
}
