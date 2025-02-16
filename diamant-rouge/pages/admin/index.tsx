// pages/admin/index.tsx
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function AdminDashboard() {
    return (
        <section className="section-light min-h-screen p-8">
            <h1 className="text-3xl font-serif text-brandGold mb-4">Admin Dashboard</h1>
            <p className="text-platinumGray">
                Welcome to the Diamant-Rouge back office.
            </p>

            <ul className="mt-4 list-disc list-inside text-richEbony space-y-2">
                <li>
                    <Link
                        href="/admin/products"
                        className="text-burgundy hover:text-brandGold transition"
                    >
                        Manage Products
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/categories"
                        className="text-burgundy hover:text-brandGold transition"
                    >
                        Manage Categories
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/orders"
                        className="text-burgundy hover:text-brandGold transition"
                    >
                        View Orders
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return { props: {} };
};
