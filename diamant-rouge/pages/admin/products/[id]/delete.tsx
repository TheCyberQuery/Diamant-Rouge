// pages/admin/products/[id]/delete.tsx

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../lib/prisma";
import { useRouter } from "next/router";

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
        <main className="section-light min-h-screen p-6 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-serif text-burgundy mb-4">
                Confirm Deletion
            </h1>
            <p className="text-platinumGray mb-6 text-center max-w-md">
                Are you sure you want to delete{" "}
                <strong>
                    {product.translations.find((t: any) => t.language === "en")?.name ||
                        "this product"}
                </strong>
                ?
            </p>

            <div className="flex gap-6">
                <button
                    onClick={handleDelete}
                    className="button-primary text-center"
                >
                    Delete
                </button>
                <button
                    onClick={() => router.push("/admin/products")}
                    className="button-secondary"
                >
                    Cancel
                </button>
            </div>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session || session.user.role !== "admin") {
        return { redirect: { destination: "/", permanent: false } };
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
