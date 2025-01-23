// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

export default function Home() {
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

            <Head>
                <title>Diamant-Rouge | Luxury French Jewelry</title>
            </Head>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-black text-center">
                <Image
                    src="/images/bijouterie-casablanca-maroc-parures-pour-mariees-75.jpg" // create a placeholder in public/images/hero.jpg
                    alt="Hero background"
                    fill
                    className="object-cover opacity-40"
                />
                <div className="relative z-10 text-ivory max-w-2xl">
                    <h1 className="text-5xl font-serif">Experience the Allure of Diamant-Rouge</h1>
                    <p className="mt-4">
                        Embrace timeless elegance with our curated collections of fine jewelry.
                    </p>
                    <Link
                        href="/collections/rings"
                        className="inline-block mt-6 bg-crimson hover:bg-gold text-ivory py-3 px-6"
                    >
                        Explore Collections
                    </Link>
                </div>
            </section>

            {/* Featured Collections */}
            <section className="py-16 px-4">
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
            </section>

            {/* Social Proof */}
            <section className="py-8 px-4 bg-ebony/80">
                <h2 className="text-2xl font-serif text-center mb-4">Praise & Press</h2>
                <div className="text-center space-y-2">
                    <blockquote>
                        “Incredibly exquisite, a testament to French craftsmanship.” – Vogue
                    </blockquote>
                    <blockquote>
                        “A new benchmark in luxury design.” – Celebrity X
                    </blockquote>
                </div>
            </section>

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
