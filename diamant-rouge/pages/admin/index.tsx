import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function AdminDashboard() {
    return (
        <section className="p-8">
            <h1 className="text-3xl font-serif mb-4">Admin Dashboard</h1>
            <p>Welcome to the Diamant-Rouge back office.</p>
            <ul className="mt-4 list-disc list-inside">
                <li>
                    <a href="/admin/products" className="text-crimson hover:text-gold">
                        Manage Products
                    </a>
                </li>
                <li>
                    <a href="/admin/categories" className="text-crimson hover:text-gold">
                        Manage Categories
                    </a>
                </li>
                <li>
                    <a href="/admin/orders" className="text-crimson hover:text-gold">
                        View Orders
                    </a>
                </li>
            </ul>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return { props: {} };
};
