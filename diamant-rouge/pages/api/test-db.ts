// pages/api/test-db.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Just a simple query to fetch all products from the DB
    try {
        const products = await prisma.product.findMany({
            include: { translations: true },
        });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
}
