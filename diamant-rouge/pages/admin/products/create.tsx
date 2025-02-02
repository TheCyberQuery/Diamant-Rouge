// pages/admin/products/create.tsx
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateProduct() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        sku: "",
        basePrice: "",
        categoryId: "",
        translations: [{ language: "en", name: "", description: "" }],
        variations: [],
        images: [],
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTranslationChange = (index, key, value) => {
        const updatedTranslations = [...formData.translations];
        updatedTranslations[index][key] = value;
        setFormData((prev) => ({ ...prev, translations: updatedTranslations }));
    };

    const addVariation = () => {
        setFormData((prev) => ({
            ...prev,
            variations: [...prev.variations, { variationType: "", variationValue: "", additionalPrice: 0 }],
        }));
    };

    const handleVariationChange = (index, key, value) => {
        const updatedVariations = [...formData.variations];
        updatedVariations[index][key] = value;
        setFormData((prev) => ({ ...prev, variations: updatedVariations }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, data.imageUrl],
                }));
            } else {
                setError(data.error || "Image upload failed");
            }
        } catch (err) {
            console.error("❌ Image Upload Error:", err);
            setError("An error occurred while uploading the image.");
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            // ✅ Manually extract token from cookies
            const resSession = await fetch("/api/auth/session");
            const sessionData = await resSession.json();
            if (!sessionData || !sessionData.user) {
                throw new Error("Unauthorized: Admin session not found");
            }

            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionData.user.token}`, // ✅ Include Token
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            router.push("/admin/products");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-serif mb-6">Create Product</h1>

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

            {/* Variations */}
            <h3 className="text-xl mt-6 mb-2">Variations</h3>
            {formData.variations.map((v, index) => (
                <div key={index} className="mb-4">
                    <input value={v.variationType} onChange={(e) => handleVariationChange(index, "variationType", e.target.value)} className="w-1/3 p-2 border" placeholder="Type (e.g., Size)" />
                    <input value={v.variationValue} onChange={(e) => handleVariationChange(index, "variationValue", e.target.value)} className="w-1/3 p-2 border" placeholder="Value (e.g., 5)" />
                    <input type="number" value={v.additionalPrice} onChange={(e) => handleVariationChange(index, "additionalPrice", e.target.value)} className="w-1/3 p-2 border" placeholder="Extra Cost" />
                </div>
            ))}
            <button onClick={addVariation} className="bg-gold text-black px-4 py-2 mt-2">Add Variation</button>

            {/* Image Upload */}
            <h3 className="text-xl mt-6 mb-2">Images</h3>
            <input type="file" onChange={handleImageUpload} className="w-full p-2 border" />
            <div className="flex gap-2 mt-2">
                {formData.images.map((url, index) => (
                    <img key={index} src={url} alt="Uploaded" className="w-16 h-16 object-cover" />
                ))}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button onClick={handleSubmit} disabled={loading} className="bg-crimson text-white px-6 py-3 mt-6 rounded-full hover:bg-gold">
                {loading ? "Creating..." : "Create Product"}
            </button>
        </main>
    );
}
