import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import Link from "next/link";

type ProductProps = {
    productData: {
        id: number;
        sku: string;
        basePrice: string;
        images: string[];
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

export default function ProductPage({ productData, locale }: ProductProps) {
    const { addToCart } = useCart();
    const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
    const [quantity] = useState(1);

    // ✅ Image state for preview and full-screen mode
    const [selectedImage, setSelectedImage] = useState(
        productData?.images?.length > 0 ? productData.images[0] : "/images/placeholder.jpg"
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!productData) {
        return (
            <section className="py-8 text-center text-ivory">
                <h1 className="text-4xl font-serif text-gold">Creation Not Found</h1>
                <p className="text-platinumGray">The piece you're looking for doesn't exist.</p>
            </section>
        );
    }

    const productTranslation =
        productData.translations.find((t) => t.language === locale) ||
        productData.translations.find((t) => t.language === "en");

    const basePrice = parseFloat(productData.basePrice);
    const additionalPrice = selectedVariation
        ? parseFloat(
            productData.variations.find((v) => v.id === selectedVariation)?.additionalPrice || "0"
        )
        : 0;
    const totalPrice = basePrice + additionalPrice;

    const handleAddToCart = () => {
        addToCart({
            productId: productData.id,
            variationId: selectedVariation || undefined,
            sku: productData.sku,
            name: productTranslation?.name || "Unknown",
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
                {/* Image Section */}
                <div className="relative">
                    {/* ✅ Main Image Display with Zoom Effect */}
                    <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        <Image
                            src={selectedImage}
                            width={600}
                            height={600}
                            alt={productTranslation?.name}
                            className="rounded-lg shadow-luxury transition-opacity duration-300 group-hover:scale-105"
                        />
                        {/* Zoom effect on hover */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition duration-300 rounded-lg"></div>
                    </div>

                    {/* ✅ Thumbnails Carousel */}
                    <div className="flex gap-2 mt-4">
                        {productData.images.map((image, index) => (
                            <button key={index} onClick={() => setSelectedImage(image)}>
                                <Image
                                    src={image}
                                    width={100}
                                    height={100}
                                    alt={`Thumbnail ${index}`}
                                    className={`rounded-lg cursor-pointer transition ${
                                        selectedImage === image ? "border-4 border-gold" : "opacity-80 hover:opacity-100"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="text-4xl font-serif text-gold mb-4">{productTranslation?.name}</h1>
                    <p className="text-platinumGray mb-6">{productTranslation?.description}</p>

                    {/* Secure Payment Info */}
                    <div className="flex items-center gap-2 bg-ebony/60 p-3 rounded-lg mb-4">
                        <p className="text-sm text-ivory">Secure Payment</p>
                        <Image src="/images/icons/img.icons8.png" width={40} height={24} alt="Visa" />
                        <Image src="/images/icons/mastercard-old.svg" width={40} height={24} alt="Mastercard" />
                    </div>

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
                                                ? "bg-gold text-ebony"
                                                : "bg-ebony text-ivory"
                                        }`}
                                        onClick={() => setSelectedVariation(variation.id)}
                                    >
                                        {variation.variationValue}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price Display */}
                    <p className="text-2xl font-bold text-gold mb-4">Starting at €{totalPrice.toFixed(2)}</p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4">
                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-crimson hover:bg-gold text-ivory px-6 py-3 rounded-full font-medium transition duration-300"
                        >
                            Add to Cart
                        </button>

                        {/* Try in Showroom */}
                        <Link href="/appointments">
                            <button className="bg-ebony hover:bg-gold text-ivory px-6 py-3 rounded-full font-medium transition duration-300">
                                Try in Showroom
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.section>

            {/* ✅ Full-Screen Image Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative max-w-4xl">
                        <Image
                            src={selectedImage}
                            width={1000}
                            height={1000}
                            alt="Full Screen View"
                            className="rounded-lg shadow-luxury transition-transform duration-500 transform scale-100 hover:scale-105"
                        />
                        <button
                            className="absolute top-4 right-4 text-white bg-ebony p-2 rounded-full"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const locale = context.locale || "en";

    const rawProductData = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            translations: true,
            variations: true,
        },
    });

    if (!rawProductData) {
        return { notFound: true };
    }

    return {
        props: {
            productData: JSON.parse(JSON.stringify(rawProductData)),
            locale,
        },
    };
};
