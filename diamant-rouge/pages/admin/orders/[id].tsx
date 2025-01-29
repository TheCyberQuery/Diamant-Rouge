import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';
import { useState } from 'react';

type OrderEditProps = {
    orderData: any;
};

export default function OrderEditPage({ orderData }: OrderEditProps) {
    const [orderStatus, setOrderStatus] = useState(orderData.status);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleStatusUpdate() {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/orders/${orderData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: orderStatus }),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.error || 'Failed to update order');
            } else {
                setMessage('Order updated successfully');
            }
        } catch (error) {
            setMessage('Error updating order');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="p-8 text-ivory">
            <h1 className="text-3xl font-serif mb-4">
                Editing Order #{orderData.id}
            </h1>
            {message && <p className="text-crimson mb-2">{message}</p>}

            <div className="space-y-2">
                <p>User: {orderData.user?.email}</p>
                <p>Created At: {new Date(orderData.createdAt).toLocaleString()}</p>
                <p>Address: {orderData.shippingAddress}, {orderData.city} {orderData.postalCode}, {orderData.country}</p>
                <p>Total: €{orderData.totalAmount}</p>

                <label>Status</label>
                <select
                    className="text-ebony p-2"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>
                <button
                    onClick={handleStatusUpdate}
                    className="bg-crimson hover:bg-gold text-ivory px-4 py-2 ml-2"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Status'}
                </button>
            </div>

            <h2 className="text-2xl font-serif mt-8 mb-4">Order Items</h2>
            <ul className="space-y-2">
                {orderData.orderItems.map((item: any) => (
                    <li key={item.id} className="bg-ebony/50 p-4">
                        <p>Product ID: {item.productId}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: €{item.price}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const session = await getSession(context);
    if (!session || session.user.role !== 'admin') {
        return {
            redirect: { destination: '/', permanent: false },
        };
    }

    const rawOrder = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            orderItems: true,
        },
    });
    if (!rawOrder) {
        return { notFound: true };
    }

    const orderData = JSON.parse(JSON.stringify(rawOrder));
    return { props: { orderData } };
};
