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
    const [selectedImage, setSelectedImage] = useState(
        productData?.images[0] || "/images/placeholder.jpg"
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!productData) {
        return (
            <section className="py-12 text-center section-dark">
                <h1 className="text-5xl font-serif text-brandGold mb-4">
                    Exclusive Masterpiece Not Found
                </h1>
                <p className="text-platinumGray">
                    The bespoke creation you seek is no longer available.
                </p>
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

            {/* Main Section */}
            <motion.section
                className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 📸 Image Showcase */}
                <div className="relative">
                    <div
                        className="relative group cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Image
                            src={selectedImage}
                            width={700}
                            height={700}
                            alt={productTranslation?.name}
                            className="rounded-lg shadow-luxury transition-transform duration-300 hover:scale-105"
                        />
                        {/* Light burgundy overlay on hover instead of Ebony */}
                        <div className="absolute inset-0 bg-burgundy/20 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg"></div>
                    </div>

                    {/* 🔍 Thumbnails */}
                    <div className="flex gap-3 mt-4">
                        {productData.images.map((image, index) => {
                            const isSelected = selectedImage === image;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className="rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={image}
                                        width={90}
                                        height={90}
                                        alt={`Thumbnail ${index}`}
                                        className={`cursor-pointer transition ${
                                            isSelected
                                                ? "border-4 border-brandGold"
                                                : "opacity-80 hover:opacity-100"
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 🏷 Product Details */}
                <div>
                    <h1 className="text-5xl font-serif text-brandGold mb-4">
                        {productTranslation?.name}
                    </h1>
                    <p className="text-lg text-platinumGray mb-6">
                        {productTranslation?.description}
                    </p>

                    {/* 💳 Secure Payment Block */}
                    <div className="bg-burgundy/10 p-4 rounded-lg text-richEbony mb-6">
                        <h3 className="text-lg font-semibold text-brandGold mb-2">
                            Secure & Confidential Transactions
                        </h3>
                        <div className="flex items-center gap-4">
                            <Image
                                src="/images/icons/img.icons8.png"
                                width={40}
                                height={24}
                                alt="Visa"
                            />
                            <Image
                                src="/images/icons/mastercard-old.svg"
                                width={40}
                                height={24}
                                alt="Mastercard"
                            />
                            <p className="text-sm text-platinumGray">
                                Guaranteed authenticity & privacy
                            </p>
                        </div>
                    </div>

                    {/* 🎨 Variations */}
                    {productData.variations.length > 0 && (
                        <div className="mb-6">
                            <label className="block mb-2 text-richEbony font-semibold">
                                Select Customization
                            </label>
                            <div className="flex flex-wrap gap-4">
                                {productData.variations.map((variation) => {
                                    const isActive = selectedVariation === variation.id;
                                    return (
                                        <button
                                            key={variation.id}
                                            onClick={() => setSelectedVariation(variation.id)}
                                            className={`px-4 py-2 rounded font-medium transition duration-300
                        ${
                                                isActive
                                                    ? "bg-burgundy text-brandIvory"
                                                    : "bg-burgundy/20 text-richEbony hover:bg-burgundy/40"
                                            }`}
                                        >
                                            {variation.variationValue}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* 💰 Price Display */}
                    <p className="text-3xl font-bold text-brandGold mb-6">
                        {selectedVariation
                            ? `Customized Price: €${totalPrice.toFixed(2)}`
                            : `Starting at €${totalPrice.toFixed(2)}`}
                    </p>

                    {/* 🛒 Add to Cart */}
                    <button
                        onClick={() =>
                            addToCart({
                                image: selectedImage,
                                productId: productData.id,
                                variationId: selectedVariation || undefined,
                                sku: productData.sku,
                                name: productTranslation?.name || "Unknown",
                                price: totalPrice,
                                quantity: 1,
                            })
                        }
                        className="bg-burgundy hover:bg-brandGold text-brandIvory px-6 py-3 rounded-full font-medium transition duration-300 w-full"
                    >
                        Add to Cart
                    </button>

                    {/* ✨ Book a Private Viewing (No Ebony in light mode) */}
                    <Link href="/appointments" passHref>
                        <button className="bg-burgundy hover:bg-brandGold text-brandIvory px-6 py-3 rounded-full font-medium transition duration-300 mt-4 w-full">
                            Try in Showroom
                        </button>
                    </Link>
                </div>
            </motion.section>
        </>
    );
}

// ✅ Fetch product securely & Convert Decimal Fields to String
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = parseInt(context.params?.id as string, 10);
    if (isNaN(id)) return { notFound: true };

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            translations: true,
            variations: true, // ✅ Ensure variations are always included
        },
    });

    if (!product) return { notFound: true };

    return {
        props: {
            productData: {
                ...JSON.parse(JSON.stringify(product)),
                basePrice: product.basePrice.toString(), // ✅ Convert Decimal to String
                variations: product.variations.map((variation) => ({
                    ...variation,
                    additionalPrice: variation.additionalPrice.toString(), // ✅ Convert Decimal to String
                })),
            },
            locale: context.locale || "en",
        },
    };
};
