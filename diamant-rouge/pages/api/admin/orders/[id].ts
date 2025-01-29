import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (!session || session.user.role !== 'admin') {
        return res.status(401).json({ error: 'Not authorized' });
    }

    const { id } = req.query;

    if (req.method === 'PUT') {
        const { status } = req.body;
        try {
            const updatedOrder = await prisma.order.update({
                where: { id: Number(id) },
                data: { status },
                include: { orderItems: true },
            });
            return res.status(200).json(updatedOrder);
        } catch (error: any) {
            console.error('Order update error:', error);
            return res.status(400).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
