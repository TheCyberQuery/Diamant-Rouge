import { prisma } from '../lib/prisma';
import { jwtVerify } from 'jose';
import Link from 'next/link';
import Image from 'next/image';

type OrderPlus = {
    id: number;
    status: string;
    totalAmount: string;
    shippingAddress: string | null;
    city: string | null;
    postalCode: string | null;
    country: string | null;
    createdAt: string;
    orderItems: {
        id: number;
        productId: number;
        quantity: number;
        price: string;
        product?: {
            id: number;
            sku: string;
            translations: {
                language: string;
                name: string;
            }[];
        };
    }[];
};

type WishlistItem = {
    id: number;
    productId: number;
    product: {
        id: number;  // ✅ Ensure Product ID is available
        sku: string;
        basePrice: string;
        translations: {
            language: string;
            name: string;
        }[];
    };
};

export default function ProfilePage({ orders, wishlist, locale }: { orders: OrderPlus[], wishlist: WishlistItem[], locale: string }) {
    return (
        <main className="p-8 text-ivory">
            <h1 className="text-3xl font-serif mb-6">My Profile</h1>

            {/* Order History */}
            <section className="mb-10">
                <h2 className="text-2xl font-serif mb-4 text-gold">Order History</h2>
                {orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order.id} className="bg-ebony/50 p-4 rounded-lg">
                                <p>Order <strong>#{order.id}</strong> - <span className="text-gold">{order.status}</span></p>
                                <p>Total: <strong>€{order.totalAmount}</strong></p>
                                <p>Shipped To: {order.shippingAddress}, {order.city} {order.postalCode}, {order.country}</p>
                                <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>

                                <ul className="mt-2 space-y-1">
                                    {order.orderItems.map((item) => {
                                        const productName = item.product?.translations.find(t => t.language === locale)?.name
                                            || item.product?.translations.find(t => t.language === "en")?.name
                                            || item.product?.sku;

                                        return (
                                            <li key={item.id} className="pl-2 text-platinumGray">
                                                {productName} (Qty: {item.quantity}, Price: €{item.price})
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Wishlist Section */}
            <section>
                <h2 className="text-2xl font-serif mb-4 text-gold">My Wishlist</h2>
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {wishlist.map(({ product }) => {
                            const productTranslation = product.translations.find(t => t.language === locale) ||
                                product.translations.find(t => t.language === "en");

                            return (
                                <div key={product.id} className="bg-ebony/50 p-4 rounded-lg text-center">
                                    <Image
                                        src={`/images/products/${product.sku.toLowerCase()}.png`}
                                        width={150}
                                        height={150}
                                        alt={productTranslation?.name || "Wishlist Product"}
                                        className="mx-auto rounded-md"
                                    />
                                    <h3 className="text-lg text-gold mt-2">{productTranslation?.name}</h3>
                                    <p className="text-platinumGray">€{parseFloat(product.basePrice).toFixed(2)}</p>

                                    {/* ✅ FIXED: Use Product ID instead of SKU */}
                                    <Link href={`/products/${product.id}`} passHref>
                                        <button className="mt-2 bg-crimson text-ivory px-4 py-2 rounded-full hover:bg-gold transition duration-300">
                                            View Product
                                        </button>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}

export async function getServerSideProps(context: any) {
    const rawCookie = context.req.headers.cookie || '';
    let match = rawCookie.match(/next-auth\.session-token=([^;]+)/) || rawCookie.match(/__Secure-next-auth\.session-token=([^;]+)/);

    if (!match) {
        return { redirect: { destination: '/login', permanent: false } };
    }

    const tokenStr = decodeURIComponent(match[1]);
    let payload;

    try {
        const secret = process.env.NEXTAUTH_SECRET || '';
        const { payload: decoded } = await jwtVerify(tokenStr, new TextEncoder().encode(secret));

        if (typeof decoded !== 'object' || !decoded.id || !decoded.email) {
            throw new Error('Invalid token payload structure.');
        }
        payload = decoded as { id: string };
    } catch (err) {
        return { redirect: { destination: '/login', permanent: false } };
    }

    const userId = Number(payload.id);
    const locale = context.locale || 'en';

    try {
        // Fetch orders with items + product details
        const rawOrders = await prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                id: true,  // ✅ Ensure Product ID is selected
                                sku: true,
                                translations: {
                                    select: {
                                        language: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        // Fetch wishlist
        const rawWishlist = await prisma.wishlist.findMany({
            where: { userId },
            include: {
                product: {
                    select: {
                        id: true,  // ✅ Ensure Product ID is selected
                        sku: true,
                        basePrice: true,
                        translations: {
                            select: {
                                language: true,
                                name: true
                            }
                        }
                    }
                }
            },
        });

        return {
            props: {
                orders: JSON.parse(JSON.stringify(rawOrders)),
                wishlist: JSON.parse(JSON.stringify(rawWishlist)),
                locale
            },
        };
    } catch (error) {
        console.error('Profile SSR error:', error);
        return {
            props: { orders: [], wishlist: [], locale },
        };
    }
}
