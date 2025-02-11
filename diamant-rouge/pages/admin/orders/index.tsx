import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';

type AdminOrder = {
    id: number;
    status: string;
    totalAmount: string;
    createdAt: string;
    user: {
        email: string;
    } | null;
};

export default function OrdersAdminPage({ orders }: { orders: AdminOrder[] }) {
    return (
        <section className="p-8 text-ivory">
            <h1 className="text-4xl font-serif text-gold mb-6">Manage Orders</h1>

            {orders.length === 0 ? (
                <p className="text-platinumGray">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-ebony/50 text-ivory rounded-lg shadow-lg">
                        <thead className="bg-ebony/80 text-gold">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">User</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Total (€)</th>
                            <th className="p-3">Created</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-platinumGray">
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.user?.email ?? 'Guest'}</td>
                                <td className="p-3 text-center">{order.status}</td>
                                <td className="p-3 text-center">€{order.totalAmount}</td>
                                <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
                                <td className="p-3 text-center">
                                    <Link href={`/admin/orders/${order.id}`}>
                                        <button className="bg-gold text-ebony px-4 py-2 rounded-lg hover:bg-crimson transition">
                                            View / Edit
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session || session.user.role !== 'admin') {
        return { redirect: { destination: '/', permanent: false } };
    }

    const rawOrders = await prisma.order.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' },
    });

    return {
        props: { orders: JSON.parse(JSON.stringify(rawOrders)) },
    };
};
