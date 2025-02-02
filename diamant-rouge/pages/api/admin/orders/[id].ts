// pages/api/admin/orders/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { jwtVerify } from 'jose';

interface DecodedPayload {
    id: string;
    role: string;
    email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('--- ADMIN ORDER UPDATE ROUTE START ---');
    console.log('req.headers.cookie =>', req.headers.cookie);

    // Manually extract session token from cookies
    const rawCookie = req.headers.cookie || '';
    let match = rawCookie.match(/next-auth\.session-token=([^;]+)/);
    if (!match) {
        match = rawCookie.match(/__Secure-next-auth\.session-token=([^;]+)/);
        if (!match) {
            console.log('No session token in cookies. Returning 401...');
            return res.status(401).json({ error: 'Not authorized. No token cookie found.' });
        }
    }

    const tokenStr = decodeURIComponent(match[1]);

    // Decode JWT token manually
    let payload: DecodedPayload;
    try {
        const secret = process.env.NEXTAUTH_SECRET || '';
        const { payload: decoded } = await jwtVerify(
            tokenStr,
            new TextEncoder().encode(secret)
        );
        console.log('Manual decode => payload =>', decoded);
        payload = decoded as unknown as DecodedPayload;
    } catch (err) {
        console.log('Manual decode error =>', err);
        return res.status(401).json({ error: 'Not authorized. Invalid token.' });
    }

    // Ensure user is an admin
    if (payload.role !== 'admin') {
        console.log('User is not admin. Returning 401...');
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
