import HeroCarousel from "../components/HeroCarousel";
import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { prisma } from "../lib/prisma";
import ProductCard from "../components/ProductCard";


export async function getServerSideProps(context) {
    const locale = context.locale || "en"; // Get locale from Next.js
    const featuredProducts = await prisma.product.findMany({
        include: {
            translations: true,
            variations: true,
        },
        take: 6, // Fetch only 6 products for homepage display
    });

    return {
        props: { products: JSON.parse(JSON.stringify(featuredProducts)), locale },
    };
}

// Hero Carousel Slides
const slides = [
    {
        imageSrc: "/images/bijouterie-casablanca-maroc-dimant-rouge-464.jpg",
        heading: "Experience the Allure of Diamant-Rouge",
        subheading: "Timeless elegance and seductive craftsmanship",
    },
    {
        imageSrc: "/images/parures-colliers-or-bijouterie-casablanca-maroc-825.jpg",
        heading: "New Rouge Passion Collection",
        subheading: "Limited Edition - Only 50 pieces worldwide",
    },
    {
        imageSrc: "/images/bijouterie-casablanca-maroc-parures-pour-mariees-75.jpg",
        heading: "Discover the Iconic Classics",
        subheading: "Our most beloved designs, now available",
    },
];

export default function HomePage({ products, locale }) {
    return (
        <>
            <NextSeo
                title="Diamant-Rouge | Luxury French Jewelry"
                description="Discover exclusive, handcrafted luxury jewelry with timeless elegance at Diamant-Rouge."
                openGraph={{
                    url: "https://your-domain.com/",
                    title: "Diamant-Rouge | Luxury French Jewelry",
                    description: "Explore timeless elegance and French craftsmanship.",
                    images: [
                        {
                            url: "https://your-domain.com/images/hero.jpg",
                            width: 1200,
                            height: 630,
                            alt: "Diamant-Rouge Hero",
                        },
                    ],
                }}
            />

            {/* Hero Section */}
            <HeroCarousel slides={slides} />

            {/* Featured Collections */}
            <motion.section
                className="py-16 px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-serif text-center text-gold mb-8">
                    Exclusive Jewelry Collections
                </h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link href="/collections/rings" className="bg-richEbony p-6 rounded-xl shadow-luxury text-center w-full md:w-1/3 transition-transform transform hover:scale-105">
                        <h3 className="text-2xl text-gold">Limited Edition Rouge</h3>
                        <p className="mt-2 text-platinumGray">Only 50 pieces worldwide. Secure yours today.</p>
                    </Link>
                    <Link href="/collections/classics" className="bg-richEbony p-6 rounded-xl shadow-luxury text-center w-full md:w-1/3 transition-transform transform hover:scale-105">
                        <h3 className="text-2xl text-gold">Timeless Classics</h3>
                        <p className="mt-2 text-platinumGray">Our iconic designs that never go out of style.</p>
                    </Link>
                </div>
            </motion.section>

            {/* Featured Products */}
            <motion.section
                className="py-16 px-4 bg-ebony text-ivory"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-serif text-center text-gold mb-8">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} locale={locale} />
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link href="/collections/all">
                        <button className="bg-gold text-deep-black px-6 py-3 rounded-full font-medium hover:bg-crimson transition duration-300">
                            View All Collections
                        </button>
                    </Link>
                </div>
            </motion.section>

            {/* Social Proof - Reviews */}
            <motion.section
                className="py-8 px-4 bg-richEbony text-center text-ivory"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl font-serif text-gold mb-4">Praise & Press</h2>
                <div className="text-center space-y-2 text-platinumGray">
                    <blockquote>
                        “Incredibly exquisite, a testament to French craftsmanship.” – <strong>Vogue</strong>
                    </blockquote>
                    <blockquote>
                        “A new benchmark in luxury design.” – <strong>Celebrity X</strong>
                    </blockquote>
                </div>
            </motion.section>

            {/* Newsletter Subscription */}
            <section className="py-8 px-4 text-center">
                <h2 className="text-2xl font-serif text-gold mb-4">Join Le Cercle Rouge</h2>
                <p className="max-w-md mx-auto mb-4 text-platinumGray">
                    Sign up to receive exclusive previews, private sales, and early access to new releases.
                </p>
                <form className="max-w-sm mx-auto flex">
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="flex-1 p-2 text-ebony rounded-l-lg"
                    />
                    <button
                        type="submit"
                        className="bg-crimson hover:bg-gold text-ivory px-4 rounded-r-lg"
                    >
                        Subscribe
                    </button>
                </form>
            </section>
        </>
    );
}
