import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { jwtVerify } from 'jose';

interface DecodedPayload {
    id: string;
    role: string;
    email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('--- PLACE-ORDER ROUTE START ---');
    console.log('📥 Received request body:', req.body);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const rawCookie = req.headers.cookie || '';
    let match = rawCookie.match(/next-auth\.session-token=([^;]+)/);
    if (!match) {
        match = rawCookie.match(/__Secure-next-auth\.session-token=([^;]+)/);
        if (!match) {
            console.log('❌ No session token found. Returning 401.');
            return res.status(401).json({ error: 'User not authenticated. No token found.' });
        }
    }

    const tokenStr = decodeURIComponent(match[1]);

    let payload: DecodedPayload | null = null;
    try {
        const secret = process.env.NEXTAUTH_SECRET || '';
        const { payload: decoded } = await jwtVerify(tokenStr, new TextEncoder().encode(secret));

        console.log('✅ Token decoded:', decoded);
        if (typeof decoded !== 'object' || !decoded.id || !decoded.email) {
            throw new Error('Invalid token payload structure.');
        }
        payload = decoded as unknown as DecodedPayload;
    } catch (err) {
        console.error('❌ Token verification failed:', err);
        return res.status(401).json({ error: 'User not authenticated. Invalid token.' });
    }

    if (!payload) {
        console.error('❌ Token payload is null. Returning 401.');
        return res.status(401).json({ error: 'User not authenticated. Invalid token payload.' });
    }

    console.log('✅ User ID =>', payload.id);
    const userId = Number(payload.id);

    const { cart, shippingAddress, city, postalCode, country, paymentMethod } = req.body;

    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    if (!paymentMethod) {
        return res.status(400).json({ error: 'Payment method is required' });
    }

    try {
        const order = await prisma.$transaction(async (tx) => {
            let totalAmount = 0;
            const orderItemsData = [];

            for (const item of cart) {
                console.log('🔍 Processing cart item:', item);

                if (!item.productId) {
                    throw new Error('Invalid cart item: missing productId');
                }

                let product = null;
                let variation = null;

                if (item.variationId) {
                    console.log('🔹 Checking variation for product:', item.variationId);
                    variation = await tx.productVariation.findUnique({
                        where: { id: item.variationId },
                        include: { product: true },
                    });

                    if (!variation) {
                        console.error(`❌ Variation with ID ${item.variationId} not found.`);
                        throw new Error(`Variation with ID ${item.variationId} not found.`);
                    }

                    if (variation.inventory < item.quantity) {
                        throw new Error(
                            `❌ Not enough stock for ${variation.product.sku} (Variation: ${variation.variationValue}). Only ${variation.inventory} left.`
                        );
                    }

                    await tx.productVariation.update({
                        where: { id: variation.id },
                        data: { inventory: variation.inventory - item.quantity },
                    });

                    const variationPrice =
                        (variation.product.basePrice?.toNumber() || 0) +
                        (variation.additionalPrice?.toNumber() || 0);
                    totalAmount += variationPrice * item.quantity;

                    orderItemsData.push({
                        productId: variation.productId,
                        quantity: item.quantity,
                        price: variationPrice,
                    });
                } else {
                    console.log('🔹 Checking standard product:', item.productId);
                    product = await tx.product.findUnique({
                        where: { id: item.productId },
                        select: { id: true, basePrice: true },
                    });
                    console.log('🔹 Product found:', product);
                    if (!product) {
                        console.error(`❌ Product with ID ${item.productId} not found.`);
                        throw new Error(`Product with ID ${item.productId} not found.`);
                    }

                    if (product.basePrice === null || product.basePrice === undefined) {
                        console.error(`❌ Product with ID ${item.productId} has no valid base price.`);
                        throw new Error(`Product with ID ${item.productId} has no valid base price.`);
                    }

                    // Check if basePrice is a number or a Decimal and convert accordingly
                    const productPrice = typeof product.basePrice === 'number'
                        ? product.basePrice
                        : product.basePrice.toNumber();

                    totalAmount += productPrice * item.quantity;
                    
                    console.log('🔹 Product price:', productPrice);
                    orderItemsData.push({
                        productId: product.id,
                        quantity: item.quantity,
                        price: productPrice,
                    });
                    console.log('🔹 Order items data:', orderItemsData);
                }
            }
            console.log('🔹 Total amount:', totalAmount);
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    status: 'PENDING',
                    paymentMethod,
                    shippingAddress,
                    city,
                    postalCode,
                    country,
                    orderItems: {
                        create: orderItemsData,
                    },
                },
                include: { orderItems: true },
            });

            console.log('✅ Order placed successfully:', newOrder);
            return newOrder;
        });

        return res.status(200).json({ success: true, order });

    } catch (error: any) {
        console.error('❌ Place order error:', error);
        return res.status(400).json({ error: error.message || 'Unexpected error occurred' });
    }
}
