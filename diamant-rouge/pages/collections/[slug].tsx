import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';
import ProductCard from '../../components/ProductCard';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

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
        categoryData.translations.find(t => t.language === locale) ||
        categoryData.translations.find(t => t.language === 'en');

    // Sorting & Filtering (Frontend)
    const [sortOption, setSortOption] = useState('default');
    let sortedProducts = [...categoryData.products];

    if (sortOption === 'price-asc') {
        sortedProducts.sort((a, b) => parseFloat(a.basePrice) - parseFloat(b.basePrice));
    } else if (sortOption === 'price-desc') {
        sortedProducts.sort((a, b) => parseFloat(b.basePrice) - parseFloat(a.basePrice));
    }

    return (
        <>
            <NextSeo
                title={`Diamant-Rouge | ${catTranslation?.name}`}
                description={catTranslation?.description || 'Discover our exclusive jewelry collections.'}
                openGraph={{
                    title: `Diamant-Rouge | ${catTranslation?.name}`,
                    description: catTranslation?.description || 'Luxury jewelry collection by Diamant-Rouge.',
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
                            sortedProducts.map((product) => {
                                const productTranslation =
                                    product.translations.find(t => t.language === locale) ||
                                    product.translations.find(t => t.language === 'en');

                                return (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        sku={product.sku}
                                        name={productTranslation?.name || 'No Name'}
                                        price={product.basePrice}
                                    />
                                );
                            })
                        ) : (
                            <p className="text-center text-platinumGray col-span-3">No products found in this collection.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params!;
    const locale = context.locale || 'en';

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

    // Convert Date fields to ISO strings
    const categoryData = rawCategoryData ? JSON.parse(JSON.stringify(rawCategoryData)) : null;

    return {
        props: {
            categoryData,
            locale,
        },
    };
};
