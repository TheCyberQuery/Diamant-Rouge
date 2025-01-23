// pages/products/[id].tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { prisma } from '../../lib/prisma';

type ProductDetailProps = {
    productData: {
        id: number;
        sku: string;
        basePrice: string;
        translations: {
            language: string;
            name: string;
            description: string;
        }[];
        variations: {
            id: number;
            variationType: string;
            variationValue: string;
            additionalPrice: string;
        }[];
    } | null;
    locale: string;
};

export default function ProductDetailPage({ productData, locale }: ProductDetailProps) {
    if (!productData) {
        return <div>Product not found</div>;
    }

    // Find translation based on locale
    const translation =
        productData.translations.find(t => t.language === locale) ||
        productData.translations.find(t => t.language === 'en');

    return (
        <>
            <Head>
                <title>{translation?.name} | Diamant-Rouge</title>
            </Head>
            <main style={{ padding: '2rem' }}>
                <h1>{translation?.name}</h1>
                <p>SKU: {productData.sku}</p>
                <p>Base Price: €{productData.basePrice}</p>
                <p>{translation?.description}</p>

                {/* Psychological Cue: Scarcity (dummy example) */}
                <p style={{ color: '#A00000', fontWeight: 'bold' }}>
                    Limited Stock: Only 5 left!
                </p>

                {/* Variations */}
                <div style={{ marginTop: '1rem' }}>
                    <h3>Available Options</h3>
                    <ul>
                        {productData.variations.map((v) => (
                            <li key={v.id}>
                                {v.variationType}: {v.variationValue} (Extra: €{v.additionalPrice})
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Call to Action */}
                <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#A00000', color: '#fff' }}>
                    Add to Cart
                </button>
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
    const { id } = context.params!;
    const locale = context.locale || 'en';

    // Fetch product by ID
    const productData = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            translations: true,
            variations: true,
        },
    });

    return {
        props: {
            productData: productData ? serializeSpecialFields(productData) : null,
            locale,
        },
    };
};
