import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreateProduct() {
    const router = useRouter();

    // ✅ State Management
    const [categories, setCategories] = useState([]);
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

    // ✅ Fetch Categories on Load
    useEffect(() => {
        fetch("/api/admin/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch(() => setError("Failed to load categories"));
    }, []);

    // ✅ Handle Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTranslationChange = (index, key, value) => {
        setFormData((prev) => ({
            ...prev,
            translations: prev.translations.map((t, i) => i === index ? { ...t, [key]: value } : t),
        }));
    };

    const addVariation = () => {
        setFormData((prev) => ({
            ...prev,
            variations: [...prev.variations, { variationType: "", variationValue: "", additionalPrice: 0 }],
        }));
    };

    const handleVariationChange = (index, key, value) => {
        setFormData((prev) => ({
            ...prev,
            variations: prev.variations.map((v, i) => i === index ? { ...v, [key]: value } : v),
        }));
    };

    // ✅ Handle Image Upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return setError("No file selected.");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload-image", { method: "POST", body: formData });
            const data = await response.json();

            if (response.ok) {
                setFormData((prev) => ({ ...prev, images: [...prev.images, data.imageUrl] }));
            } else {
                setError(data.error || "Image upload failed.");
            }
        } catch {
            setError("An error occurred while uploading the image.");
        }
    };

    // ✅ Remove Image from List
    const handleRemoveImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    // ✅ Handle Form Submission
    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        if (!formData.sku || !formData.basePrice || !formData.categoryId) {
            setLoading(false);
            return setError("SKU, Base Price, and Category are required.");
        }

        try {
            const resSession = await fetch("/api/auth/session");
            const sessionData = await resSession.json();
            if (!sessionData || !sessionData.user) throw new Error("Unauthorized: Admin session not found");

            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionData.user.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create product");

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

            {/* Category Selection */}
            <div className="mb-4">
                <label className="block">Category</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full p-2 border">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.translations.find((t) => t.language === "en")?.name || cat.slug}
                        </option>
                    ))}
                </select>
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

            {/* Image Preview with Remove Button */}
            <div className="flex gap-2 mt-2">
                {formData.images.map((url, index) => (
                    <div key={index} className="relative">
                        <img src={url} alt="Uploaded" className="w-16 h-16 object-cover rounded-md" />
                        <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">✕</button>
                    </div>
                ))}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button onClick={handleSubmit} disabled={loading} className="bg-crimson text-white px-6 py-3 mt-6 rounded-full hover:bg-gold">
                {loading ? "Creating..." : "Create Product"}
            </button>
        </main>
    );
}
