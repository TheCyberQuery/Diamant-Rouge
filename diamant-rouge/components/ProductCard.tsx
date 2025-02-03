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
            description?: string;
        }[];
    };
    locale: string;
};

export default function ProductCard({ product, locale }: ProductCardProps) {
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [loading, setLoading] = useState(false);

    const productTranslation =
        product.translations.find((t) => t.language === locale) ||
        product.translations.find((t) => t.language === "en");

    const isInWishlist = wishlist.some((item) => item.productId === product.id);

    async function handleWishlist() {
        setLoading(true);
        if (isInWishlist) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product.id);
        }
        setLoading(false);
    }

    return (
        <div className="bg-ebony p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 relative">
            {/* Wishlist Button */}
            <button
                className={`absolute top-3 right-3 p-2 rounded-full ${isInWishlist ? "bg-crimson text-ivory" : "bg-ivory text-ebony"} shadow-lg`}
                onClick={handleWishlist}
                disabled={loading}
            >
                {isInWishlist ? "❤️" : "🤍"}
            </button>

            {/* Product Image */}
            <Link href={`/products/${product.id}`} passHref>
                <Image
                    src={product.images.length > 0 ? product.images[0] : "/images/placeholder.jpg"}
                    width={300}
                    height={300}
                    alt={productTranslation?.name || "Luxury Jewelry"}
                    className="rounded-lg cursor-pointer object-cover"
                />
            </Link>

            {/* Product Name */}
            <h3 className="text-xl font-serif text-gold mt-4">{productTranslation?.name}</h3>

            {/* Product Price */}
            <p className="text-platinumGray mt-2">Starting at €{parseFloat(product.basePrice).toFixed(2)}</p>

            {/* View Creation Button */}
            <div className="mt-4">
                <Link href={`/products/${product.id}`} passHref>
                    <button className="bg-crimson text-ivory px-4 py-2 rounded-full hover:bg-gold transition duration-300">
                        View Creation
                    </button>
                </Link>
            </div>
        </div>
    );
}
