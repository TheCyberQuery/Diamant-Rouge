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
    const [hovered, setHovered] = useState(false);

    // Determine the product name based on the current locale
    const productTranslation =
        product.translations.find((t) => t.language === locale) ||
        product.translations.find((t) => t.language === "en");

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
        <div
            className="card hover-scale relative overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Wishlist Button */}
            <button
                onClick={handleWishlist}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all shadow-luxury z-10
          ${isInWishlist ? "bg-burgundy text-brandIvory" : "bg-brandIvory text-richEbony"}
        `}
            >
                {isInWishlist ? "❤️" : "🤍"}
            </button>

            {/* Product Image & Quick View Overlay */}
            <Link href={`/products/${product.id}`} passHref>
                <div className="relative w-full h-[320px] cursor-pointer rounded-lg overflow-hidden">
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
                    {hovered && (
                        <div className="absolute inset-0 bg-burgundy/40 flex items-center justify-center text-brandIvory text-lg font-medium">
                            Quick View
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4 text-center">
                <h3 className="text-lg font-serif text-brandGold">
                    {productTranslation?.name}
                </h3>
                <p className="text-platinumGray mt-1">
                    Starting at €{parseFloat(product.basePrice).toFixed(2)}
                </p>
            </div>
        </div>
    );
}
