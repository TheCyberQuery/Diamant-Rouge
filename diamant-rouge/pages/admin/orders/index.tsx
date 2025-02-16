// pages/admin/orders/index.tsx
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";

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
        <section className="section-light min-h-screen p-8">
            <h1 className="text-4xl font-serif text-brandGold mb-6">Manage Orders</h1>

            {orders.length === 0 ? (
                <p className="text-platinumGray">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-burgundy/10 text-richEbony rounded-lg shadow-luxury">
                        <thead className="bg-burgundy/20 text-brandGold">
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
                            <tr
                                key={order.id}
                                className="border-b border-platinumGray/30 hover:bg-burgundy/5 transition"
                            >
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.user?.email ?? "Guest"}</td>
                                <td className="p-3 text-center">{order.status}</td>
                                <td className="p-3 text-center">€{order.totalAmount}</td>
                                <td className="p-3">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td className="p-3 text-center">
                                    <Link href={`/admin/orders/${order.id}`} className="button-secondary">
                                        View / Edit
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
    if (!session || session.user.role !== "admin") {
        return {
            redirect: { destination: "/", permanent: false },
        };
    }

    const rawOrders = await prisma.order.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });

    return {
        props: { orders: JSON.parse(JSON.stringify(rawOrders)) },
    };
};
