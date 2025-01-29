import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';

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
            sku: string;
        }
    }[];
};

export default function ProfilePage({ orders }: { orders: OrderPlus[] }) {
    return (
        <main className="p-8 text-ivory">
            <h1 className="text-3xl font-serif mb-4">My Orders</h1>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order.id} className="bg-ebony/50 p-4">
                            <p>Order #{order.id}</p>
                            <p>Status: {order.status}</p>
                            <p>Total: €{order.totalAmount}</p>
                            <p>
                                Shipped To: {order.shippingAddress}, {order.city} {order.postalCode},{' '}
                                {order.country}
                            </p>
                            <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>

                            <ul className="mt-2 space-y-1">
                                {order.orderItems.map((item) => (
                                    <li key={item.id} className="pl-2">
                                        Product SKU: {item.product?.sku || item.productId} (
                                        Qty: {item.quantity}, Price: €{item.price})
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) {
        return { redirect: { destination: '/login', permanent: false } };
    }

    const userId = Number(session.user.id);

    try {
        // fetch orders with items + product sku
        const rawOrders = await prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                sku: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const orders = JSON.parse(JSON.stringify(rawOrders));
        return {
            props: { orders },
        };
    } catch (error) {
        console.error('Profile SSR error:', error);
        return {
            props: { orders: [] },
        };
    }
}
