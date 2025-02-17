import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { prisma } from "../lib/prisma";
import ProductCard from "../components/ProductCard";
import { jwtVerify } from "jose";

// -----------------------------------------------------------------------------
// Securely Fetch Products and Wishlist (Server Side)
// -----------------------------------------------------------------------------
export async function getServerSideProps(context) {
    let userId = null;
    let wishlist = [];

    try {
        // Securely parse the session token from cookies
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
        // Fetch Featured Products (with translations and variations)
        const featuredProducts = await prisma.product.findMany({
            include: { translations: true, variations: true },
            take: 6,
        });

        // If user is logged in, fetch their wishlist items
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
        return {
            props: {
                products: [],
                wishlist: [],
                locale: context.locale || "en",
            },
        };
    }
}

// -----------------------------------------------------------------------------
// HomePage Component
// -----------------------------------------------------------------------------
export default function HomePage({ products, wishlist, locale }) {
    return (
        <>
            {/* SEO Meta Tags */}
            <NextSeo
                title="Diamant-Rouge | Luxury French Jewelry"
                description="Discover handcrafted bespoke luxury jewelry at Diamant-Rouge."
            />

            {/* HERO SECTION - No top padding so it starts at the very top */}
            <section className="relative h-screen m-0 p-0">
                <div className="flex h-full">
                    {/* Left image */}
                    <div className="w-1/2 relative">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2025/01/amantys_header_desktop_janvier_2025-1.jpg"
                            alt="Hero Left"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Right image */}
                    <div className="w-1/2 relative">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2024/12/Home_Amantys.jpg"
                            alt="Hero Right"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                {/* Overlay with animated text and button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                    <motion.h1
                        className="text-white text-4xl md:text-5xl font-bold text-center px-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Par la beauté de la nature, dire la magie de nos vies
                    </motion.h1>
                    <motion.a
                        href="https://bzmhmtt8k3l.typeform.com/gemmologie"
                        className="mt-6 inline-block bg-brandGold text-richEbony px-6 py-3 rounded-full font-medium hover:bg-burgundy hover:text-brandIvory transition duration-300 shadow-luxury"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Créer votre bijou en 5 étapes
                    </motion.a>
                </div>
            </section>

            {/* ---------------------------------------------------------------------
         SECTION 1: Bespoke Creations
         Refined grid showcasing featured bespoke products.
      --------------------------------------------------------------------- */}
            <motion.section
                className="py-12 px-4 section-light text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-serif text-brandGold mb-4">
                    Crafted for Every Story
                </h2>
                <p className="text-base text-platinumGray max-w-xl mx-auto mb-8">
                    In our intimate atelier, each jewel becomes a diamond-sized masterpiece designed to tell your unique tale.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            locale={locale}
                            isWishlisted={wishlist.includes(product.id)}
                        />
                    ))}
                </div>
                <div className="mt-6">
                    <Link href="/collections/bespoke" className="button-secondary text-sm">
                        View All Bespoke Creations
                    </Link>
                </div>
            </motion.section>

            {/* ---------------------------------------------------------------------
         SECTION 2: Our Promise
         A bold statement section using dark styling.
      --------------------------------------------------------------------- */}
            <motion.section
                className="py-12 px-4 section-dark text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-serif mb-4">OUR PROMISE</h2>
                <p className="text-base max-w-2xl mx-auto">
                    Diamant Rouge celebrates rarity and excellence. Inspired by nature’s brilliance, our jewels capture
                    the refined artistry of timeless craftsmanship.
                </p>
            </motion.section>

            {/* ---------------------------------------------------------------------
         SECTION 3: Diamond Wisdom
         Two-column layout with an elegant image and refined text.
      --------------------------------------------------------------------- */}
            <motion.section
                className="py-12 px-4 section-light flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <div className="md:w-1/2">
                    <Image
                        src="https://amantys.fr/wp-content/uploads/2024/12/Expert_Diamant_Amantys.jpg"
                        alt="Diamond Wisdom"
                        width={550}
                        height={650}
                        className="object-cover rounded image-luxury"
                    />
                </div>
                <div className="md:w-1/2 text-left md:pl-6 mt-6 md:mt-0">
                    <h2 className="text-3xl md:text-4xl text-brandGold mb-4">Diamond Wisdom</h2>
                    <p className="text-base text-platinumGray mb-6">
                        A natural diamond is nature’s rarest treasure. We guide you to understand its brilliance,
                        purity, and timeless allure.
                    </p>
                    <Link href="/initiation" className="button-primary text-sm">
                        Join a Free Initiation
                    </Link>
                </div>
            </motion.section>

            {/* ---------------------------------------------------------------------
         SECTION 4: Bespoke for Every Jewel
         Full-bleed video background with refined call-to-action buttons.
      --------------------------------------------------------------------- */}
            <section className="relative">
                <div className="absolute inset-0 hidden md:block">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source
                            src="https://amantys.fr/wp-content/uploads/2024/11/amantys_atelier_sertissage_bague_fiancailles_dahlia_brillant_100_carat_2_desktop.webm"
                            type="video/webm"
                        />
                        <source
                            src="https://amantys.fr/wp-content/uploads/2024/11/amantys_atelier_sertissage_bague_fiancailles_dahlia_brillant_100_carat_2_desktop.hevc.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
                <div className="relative z-10 py-16 px-4 text-center text-brandIvory">
                    <h2 className="text-3xl md:text-4xl mb-4">Bespoke for Every Jewel</h2>
                    <p className="mb-6 max-w-xl mx-auto text-base">
                        For those who seek the unique, Diamant Rouge offers a bespoke service that transforms every
                        diamond into a personal heirloom.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link href="/sur-mesure-etapes" className="button-primary text-sm">
                            Bespoke Process
                        </Link>
                        <Link href="/contact" className="button-primary text-sm">
                            Design Your Jewel
                        </Link>
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------
         SECTION 5: Testimonials
         Refined testimonial cards in a compact style.
      --------------------------------------------------------------------- */}
            <motion.section
                className="py-12 px-4 section-light text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl md:text-3xl text-brandGold mb-6">Testimonials</h2>
                <div className="max-w-xl mx-auto space-y-4">
                    <div className="p-4 card">
                        <h5 className="text-base md:text-lg font-semibold mb-1">
                            Mitchell Brinkman
                        </h5>
                        <p className="text-xs md:text-sm">
                            "Diamant Rouge delivers exceptional craftsmanship and an experience as brilliant as its diamonds."
                        </p>
                    </div>
                    <div className="p-4 card">
                        <h5 className="text-base md:text-lg font-semibold mb-1">
                            Wendy Anani
                        </h5>
                        <p className="text-xs md:text-sm">
                            "A refined and intimate journey—every detail exudes passion and precision."
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* ---------------------------------------------------------------------
         SECTION 6: Latest News
         Grid layout for blog posts with compact card styling.
      --------------------------------------------------------------------- */}
            <motion.section
                className="py-12 px-4 section-light text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl md:text-3xl text-brandGold mb-6">Latest News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="card p-4">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2023/07/amantys_showroom_paris_bijoux_diamants_9-1.jpg"
                            alt="Choosing the Perfect Engagement Ring"
                            width={600}
                            height={300}
                            className="object-cover w-full h-48 rounded"
                        />
                        <h3 className="mt-2 text-base font-semibold">
                            Choosing the Perfect Engagement Ring
                        </h3>
                        <p className="mt-1 text-platinumGray text-xs">
                            Expert tips on selecting a ring that captures your unique love story.
                        </p>
                    </div>
                    <div className="card p-4">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2023/07/pac_bdf_art_eme_100_san_ros_3-1.jpg"
                            alt="Innovative Jewelry Lending"
                            width={600}
                            height={300}
                            className="object-cover w-full h-48 rounded"
                        />
                        <h3 className="mt-2 text-base font-semibold">
                            Innovative Jewelry Lending
                        </h3>
                        <p className="mt-1 text-platinumGray text-xs">
                            A fresh approach to accessing luxury without compromise.
                        </p>
                    </div>
                </div>
                <div className="mt-6">
                    <Link href="/blog" className="button-secondary text-xs">
                        Read All Articles
                    </Link>
                </div>
            </motion.section>

            {/* ---------------------------------------------------------------------
         SECTION 7: Newsletter
         Minimalist, luxury-styled newsletter subscription.
      --------------------------------------------------------------------- */}
            <section className="py-8 px-4 section-light text-center">
                <h2 className="text-2xl md:text-3xl font-serif text-brandGold mb-2">
                    Join Le Cercle Rouge
                </h2>
                <p className="text-platinumGray text-base mb-4">
                    Get exclusive updates, private invites, and first looks.
                </p>
                <form className="max-w-sm mx-auto flex items-center">
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input-field flex-1 p-2 mr-2 text-xs"
                    />
                    <button type="submit" className="button-primary text-xs">
                        Subscribe
                    </button>
                </form>
            </section>
        </>
    );
}
