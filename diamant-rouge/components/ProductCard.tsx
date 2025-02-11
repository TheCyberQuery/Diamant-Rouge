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

    const productTranslation =
        product.translations.find((t) => t.language === locale) ||
        product.translations.find((t) => t.language === "en");

    const isInWishlist = wishlist.some((item) => item.productId === product.id);

    async function handleWishlist() {
        if (isInWishlist) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product.id);
        }
    }

    return (
        <div
            className="relative bg-ebony rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Wishlist Button */}
            <button
                className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                    isInWishlist ? "bg-crimson text-ivory" : "bg-ivory text-ebony"
                } shadow-lg z-10`}
                onClick={handleWishlist}
            >
                {isInWishlist ? "❤️" : "🤍"}
            </button>

            {/* Product Image */}
            <Link href={`/products/${product.id}`} passHref>
                <div className="relative w-full h-[320px] cursor-pointer">
                    <Image
                        src={product.images.length > 0 ? product.images[0] : "/images/placeholder.jpg"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        alt={productTranslation?.name || "Luxury Jewelry"}
                    />
                    {hovered && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-medium">
                            Quick View
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4 text-center">
                <h3 className="text-lg font-serif text-gold">{productTranslation?.name}</h3>
                <p className="text-platinumGray mt-1">Starting at €{parseFloat(product.basePrice).toFixed(2)}</p>
            </div>
        </div>
    );
}
