// pages/products/[id].tsx
import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/router';
import Image from 'next/image'; // optional for performance
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';

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
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
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
        router.push('/cart');
    }

    return (
        <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Product Image Gallery */}
                <div>
                    <Swiper
                        modules={[Navigation, Thumbs]}
                        navigation
                        thumbs={{ swiper: thumbsSwiper }}
                        className="mb-4"
                    >
                        {/* In real scenario, map over product images. For now, just placeholders. */}
                        <SwiperSlide>
                            <div className="relative w-full h-96 bg-gray-200">
                                <img
                                    src="/images/product-placeholder1.jpg"
                                    alt="Product Image 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-96 bg-gray-200">
                                <img
                                    src="/images/product-placeholder2.jpg"
                                    alt="Product Image 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    {/* Thumbnail Swiper */}
                    <Swiper
                        modules={[Navigation, Thumbs]}
                        onSwiper={setThumbsSwiper}
                        slidesPerView={3}
                        spaceBetween={10}
                        className="h-24"
                    >
                        <SwiperSlide>
                            <img
                                src="/images/product-placeholder1.jpg"
                                alt="Thumbnail 1"
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/product-placeholder2.jpg"
                                alt="Thumbnail 2"
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-serif mb-4">{translation?.name}</h1>
                    <p className="text-lg mb-2">SKU: {productData.sku}</p>
                    <p className="text-xl mb-4">Price: €{productData.basePrice}</p>
                    <p className="mb-6">{translation?.description}</p>

                    <p className="text-crimson font-bold mb-4">
                        Limited Stock: Only 5 left!
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className="bg-crimson hover:bg-gold text-ivory py-2 px-6 font-semibold"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const locale = context.locale || 'en';

    const rawProductData = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { translations: true },
    });

    // Wrap in JSON.parse(JSON.stringify(...)):
    const productData = rawProductData
        ? JSON.parse(JSON.stringify(rawProductData))
        : null;

    return {
        props: {
            productData,
            locale,
        },
    };
};
