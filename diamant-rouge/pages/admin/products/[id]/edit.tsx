import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../lib/prisma';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EditProductPage({ product }: { product: any }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        sku: product.sku,
        basePrice: product.basePrice.toString(),
        categoryId: product.categoryId || "",
        translations: product.translations,
        images: product.images || [],
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTranslationChange = (index: number, key: string, value: string) => {
        const updatedTranslations = [...formData.translations];
        updatedTranslations[index][key] = value;
        setFormData((prev) => ({ ...prev, translations: updatedTranslations }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/admin/products/${product.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to update product");
            }

            router.push("/admin/products");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-serif mb-6">Edit Product</h1>

            {/* SKU & Price */}
            <div className="mb-4">
                <label className="block">SKU</label>
                <input name="sku" value={formData.sku} onChange={handleInputChange} className="w-full p-2 border" />
            </div>
            <div className="mb-4">
                <label className="block">Base Price (€)</label>
                <input name="basePrice" type="number" value={formData.basePrice} onChange={handleInputChange} className="w-full p-2 border" />
            </div>

            {/* Translations */}
            <h3 className="text-xl mt-6 mb-2">Translations</h3>
            {formData.translations.map((t, index) => (
                <div key={index} className="mb-4">
                    <label className="block">Language ({t.language})</label>
                    <input value={t.name} onChange={(e) => handleTranslationChange(index, "name", e.target.value)} className="w-full p-2 border" placeholder="Product Name" />
                    <textarea value={t.description} onChange={(e) => handleTranslationChange(index, "description", e.target.value)} className="w-full p-2 border mt-2" placeholder="Description"></textarea>
                </div>
            ))}

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button onClick={handleSubmit} disabled={loading} className="bg-crimson text-white px-6 py-3 mt-6 rounded-full hover:bg-gold">
                {loading ? "Updating..." : "Update Product"}
            </button>
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
