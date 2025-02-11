import { prisma } from "../lib/prisma";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "../contexts/WishlistContext";
import { useState } from "react";
import { Minus, Package, ShoppingBag } from "lucide-react"; // ✅ High-End Luxury Icons
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion

type OrderPlus = {
    id: number;
    status: string;
    trackingNumber?: string | null;
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
            images: string[];
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
        id: number;
        sku: string;
        basePrice: string;
        images: string[];
        translations: {
            language: string;
            name: string;
        }[];
    };
};

export default function ProfilePage({ orders, wishlist, locale }: { orders: OrderPlus[], wishlist: WishlistItem[], locale: string }) {
    const { removeFromWishlist } = useWishlist();
    const [wishlistItems, setWishlistItems] = useState(wishlist);

    async function handleRemoveFromWishlist(productId: number) {
        setWishlistItems((prev) =>
            prev.filter((item) => item.productId !== productId)
        );
        await removeFromWishlist(productId);
    }

    return (
        <main className="p-8 text-ivory">
            <h1 className="text-4xl font-serif mb-6">My Profile</h1>

            {/* Order History */}
            <section className="mb-10">
                <h2 className="text-3xl font-serif mb-4 text-gold">Order History</h2>
                {orders.length === 0 ? (
                    <p className="flex items-center gap-2 text-platinumGray">
                        <ShoppingBag className="text-gold" size={20} /> You have no orders yet.
                    </p>
                ) : (
                    <ul className="space-y-6">
                        {orders.map((order) => (
                            <li key={order.id} className="bg-ebony/50 p-4 rounded-lg shadow-lg relative">
                                <p>Order <strong>#{order.id}</strong> - <span className="text-gold">{order.status}</span></p>
                                <p>Total: <strong>€{order.totalAmount}</strong></p>
                                <p>Shipped To: {order.shippingAddress}, {order.city} {order.postalCode}, {order.country}</p>
                                <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>

                                {order.trackingNumber && (
                                    <p className="flex items-center gap-2 text-sm text-platinumGray">
                                        <Package className="text-gold" size={18} /> <strong>{order.trackingNumber}</strong>
                                    </p>
                                )}

                                <ul className="mt-3 space-y-1">
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
                <h2 className="text-3xl font-serif mb-4 text-gold">My Wishlist</h2>
                {wishlistItems.length === 0 ? (
                    <p className="flex items-center gap-2 text-platinumGray">
                        <ShoppingBag className="text-gold" size={20} /> Your wishlist is empty.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {wishlistItems.map(({ product }) => {
                                const productTranslation = product.translations.find(t => t.language === locale) ||
                                    product.translations.find(t => t.language === "en");

                                return (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative bg-ebony/50 p-4 rounded-lg text-center shadow-lg"
                                    >
                                        {/* ✅ Properly Positioned Remove Button */}
                                        <button
                                            onClick={() => handleRemoveFromWishlist(product.id)}
                                            className="absolute top-3 right-3 text-crimson border border-crimson p-1 rounded-full hover:bg-crimson hover:text-ivory transition duration-300"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <Image
                                            src={product.images.length > 0 ? product.images[0] : "/images/placeholder.jpg"}
                                            width={150}
                                            height={150}
                                            alt={productTranslation?.name || "Wishlist Product"}
                                            className="mx-auto rounded-md object-cover"
                                        />
                                        <h3 className="text-lg text-gold mt-2">{productTranslation?.name}</h3>
                                        <p className="text-platinumGray">€{parseFloat(product.basePrice).toFixed(2)}</p>

                                        <Link href={`/products/${product.id}`} passHref>
                                            <button className="mt-2 bg-gold text-ebony px-4 py-2 rounded-full hover:bg-crimson transition duration-300">
                                                View Product
                                            </button>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </section>
        </main>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) {
        return { redirect: { destination: '/login', permanent: false } };
    }

    const userId = Number(session.user.id);
    const locale = context.locale || 'en';

    try {
        // ✅ Fetch orders with tracking numbers & product images
        const rawOrders = await prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                sku: true,
                                images: true,
                                translations: {
                                    select: { language: true, name: true }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        // ✅ Fetch wishlist with product images
        const rawWishlist = await prisma.wishlist.findMany({
            where: { userId },
            include: {
                product: {
                    select: {
                        id: true,
                        sku: true,
                        basePrice: true,
                        images: true,
                        translations: {
                            select: { language: true, name: true }
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
        console.error('❌ Profile SSR error:', error);
        return {
            props: { orders: [], wishlist: [], locale },
        };
    }
}
