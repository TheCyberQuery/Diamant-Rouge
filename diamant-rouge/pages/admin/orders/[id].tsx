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
        setMessage('');

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
            <h1 className="text-4xl font-serif text-gold mb-6">Editing Order #{orderData.id}</h1>
            {message && <p className="text-crimson mb-2">{message}</p>}

            <div className="bg-richEbony p-6 rounded-lg shadow-lg space-y-3">
                <p><strong>User:</strong> {orderData.user?.email || 'Guest'}</p>
                <p><strong>Created At:</strong> {new Date(orderData.createdAt).toLocaleString()}</p>
                <p><strong>Address:</strong> {orderData.shippingAddress}, {orderData.city} {orderData.postalCode}, {orderData.country}</p>
                <p><strong>Total:</strong> €{orderData.totalAmount}</p>

                {/* Update Status */}
                <div className="mt-4">
                    <label className="block text-lg mb-2">Update Status</label>
                    <select
                        className="bg-ebony border border-gold text-ivory px-3 py-2 rounded-md"
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        disabled={loading}
                    >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>

                <button
                    onClick={handleStatusUpdate}
                    className="mt-4 bg-crimson hover:bg-gold text-ivory px-6 py-3 rounded-lg transition"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Status'}
                </button>
            </div>

            <h2 className="text-3xl font-serif text-gold mt-8 mb-4">Order Items</h2>
            <ul className="space-y-4">
                {orderData.orderItems.map((item: any) => {
                    const productName = item.product.translations.find((t: any) => t.language === 'en')?.name || 'Unnamed Product';
                    return (
                        <li key={item.id} className="bg-ebony/50 p-4 rounded-lg">
                            <p><strong>{productName}</strong></p>
                            <p>SKU: {item.product.sku}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: €{parseFloat(item.price).toFixed(2)}</p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const session = await getSession(context);
    if (!session || session.user.role !== 'admin') {
        return { redirect: { destination: '/', permanent: false } };
    }

    const rawOrder = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: {
                        include: { translations: true },
                    },
                },
            },
        },
    });

    if (!rawOrder) {
        return { notFound: true };
    }

    return {
        props: { orderData: JSON.parse(JSON.stringify(rawOrder)) },
    };
};
