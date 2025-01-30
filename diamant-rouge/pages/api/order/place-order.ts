// /pages/api/order/place-order.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('--- PLACE-ORDER ROUTE START ---');
    console.log('req.headers.cookie =>', req.headers.cookie);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check session
    const session = await getSession({ req });
    console.log('place-order => session =>', session);

    if (!session) {
        console.log('No session, returning 401');
        return res.status(401).json({ error: 'User not authenticated' });
    }

    // If we get here, session was recognized
    console.log('User ID =>', session.user.id);

    const userId = Number(session.user.id);

    const { cart, shippingAddress, city, postalCode, country } = req.body;

    // Validate input
    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    // Start a transaction
    try {
        const order = await prisma.$transaction(async (tx) => {
            let totalAmount = 0;

            // 1. Check inventory & build orderItems data
            const orderItemsData = [];
            for (const item of cart) {
                // Find the variation
                const variation = await tx.productVariation.findUnique({
                    where: { id: item.variationId },
                    include: { product: true },
                });
                if (!variation) {
                    throw new Error(`Variation not found (ID: ${item.variationId})`);
                }
                // Check inventory
                if (variation.inventory < item.quantity) {
                    throw new Error(
                        `Not enough stock for ${variation.product.sku} (Variation: ${variation.variationValue}). Only ${variation.inventory} left.`
                    );
                }
                // Decrement inventory
                await tx.productVariation.update({
                    where: { id: variation.id },
                    data: {
                        inventory: variation.inventory - item.quantity,
                    },
                });

                // Price calculation (basePrice + additionalPrice if any)
                const itemPrice = item.price; // or variation.product.basePrice + variation.additionalPrice, etc.

                totalAmount += itemPrice * item.quantity;

                orderItemsData.push({
                    productId: variation.productId,
                    quantity: item.quantity,
                    price: itemPrice,
                });
            }

            // 2. Create the Order
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
