import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';
import ProductCard from '../../components/ProductCard';

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
            // ... other fields as needed
        }[];
        // ... other fields as needed
    } | null;
    locale: string;
};

export default function CollectionPage({ categoryData, locale }: CollectionProps) {
    if (!categoryData) {
        return <div>Category not found</div>;
    }

    const catTranslation =
        categoryData.translations.find(t => t.language === locale) ||
        categoryData.translations.find(t => t.language === 'en');

    return (
        <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-serif mb-4">{catTranslation?.name}</h1>
                <p className="mb-8">{catTranslation?.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categoryData.products.map((product) => {
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
                    })}
                </div>
            </div>
        </section>
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
    const categoryData = rawCategoryData
        ? JSON.parse(JSON.stringify(rawCategoryData))
        : null;

    return {
        props: {
            categoryData,
            locale,
        },
    };
};
