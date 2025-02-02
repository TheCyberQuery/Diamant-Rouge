import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../lib/prisma';
import { useRouter } from 'next/router';

export default function DeleteProductPage({ product }: { product: any }) {
    const router = useRouter();

    async function handleDelete() {
        const res = await fetch(`/api/admin/products/${product.id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            router.push("/admin/products");
        }
    }

    return (
        <main className="max-w-lg mx-auto p-6 text-center">
            <h1 className="text-3xl font-serif text-crimson mb-6">Confirm Deletion</h1>
            <p className="mb-4">Are you sure you want to delete <strong>{product.translations.find((t: any) => t.language === "en")?.name || "this product"}</strong>?</p>

            <button onClick={handleDelete} className="bg-crimson text-white px-6 py-3 rounded-full hover:bg-gold">Delete</button>
            <button onClick={() => router.push("/admin/products")} className="ml-4 bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-800">Cancel</button>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session || session.user.role !== 'admin') {
        return { redirect: { destination: '/', permanent: false } };
    }

    const { id } = context.params!;
    const rawProduct = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { translations: true },
    });

    if (!rawProduct) {
        return { notFound: true };
    }

    const product = JSON.parse(JSON.stringify(rawProduct));
    return { props: { product } };
};
