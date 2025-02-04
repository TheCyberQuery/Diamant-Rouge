import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";
import ProductCard from "../../components/ProductCard";
import { NextSeo } from "next-seo";
import { useState } from "react";

type CollectionProps = {
    categoryData: {
        slug: string;
        translations: {
            language: string;
            name: string;
            description: string | null;
        }[];
        products: {
            id: number;
            sku: string;
            basePrice: string;
            images: string[];
            createdAt: string; // ✅ Ensure date is returned as a string
            translations: {
                language: string;
                name: string;
            }[];
        }[];
    } | null;
    locale: string;
};

export default function CollectionPage({ categoryData, locale }: CollectionProps) {
    if (!categoryData) {
        return (
            <section className="py-8 text-center text-ivory">
                <h1 className="text-4xl font-serif text-gold">Collection Not Found</h1>
                <p className="text-platinumGray">The collection you're looking for doesn't exist.</p>
            </section>
        );
    }

    const catTranslation =
        categoryData.translations.find((t) => t.language === locale) ||
        categoryData.translations.find((t) => t.language === "en");

    // Sorting & Filtering (Frontend)
    const [sortOption, setSortOption] = useState("default");

    const sortedProducts = [...categoryData.products].sort((a, b) => {
        if (sortOption === "price-asc") {
            return parseFloat(a.basePrice) - parseFloat(b.basePrice);
        }
        if (sortOption === "price-desc") {
            return parseFloat(b.basePrice) - parseFloat(a.basePrice);
        }
        return 0;
    });

    return (
        <>
            <NextSeo
                title={`Diamant-Rouge | ${catTranslation?.name}`}
                description={catTranslation?.description || "Discover our exclusive jewelry collections."}
                openGraph={{
                    title: `Diamant-Rouge | ${catTranslation?.name}`,
                    description: catTranslation?.description || "Luxury jewelry collection by Diamant-Rouge.",
                }}
            />

            <section className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-serif text-gold mb-4">{catTranslation?.name}</h1>
                    <p className="mb-8 text-platinumGray">{catTranslation?.description}</p>

                    {/* Sorting Dropdown */}
                    <div className="flex justify-end mb-6">
                        <select
                            className="p-2 bg-ebony text-ivory rounded-lg border border-gold"
                            onChange={(e) => setSortOption(e.target.value)}
                            value={sortOption}
                        >
                            <option value="default">Sort By</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} locale={locale} /> // ✅ Corrected Prop Passing
                            ))
                        ) : (
                            <p className="text-center text-platinumGray col-span-3">
                                No products found in this collection.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params!;
    const locale = context.locale || "en";

    const rawCategoryData = await prisma.category.findUnique({
        where: { slug: slug as string },
        include: {
            translations: true,
            products: {
                include: {
                    translations: true,
                },
            },
        },
    });

    // ✅ Ensure all `Date` fields are converted to ISO strings to prevent serialization errors
    const categoryData = rawCategoryData
        ? JSON.parse(
            JSON.stringify({
                ...rawCategoryData,
                createdAt: rawCategoryData.createdAt ? rawCategoryData.createdAt.toISOString() : null, // ✅ Convert Date
                updatedAt: rawCategoryData.updatedAt ? rawCategoryData.updatedAt.toISOString() : null, // ✅ Convert Date
                products: rawCategoryData.products.map((product) => ({
                    ...product,
                    images: product.images || [], // ✅ Ensures products always have an "images" array
                    createdAt: product.createdAt ? product.createdAt.toISOString() : null, // ✅ Convert Date
                    updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null, // ✅ Convert Date
                })),
            })
        )
        : null;

    return {
        props: {
            categoryData,
            locale,
        },
    };
};
