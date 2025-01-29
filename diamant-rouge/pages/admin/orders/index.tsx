import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

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
            <h1 className="text-3xl font-serif mb-4">Manage Orders</h1>
            <table className="w-full bg-ebony/50 text-ivory">
                <thead className="bg-ebony/80">
                <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">User</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Created</th>
                    <th className="p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id} className="border-b border-ivory/20">
                        <td className="p-2">{order.id}</td>
                        <td className="p-2">{order.user?.email ?? 'N/A'}</td>
                        <td className="p-2 text-center">{order.status}</td>
                        <td className="p-2 text-center">€{order.totalAmount}</td>
                        <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                        <td className="p-2 text-center">
                            <a
                                href={`/admin/orders/${order.id}`}
                                className="text-crimson hover:text-gold"
                            >
                                View / Edit
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
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

    const orders = JSON.parse(JSON.stringify(rawOrders)); // Convert dates to strings
    return {
        props: { orders },
    };
};
