import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { amount } = req.body;
    const cmiUrl = process.env.NEXT_PUBLIC_CMI_API_URL!;

    try {
        const params = qs.stringify({
            userName: process.env.NEXT_PUBLIC_CMI_MERCHANT_ID,
            password: process.env.NEXT_PUBLIC_CMI_ACCESS_KEY,
            orderNumber: `DR-${Date.now()}`,
            amount: amount * 10, // Convert to MAD cents
            currency: '504', // MAD currency code
            returnUrl: process.env.NEXT_PUBLIC_CMI_RETURN_URL,
            description: 'Diamant Rouge Jewelry Purchase',
        });

        const response = await axios.post(cmiUrl, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (response.data.errorCode) {
            return res.status(400).json({ error: response.data.errorMessage });
        }

        res.status(200).json({ redirectUrl: response.data.formUrl });
    } catch (error) {
        console.error('CMI Payment Error:', error);
        res.status(500).json({ error: 'Failed to initiate CMI payment.' });
    }
}
