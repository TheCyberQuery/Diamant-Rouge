import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

type ProductProps = {
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
            inventory: number;
        }[];
    } | null;
    locale: string;
};

export default function ProductPage({ productData, locale }: ProductProps) {
    const { addToCart } = useCart();
    const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);

    if (!productData) {
        return (
            <section className="py-8 text-center text-ivory">
                <h1 className="text-4xl font-serif text-gold">Product Not Found</h1>
                <p className="text-platinumGray">The product you're looking for doesn't exist.</p>
            </section>
        );
    }

    const productTranslation =
        productData.translations.find(t => t.language === locale) ||
        productData.translations.find(t => t.language === 'en');

    const basePrice = parseFloat(productData.basePrice);
    const additionalPrice = selectedVariation
        ? parseFloat(
            productData.variations.find((v) => v.id === selectedVariation)?.additionalPrice || '0'
        )
        : 0;
    const totalPrice = basePrice + additionalPrice;

    const handleAddToCart = () => {
        addToCart({
            productId: productData.id,
            variationId: selectedVariation || undefined,
            sku: productData.sku,
            name: productTranslation?.name || 'Unknown',
            price: totalPrice,
            quantity,
        });
    };

    return (
        <>
            <NextSeo
                title={`Diamant-Rouge | ${productTranslation?.name}`}
                description={productTranslation?.description}
                openGraph={{
                    title: `Diamant-Rouge | ${productTranslation?.name}`,
                    description: productTranslation?.description,
                }}
            />

            <motion.section
                className="py-12 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Image */}
                <div className="relative">
                    <Image
                        src={`/images/products/diamond-cluster-earrings.png`} // Replace with real images
                        width={600}
                        height={600}
                        alt={productTranslation?.name}
                        className="rounded-lg shadow-luxury"
                    />
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="text-4xl font-serif text-gold mb-4">{productTranslation?.name}</h1>
                    <p className="text-platinumGray mb-6">{productTranslation?.description}</p>

                    {/* Variations (if available) */}
                    {productData.variations.length > 0 && (
                        <div className="mb-4">
                            <label className="block mb-2 text-ivory">Select Option</label>
                            <div className="flex gap-4">
                                {productData.variations.map((variation) => (
                                    <button
                                        key={variation.id}
                                        className={`px-4 py-2 rounded ${
                                            selectedVariation === variation.id
                                                ? 'bg-gold text-ebony'
                                                : 'bg-ebony text-ivory'
                                        }`}
                                        onClick={() => setSelectedVariation(variation.id)}
                                        disabled={variation.inventory === 0}
                                    >
                                        {variation.variationValue}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="mb-4 flex items-center gap-4">
                        <label className="text-ivory">Quantity</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="p-2 w-16 text-center bg-ebony border border-gold text-ivory rounded"
                        />
                    </div>

                    {/* Price & Add to Cart */}
                    <p className="text-2xl font-bold text-gold mb-4">€{totalPrice.toFixed(2)}</p>
                    <button
                        onClick={handleAddToCart}
                        className="bg-crimson hover:bg-gold text-ivory px-6 py-3 rounded-full font-medium transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </motion.section>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const locale = context.locale || 'en';

    const rawProductData = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            translations: true,
            variations: true,
        },
    });

    const productData = rawProductData ? JSON.parse(JSON.stringify(rawProductData)) : null;

    return {
        props: {
            productData,
            locale,
        },
    };
};
