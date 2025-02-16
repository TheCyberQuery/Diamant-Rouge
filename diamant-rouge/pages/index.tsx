import HeroCarousel from "../components/HeroCarousel";
import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { prisma } from "../lib/prisma";
import ProductCard from "../components/ProductCard";
import { jwtVerify } from "jose";

// ✅ Fetch Products and Wishlist Securely
export async function getServerSideProps(context) {
    let userId = null;
    let wishlist = [];

    try {
        // ✅ Securely Parse Session Token
        const rawCookie = context.req.headers.cookie || "";
        let match =
            rawCookie.match(/next-auth\.session-token=([^;]+)/) ||
            rawCookie.match(/__Secure-next-auth\.session-token=([^;]+)/);

        if (match) {
            const secret = process.env.NEXTAUTH_SECRET || "";
            const tokenStr = decodeURIComponent(match[1]);

            try {
                const { payload: decoded } = await jwtVerify(
                    tokenStr,
                    new TextEncoder().encode(secret)
                );
                if (decoded && typeof decoded === "object" && decoded.id) {
                    userId = Number(decoded.id);
                }
            } catch (tokenError) {
                console.warn("⚠ Token verification failed:", tokenError);
            }
        }

        console.log("✅ Fetching homepage data...");
        // ✅ Fetch Featured Products
        const featuredProducts = await prisma.product.findMany({
            include: { translations: true, variations: true },
            take: 6,
        });

        // ✅ Fetch Wishlist If User Logged In
        if (userId) {
            const wishlistItems = await prisma.wishlist.findMany({
                where: { userId },
                select: { productId: true },
            });
            wishlist = wishlistItems.map((item) => item.productId);
        }

        return {
            props: {
                products: JSON.parse(JSON.stringify(featuredProducts)),
                wishlist: JSON.parse(JSON.stringify(wishlist)),
                locale: context.locale || "en",
            },
        };
    } catch (error) {
        console.error("❌ Homepage Data Fetch Error:", error);
        return { props: { products: [], wishlist: [], locale: context.locale || "en" } };
    }
}

// ✅ Hero Carousel Data
const slides = [

    {
        videoSrc: "/videos/Red Diamond Elegance_simple_compose.mp4",
        heading: "Red Diamond Elegance",
        subheading: "A captivating video showcasing our finest collection.",
    }
];

export default function HomePage({ products, wishlist, locale }) {
    return (
        <>
            <NextSeo
                title="Diamant-Rouge | Luxury French Jewelry"
                description="Discover handcrafted bespoke luxury jewelry at Diamant-Rouge."
            />

            {/* Hero Section */}
            <HeroCarousel slides={slides} />

            {/* Exclusive Creations Section (Light) */}
            <motion.section
                className="section-light py-16 px-6 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-5xl font-serif text-brandGold mb-10">
                    Exclusive Creations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <Link href="/collections/bespoke" className="card hover-scale">
                        <h3 className="text-3xl text-brandGold">Bespoke Creations</h3>
                        <p className="text-platinumGray mt-3">
                            Custom luxury jewelry tailored to your vision.
                        </p>
                    </Link>

                    <Link href="/appointments" className="card hover-scale">
                        <h3 className="text-3xl text-brandGold">
                            Private Showroom Experience
                        </h3>
                        <p className="text-platinumGray mt-3">
                            Book a one-on-one consultation with our artisans.
                        </p>
                    </Link>
                </div>
            </motion.section>

            {/* Featured Products */}
            <motion.section
                className="section-light py-16 px-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-5xl font-serif text-center text-brandGold mb-10">
                    Featured Jewelry
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            locale={locale}
                            isWishlisted={wishlist.includes(product.id)}
                        />
                    ))}
                </div>
            </motion.section>

            {/* Newsletter */}
            <section className="section-light py-12 px-6 text-center">
                <h2 className="text-3xl font-serif text-brandGold mb-4">
                    Join Le Cercle Rouge
                </h2>
                <p className="text-platinumGray mb-4">
                    Exclusive previews, private sales, and early access.
                </p>
                <form className="max-w-md mx-auto flex">
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input-field flex-1"
                    />
                    <button
                        type="submit"
                        className="bg-burgundy hover:bg-brandGold text-brandIvory px-4 rounded-r-lg transition duration-300"
                    >
                        Subscribe
                    </button>
                </form>
            </section>
        </>
    );
}
