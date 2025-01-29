// pages/api/test-auth.ts
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function testAuth(req: NextApiRequest, res: NextApiResponse) {
    // We'll do the same session check as in your order route:
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ error: 'No session or user not authenticated' });
    }

    return res.status(200).json({
        message: 'Session is valid on the server!',
        user: session.user, // Optional, to see user details
    });
}
