import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { jwtVerify } from 'jose';

interface DecodedPayload {
    id: string;
    role: string;
    email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('--- ADMIN PRODUCT MANAGEMENT ROUTE START ---');
    console.log('req.headers.cookie =>', req.headers.cookie);

    // ✅ Extract session token manually
    const rawCookie = req.headers.cookie || '';
    let match = rawCookie.match(/next-auth\.session-token=([^;]+)/);
    if (!match) {
        match = rawCookie.match(/__Secure-next-auth\.session-token=([^;]+)/);
        if (!match) {
            console.log('No session token found. Returning 401...');
            return res.status(401).json({ error: 'Not authorized. No token found.' });
        }
    }

    const tokenStr = decodeURIComponent(match[1]);

    // ✅ Decode JWT Token manually
    let payload: DecodedPayload;
    try {
        const secret = process.env.NEXTAUTH_SECRET || '';
        const { payload: decoded } = await jwtVerify(tokenStr, new TextEncoder().encode(secret));
        console.log('✅ Token decoded =>', decoded);
        payload = decoded as unknown as DecodedPayload;
    } catch (err) {
        console.log('❌ Token verification failed:', err);
        return res.status(401).json({ error: 'Not authorized. Invalid token.' });
    }

    // ✅ Ensure user is an admin
    if (payload.role !== 'admin') {
        console.log('❌ User is not an admin. Returning 401...');
        return res.status(401).json({ error: 'Not authorized. Admin access required.' });
    }

    // ✅ Handle Product Creation
    if (req.method === 'POST') {
        try {
            const { sku, basePrice, categoryId, translations, variations, images } = req.body;

            const newProduct = await prisma.product.create({
                data: {
                    sku,
                    basePrice: parseFloat(basePrice),
                    categoryId: parseInt(categoryId),
                    translations: { create: translations },
                    variations: { create: variations },
                    // Save image URLs if provided
                    ...(images && { images }),
                },
            });

            console.log('✅ Product created successfully:', newProduct);
            return res.status(201).json(newProduct);
        } catch (error: any) {
            console.error('❌ Product creation error:', error);
            return res.status(500).json({ error: 'Failed to create product' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
