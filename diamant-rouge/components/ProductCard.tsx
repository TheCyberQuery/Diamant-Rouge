// components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "../contexts/WishlistContext";
import { useState } from "react";

type ProductCardProps = {
    product: {
        id: number;
        sku: string;
        basePrice: string;
        images: string[];
        translations: {
            language: string;
            name: string;
        }[];
    };
    locale: string;
};

export default function ProductCard({ product, locale }: ProductCardProps) {
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

    // Determine the product name based on the current locale,
    // defaulting to French ("fr") if no match is found.
    const productTranslation =
        product.translations.find((t) => t.language === locale) ||
        product.translations.find((t) => t.language === "fr");

    // Check if product is in the user's wishlist
    const isInWishlist = wishlist.some((item) => item.productId === product.id);

    // Toggle wishlist status
    async function handleWishlist() {
        if (isInWishlist) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product.id);
        }
    }

    return (
        <div className="relative overflow-hidden">
            {/* Product Image */}
            <Link href={`/products/${product.id}`} passHref legacyBehavior>
                <a className="block relative w-full h-[320px] rounded-lg overflow-hidden cursor-pointer">
                    <Image
                        src={
                            product.images.length > 0
                                ? product.images[0]
                                : "/images/placeholder.jpg"
                        }
                        layout="fill"
                        objectFit="cover"
                        alt={productTranslation?.name || "Luxury Jewelry"}
                        className="rounded-lg"
                    />
                </a>
            </Link>

            {/* Title and Wishlist Button inline */}
            <div className="px-3 pt-2 flex items-center justify-between">
                <h3 className="text-lg font-serif text-brandGold">
                    {productTranslation?.name}
                </h3>
                <button onClick={handleWishlist} className="p-2 transition-all">
                    {isInWishlist ? "❤️" : "🤍"}
                </button>
            </div>

            {/* Product Price (margin removed using m-0) */}
            <div className="px-3 text-left">
                <p className="text-platinumGray m-0">
                    Starting at €{parseFloat(product.basePrice).toFixed(2)}
                </p>
            </div>

            {/* "Voir la création" Button aligned to the left */}
            <div className="px-3 pb-3 pt-2 text-left">
                <Link href={`/products/${product.id}`} passHref legacyBehavior>
                    <a className="mt-2 border border-brandGold text-brandGold font-semibold text-sm px-4 py-2">
                        Voir la création
                    </a>
                </Link>
            </div>
        </div>
    );
}
