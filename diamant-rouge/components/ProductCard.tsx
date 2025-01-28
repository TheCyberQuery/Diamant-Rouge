// components/ProductCard.tsx
import Link from 'next/link';

type ProductCardProps = {
    id: number;
    sku: string;
    name: string;
    price: string;    // or number
    imageUrl?: string; // If you store product images. Otherwise, use placeholders.
};

export default function ProductCard({
                                        id,
                                        sku,
                                        name,
                                        price,
                                        imageUrl = '/images/placeholder.jpg',
                                    }: ProductCardProps) {
    return (
        <div className="group bg-ebony/50 relative overflow-hidden">
            {/* Product Image */}
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-4">
                <h3 className="text-xl font-serif mb-1">{name}</h3>
                <p className="text-sm">SKU: {sku}</p>
                <p className="text-lg mt-2">€{price}</p>
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link
                    href={`/products/${id}`}
                    className="bg-crimson text-ivory py-2 px-4 font-sans uppercase text-sm hover:bg-gold"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
