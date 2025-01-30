// /pages/api/order/place-order.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { jwtVerify, JWTPayload } from 'jose';

interface DecodedPayload {
    id: string;
    role: string;
    email: string;
    // add any other fields you embed in your JWT
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('--- PLACE-ORDER ROUTE START ---');
    console.log('req.headers.cookie =>', req.headers.cookie);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 1) Attempt to read the session token from the cookie
    const rawCookie = req.headers.cookie || '';
    let match = rawCookie.match(/next-auth\.session-token=([^;]+)/);
    if (!match) {
        // Some NextAuth setups use __Secure-next-auth.session-token in production
        match = rawCookie.match(/__Secure-next-auth\.session-token=([^;]+)/);
        if (!match) {
            console.log('No session token in cookies. Returning 401...');
            return res.status(401).json({ error: 'User not authenticated. No token cookie found.' });
        }
    }

    const tokenStr = decodeURIComponent(match[1]);

    // 2) Verify/decode the token with your same HS256 secret
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
        return res.status(401).json({ error: 'User not authenticated. Invalid token.' });
    }

    // 3) We have a valid user from the token payload
    console.log('User ID =>', payload.id);

    const userId = Number(payload.id);

    // 4) Use userId to proceed with the place-order logic
    const { cart, shippingAddress, city, postalCode, country } = req.body;

    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    try {
        const order = await prisma.$transaction(async (tx) => {
            let totalAmount = 0;

            const orderItemsData = [];
            for (const item of cart) {
                const variation = await tx.productVariation.findUnique({
                    where: { id: item.variationId },
                    include: { product: true },
                });
                if (!variation) {
                    throw new Error(`Variation not found (ID: ${item.variationId})`);
                }
                if (variation.inventory < item.quantity) {
                    throw new Error(
                        `Not enough stock for ${variation.product.sku} (Variation: ${variation.variationValue}). Only ${variation.inventory} left.`
                    );
                }
                // Update inventory
                await tx.productVariation.update({
                    where: { id: variation.id },
                    data: { inventory: variation.inventory - item.quantity },
                });
                // Accumulate price
                const itemPrice = item.price; // or variation.product.basePrice + variation.additionalPrice
                totalAmount += itemPrice * item.quantity;

                orderItemsData.push({
                    productId: variation.productId,
                    quantity: item.quantity,
                    price: itemPrice,
                });
            }

            // Create the Order
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    status: 'PENDING',
                    shippingAddress,
                    city,
                    postalCode,
                    country,
                    orderItems: {
                        create: orderItemsData,
                    },
                },
                include: {
                    orderItems: true,
                },
            });

            return newOrder;
        });

        return res.status(200).json({ success: true, order });
    } catch (error: any) {
        console.error('Place order error:', error);
        return res.status(400).json({ error: error.message });
    }
}