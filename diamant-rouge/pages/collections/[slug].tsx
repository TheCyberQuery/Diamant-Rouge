// pages/collections/[slug].tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { prisma } from '../../lib/prisma';

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
    };
    locale: string;
};

export default function CollectionPage({ categoryData, locale }: CollectionProps) {
    if (!categoryData) {
        return <div>Category not found</div>;
    }

    // Find the translation that matches the current locale or fallback to 'en'
    const catTranslation =
        categoryData.translations.find(t => t.language === locale) ||
        categoryData.translations.find(t => t.language === 'en');

    return (
        <>
            <Head>
                <title>{catTranslation?.name} | Diamant-Rouge</title>
            </Head>
            <main style={{ padding: '2rem' }}>
                <h1>{catTranslation?.name}</h1>
                {catTranslation?.description && <p>{catTranslation.description}</p>}

                <section style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
                    {categoryData.products.map((product) => {
                        const productTranslation =
                            product.translations.find(t => t.language === locale) ||
                            product.translations.find(t => t.language === 'en');

                        return (
                            <div key={product.id} style={{ border: '1px solid #AAA', padding: '1rem', width: '200px' }}>
                                <h2>{productTranslation?.name}</h2>
                                <p>SKU: {product.sku}</p>
                                <p>Price: €{product.basePrice}</p>
                                {/* Link to Product Detail Page */}
                                <a href={`/products/${product.id}`}>View Details</a>
                            </div>
                        );
                    })}
                </section>
            </main>
        </>
    );
}

function serializeSpecialFields<T>(data: T): T {
    return JSON.parse(
        JSON.stringify(data, (key, value) => {
            if (value instanceof Date) {
                return value.toISOString(); // Convert Date to ISO string
            }
            if (value && typeof value === 'object' && value.constructor.name === 'Decimal') {
                return value.toString(); // Convert Prisma Decimal to string
            }
            return value;
        })
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params!;
    const locale = context.locale || 'en'; // for future i18n usage

    // Fetch category & its products
    const categoryData = await prisma.category.findUnique({
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

    return {
        props: {
            categoryData: categoryData ? serializeSpecialFields(categoryData) : null,
            locale,
        },
    };
};
