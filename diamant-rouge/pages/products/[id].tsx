import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { prisma } from '../../lib/prisma';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/router';

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
    } | null;
    locale: string;
};

export default function ProductDetailPage({ productData, locale }: ProductDetailProps) {
    const { addToCart } = useCart();
    const router = useRouter();

    if (!productData) {
        return <div>Product not found</div>;
    }

    const translation =
        productData.translations.find(t => t.language === locale) ||
        productData.translations.find(t => t.language === 'en');

    function handleAddToCart() {
        addToCart({
            productId: productData.id,
            sku: productData.sku,
            name: translation?.name || 'No name',
            price: parseFloat(productData.basePrice),
            quantity: 1,
        });
        // Possibly redirect or show a notification
        router.push('/cart');
    }

    return (
        <>
            <Head>
                <title>{translation?.name} | Diamant-Rouge</title>
            </Head>
            <main className="p-8">
                <h1 className="text-3xl font-serif mb-2">{translation?.name}</h1>
                <p className="mb-2">SKU: {productData.sku}</p>
                <p className="mb-2">Price: €{productData.basePrice}</p>
                <p className="mb-4">{translation?.description}</p>

                {/* Scarcity Cue */}
                <p className="text-crimson font-bold mb-4">Limited Stock: Only 5 left!</p>

                <button
                    onClick={handleAddToCart}
                    className="bg-crimson hover:bg-gold text-ivory py-2 px-4"
                >
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
