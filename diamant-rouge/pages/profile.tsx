import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';

export default function ProfilePage({ orders }: { orders: any[] }) {
    return (
        <main className="p-8">
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
                            <ul>
                                {order.orderItems.map((item: any) => (
                                    <li key={item.id}>
                                        {item.product.sku} (Qty: {item.quantity})
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
        return {
            redirect: { destination: '/login', permanent: false },
        };
    }
    // Assume session.user.id is the logged in user’s ID
    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders)),
        },
    };
}
