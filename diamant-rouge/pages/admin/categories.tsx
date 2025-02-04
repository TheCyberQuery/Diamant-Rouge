import { useState, useEffect } from "react";

export default function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [newCategorySlug, setNewCategorySlug] = useState("");
    const [translations, setTranslations] = useState([{ language: "en", name: "", description: "" }]);
    const [error, setError] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        setCategories(data);
    };

    const handleTranslationChange = (index, key, value) => {
        const updatedTranslations = [...translations];
        updatedTranslations[index][key] = value;
        setTranslations(updatedTranslations);
    };

    // ✅ Handle Category Creation
    const handleCreateCategory = async () => {
        if (!newCategorySlug.trim()) return setError("Category slug is required.");
        setError("");

        const res = await fetch("/api/admin/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: newCategorySlug, translations }),
        });

        if (!res.ok) {
            setError("Failed to create category.");
            return;
        }

        setNewCategorySlug("");
        setTranslations([{ language: "en", name: "", description: "" }]);
        fetchCategories();
    };

    // ✅ Handle Category Editing
    const handleEditCategory = async () => {
        if (!editingCategory) return;
        setError("");

        const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                slug: editingCategory.slug,
                translations: editingCategory.translations,
            }),
        });

        if (!res.ok) {
            setError("Failed to update category.");
            return;
        }

        setEditingCategory(null);
        fetchCategories();
    };

    // ✅ Handle Category Deletion
    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });

        if (!res.ok) {
            setError("Failed to delete category.");
            return;
        }

        fetchCategories();
    };

    return (
        <section className="p-8">
            <h1 className="text-3xl font-serif mb-4">Manage Categories</h1>

            {/* Category Creation */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Category Slug (e.g., rings, bracelets)"
                    value={newCategorySlug}
                    onChange={(e) => setNewCategorySlug(e.target.value)}
                    className="p-2 border rounded-lg mr-2"
                />

                {translations.map((t, index) => (
                    <div key={index} className="mt-2">
                        <input
                            type="text"
                            placeholder={`Category Name (${t.language})`}
                            value={t.name}
                            onChange={(e) => handleTranslationChange(index, "name", e.target.value)}
                            className="p-2 border rounded-lg mr-2"
                        />
                        <input
                            type="text"
                            placeholder={`Description (${t.language})`}
                            value={t.description}
                            onChange={(e) => handleTranslationChange(index, "description", e.target.value)}
                            className="p-2 border rounded-lg"
                        />
                    </div>
                ))}

                <button onClick={handleCreateCategory} className="bg-gold text-black px-4 py-2 rounded-lg mt-2">
                    Create Category
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {/* Category List */}
            <ul className="mt-4 list-disc list-inside">
                {categories.map((category) => {
                    const translation = category.translations.find((t) => t.language === "en") || {};

                    return (
                        <li key={category.id} className="text-ivory flex justify-between items-center mb-2">
                            <div>
                                <strong>{translation.name || category.slug}</strong> - {translation.description || "No description available"}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingCategory(category)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Edit Form */}
            {editingCategory && (
                <div className="mt-6 p-4 border border-gray-500 rounded-lg">
                    <h2 className="text-xl font-serif mb-2">Edit Category</h2>
                    <input
                        type="text"
                        placeholder="Category Slug"
                        value={editingCategory.slug}
                        onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                        className="p-2 border rounded-lg mr-2 w-full"
                    />
                    {editingCategory.translations.map((t, index) => (
                        <div key={index} className="mt-2">
                            <input
                                type="text"
                                placeholder={`Category Name (${t.language})`}
                                value={t.name}
                                onChange={(e) => {
                                    const updatedTranslations = [...editingCategory.translations];
                                    updatedTranslations[index].name = e.target.value;
                                    setEditingCategory({ ...editingCategory, translations: updatedTranslations });
                                }}
                                className="p-2 border rounded-lg mr-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder={`Description (${t.language})`}
                                value={t.description}
                                onChange={(e) => {
                                    const updatedTranslations = [...editingCategory.translations];
                                    updatedTranslations[index].description = e.target.value;
                                    setEditingCategory({ ...editingCategory, translations: updatedTranslations });
                                }}
                                className="p-2 border rounded-lg w-full"
                            />
                        </div>
                    ))}
                    <button onClick={handleEditCategory} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                        Update Category
                    </button>
                </div>
            )}
        </section>
    );
}
