// pages/admin/products/edit.tsx
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log("✅ Image Uploaded:", data.imageUrl);

                setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, data.imageUrl],
                }));
            } else {
                console.error("❌ Image Upload Error:", data.error);
                setError(data.error || "Image upload failed");
            }
        } catch (err) {
            console.error("❌ Image Upload Error:", err);
            setError("An error occurred while uploading the image.");
        }
    };

// ✅ Function to remove an image before updating
    const handleRemoveImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
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

            {/* Image Upload */}
            <h3 className="text-xl mt-6 mb-2">Product Images</h3>
            <input type="file" onChange={handleImageUpload} className="w-full p-2 border" />

            {/* Image Preview with Remove Button */}
            <div className="flex gap-2 mt-2">
                {formData.images.map((url, index) => (
                    <div key={index} className="relative">
                        <img src={url} alt="Uploaded" className="w-16 h-16 object-cover rounded-md" />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>


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
