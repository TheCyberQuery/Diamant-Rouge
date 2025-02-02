import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
    product: {
        id: number;
        sku: string;
        basePrice: string;
        translations: {
            language: string;
            name: string;
            description?: string;
        }[];
    };
    locale: string;
};

export default function ProductCard({ product, locale }: ProductCardProps) {
    const productTranslation =
        product.translations.find((t) => t.language === locale) ||
        product.translations.find((t) => t.language === "en");

    return (
        <div className="bg-ebony p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <Link href={`/products/${product.id}`} passHref>
                <Image
                    src={`/images/products/diamond-cluster-earrings.png`} // Replace with actual product images
                    width={300}
                    height={300}
                    alt={productTranslation?.name || "Product"}
                    className="rounded-lg cursor-pointer"
                />
            </Link>
            <h3 className="text-xl font-serif text-gold mt-4">{productTranslation?.name}</h3>
            <p className="text-platinumGray mt-2">€{parseFloat(product.basePrice).toFixed(2)}</p>
            <div className="mt-4">
                <Link href={`/products/${product.id}`} passHref>
                    <button className="bg-crimson text-ivory px-4 py-2 rounded-full hover:bg-gold transition duration-300">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
}
