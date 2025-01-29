import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

type AdminProduct = {
    id: number;
    sku: string;
    basePrice: string;
    translations: {
        language: string;
        name: string;
    }[];
};

type ProductsAdminProps = {
    products: AdminProduct[];
};

export default function ProductsAdminPage({ products }: ProductsAdminProps) {
    return (
        <section className="p-8">
            <h1 className="text-3xl font-serif mb-6">Manage Products</h1>
            <a href="/admin/products/create" className="bg-crimson text-ivory py-2 px-4 inline-block mb-4 hover:bg-gold">
                + Add New Product
            </a>
            <table className="w-full bg-ebony/50 text-ivory">
                <thead className="bg-ebony/80">
                <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">SKU</th>
                    <th className="p-2 text-left">Name (EN)</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((prod) => {
                    const enTranslation = prod.translations.find(t => t.language === 'en');
                    return (
                        <tr key={prod.id} className="border-b border-ivory/20">
                            <td className="p-2">{prod.id}</td>
                            <td className="p-2">{prod.sku}</td>
                            <td className="p-2">{enTranslation?.name}</td>
                            <td className="p-2">€{prod.basePrice}</td>
                            <td className="p-2 text-center">
                                <a href={`/admin/products/${prod.id}/edit`} className="text-crimson hover:text-gold mr-2">
                                    Edit
                                </a>
                                <a
                                    href={`/admin/products/${prod.id}/delete`}
                                    className="text-crimson hover:text-gold"
                                >
                                    Delete
                                </a>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session || session.user.role !== 'admin') {
        return {
            redirect: { destination: '/', permanent: false },
        };
    }

    const rawProducts = await prisma.product.findMany({
        include: {
            translations: true,
        },
        orderBy: { id: 'asc' },
    });

    // Convert Date objects to strings
    const products = JSON.parse(JSON.stringify(rawProducts));

    return {
        props: {
            products,
        },
    };
};
