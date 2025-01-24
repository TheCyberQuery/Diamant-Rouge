// pages/api/wishlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;

    if (req.method === 'POST') {
        try {
            const { productId } = req.body;
            const wishlistItem = await prisma.wishlist.create({
                data: {
                    userId,
                    productId,
                },
            });
            return res.status(200).json(wishlistItem);
        } catch (error) {
            return res.status(500).json({ error: 'Error adding to wishlist' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { productId } = req.body;
            await prisma.wishlist.deleteMany({
                where: {
                    userId,
                    productId,
                },
            });
            return res.status(200).json({ message: 'Removed from wishlist' });
        } catch (error) {
            return res.status(500).json({ error: 'Error removing from wishlist' });
        }
    } else {
        return res.setHeader('Allow', ['POST', 'DELETE']).status(405).end();
    }
}
