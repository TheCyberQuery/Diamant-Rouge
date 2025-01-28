// pages/index.tsx
import HeroCarousel from '../components/HeroCarousel';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

// Placeholder images - place them in public/images
const slides = [
    {
        imageSrc: '/images/hero1.jpg', // Make sure these exist or use placeholders
        heading: 'Experience the Allure of Diamant-Rouge',
        subheading: 'Timeless elegance and seductive craftsmanship',
    },
    {
        imageSrc: '/images/hero2.jpg',
        heading: 'New Rouge Passion Collection',
        subheading: 'Limited Edition - Only 50 pieces worldwide',
    },
];

export default function HomePage() {
    return (
        <>
            <NextSeo
                title="Diamant-Rouge | Luxury French Jewelry"
                description="Explore timeless elegance and French craftsmanship at Diamant-Rouge."
                openGraph={{
                    url: 'https://your-domain.com/',
                    title: 'Diamant-Rouge | Luxury French Jewelry',
                    description: 'Explore timeless elegance and French craftsmanship.',
                    images: [
                        {
                            url: 'https://your-domain.com/images/hero.jpg',
                            width: 1200,
                            height: 630,
                            alt: 'Diamant-Rouge Hero',
                        },
                    ],
                }}
            />

            {/* Hero Carousel */}
            <HeroCarousel slides={slides} />

            {/* Featured Collections */}
            <motion.section
                className="py-16 px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-serif text-center mb-8">Featured Collections</h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link href="/collections/rings" className="bg-ebony/50 p-6 text-center w-full md:w-1/3">
                        <h3 className="text-xl">Limited Edition Rouge</h3>
                        <p className="mt-2">Only 50 pieces worldwide. Secure yours today.</p>
                    </Link>
                    <Link href="/collections/rings" className="bg-ebony/50 p-6 text-center w-full md:w-1/3">
                        <h3 className="text-xl">Timeless Classics</h3>
                        <p className="mt-2">Our iconic designs that never go out of style.</p>
                    </Link>
                </div>
            </motion.section>

            {/* Social Proof */}
            <motion.section
                className="py-8 px-4 bg-ebony/80 text-center text-ivory"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl font-serif mb-4">Praise & Press</h2>
                <div className="text-center space-y-2">
                    <blockquote>
                        “Incredibly exquisite, a testament to French craftsmanship.” – Vogue
                    </blockquote>
                    <blockquote>
                        “A new benchmark in luxury design.” – Celebrity X
                    </blockquote>
                </div>
            </motion.section>

            {/* Newsletter / Reciprocity */}
            <section className="py-8 px-4 text-center">
                <h2 className="text-2xl font-serif mb-4">Join Le Cercle Rouge</h2>
                <p className="max-w-md mx-auto mb-4">
                    Sign up to receive exclusive previews, private sales, and early access to new releases.
                </p>
                <form className="max-w-sm mx-auto flex">
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="flex-1 p-2 text-ebony"
                    />
                    <button
                        type="submit"
                        className="bg-crimson hover:bg-gold text-ivory px-4"
                    >
                        Subscribe
                    </button>
                </form>
            </section>
        </>
    );
}