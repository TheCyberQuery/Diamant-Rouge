import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { prisma } from "../lib/prisma";
import ProductCard from "../components/ProductCard";
import { jwtVerify } from "jose";

// -----------------------------------------------------------------------------
// Secure server-side retrieval of products and wishlist
// -----------------------------------------------------------------------------
export async function getServerSideProps(context) {
    let userId = null;
    let wishlist = [];

    try {
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
        const featuredProducts = await prisma.product.findMany({
            include: { translations: true, variations: true },
            take: 6,
        });

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
                locale: context.locale || "fr",
            },
        };
    } catch (error) {
        console.error("❌ Error fetching homepage data:", error);
        return {
            props: {
                products: [],
                wishlist: [],
                locale: context.locale || "fr",
            },
        };
    }
}

// -----------------------------------------------------------------------------
// Home Page Component
// -----------------------------------------------------------------------------
export default function HomePage({ products, wishlist, locale }) {
    // Jewelry categories (mirroring Amantys navigation)
    const categories = [
        "Tous",
        "Bagues de fiançailles",
        "Alliances",
        "Colliers",
        "Bracelets",
        "Boucles d’oreilles",
    ];
    const [selectedCategory, setSelectedCategory] = useState("Tous");

    const filteredProducts =
        selectedCategory === "Tous"
            ? products
            : products.filter((product) => product.category === selectedCategory);

    return (
        <>
            <NextSeo
                title="Diamant Rouge | Bijoux de luxe sur mesure"
                description="Découvrez des bijoux en diamants d’exception, façonnés artisanalement pour révéler l’unicité de votre histoire."
            />

            {/* SECTION HERO */}
            <section className="relative h-screen m-0 p-0">
                <div className="flex h-full">
                    <div className="w-1/2 relative">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2025/01/amantys_header_desktop_janvier_2025-1.jpg"
                            alt="Héros Gauche"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="w-1/2 relative">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2024/12/Home_Amantys.jpg"
                            alt="Héros Droite"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 px-4">
                    <motion.h1
                        className="text-white text-4xl md:text-5xl font-bold text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Par la beauté de la nature, dire la magie de nos vies
                    </motion.h1>
                    <motion.a
                        href="https://bzmhmtt8k3l.typeform.com/gemmologie"
                        className="mt-6 inline-block button-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Créer votre bijou en 5 étapes
                    </motion.a>
                </div>
            </section>

            {/* SECTION 1: CRÉATIONS SUR MESURE */}
            <motion.section
                className="py-12 px-4 section-light text-center bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-heading text-brandGold mb-4">
                    Créer à la mesure de chacun
                </h2>
                <p className="text-base text-platinumGray max-w-xl mx-auto mb-8">
                    Dans l’intimité de notre atelier, Diamant Rouge façonne chaque jour{" "}
                    <strong>des pièces joaillières</strong> à partir de{" "}
                    <strong>diamants naturels d’exception</strong> – des joyaux rares qui
                    racontent une histoire unique et précieuse.
                </p>
                {/* Filter bar using styled buttons */}
                <div className="flex justify-center space-x-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full border transition-all ${
                                selectedCategory === category
                                    ? "bg-brandGold text-white border-brandGold"
                                    : "bg-white text-brandGold border-brandGold"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Horizontal scroll container for products */}
                <div className="w-full mx-auto px-4 overflow-x-auto overflow-y-hidden scrollbar-hide">
                    <div className="flex space-x-2">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-[28rem]">
                                <div className="p-3 flex flex-col">
                                    <ProductCard
                                        product={product}
                                        locale={locale}
                                        isWishlisted={wishlist.includes(product.id)}
                                    />
                                </div>
                            </div>
                        ))}
                        {/* "Voir plus" button */}
                        <div className="flex-shrink-0 w-[28rem] flex items-center justify-center">
                            <Link href="/collections/bespoke" legacyBehavior>
                                <a className="flex flex-col items-center p-2">
                                    <div className="flex items-center space-x-1">
                    <span className="text-brandGold font-semibold text-xl">
                      Voir plus
                    </span>
                                        <svg
                                            className="w-6 h-6 text-brandGold"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-1 w-16 border-b-2 border-brandGold" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* SECTION 2: PROMESSE */}
            <motion.section
                className="py-12 px-4 section-dark text-center bg-burgundy"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-serif mb-4">PROMESSE</h2>
                <p className="text-base max-w-2xl mx-auto mb-0">
                    Diamant Rouge incarne l’exception et célèbre la rareté. Inspirée par la
                    nature et les moments uniques, notre maison repousse les frontières du
                    savoir-faire joaillier pour créer des œuvres d’art uniques.
                </p>
            </motion.section>

            {/* SECTION 3: TRANSMETTRE LE SAVOIR DU DIAMANT */}
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
                        alt="Transmettre le savoir du diamant"
                        width={550}
                        height={650}
                        className="object-cover rounded image-luxury"
                    />
                </div>
                <div className="md:w-1/2 text-left md:pl-6 mt-6 md:mt-0">
                    <h2 className="text-3xl md:text-4xl text-brandGold mb-4">
                        Transmettre le savoir du diamant
                    </h2>
                    <p className="text-base text-platinumGray mb-6">
                        Le diamant naturel est une merveille rare, une création de la Terre
                        qui révèle toute sa puissance. Chaque pierre, unique en couleur,
                        clarté et dimensions, exprime la beauté d’un moment et la force d’un
                        engagement. Venez découvrir la gemmologie dans notre laboratoire
                        dédié.
                    </p>
                    <Link href="/initiation" legacyBehavior>
                        <a className="button-primary text-sm">
                            Participer à une initiation gratuite
                        </a>
                    </Link>
                </div>
            </motion.section>

            {/* SECTION 4: LE SUR-MESURE POUR TOUS LES BIJOUX EN DIAMANTS */}
            <section className="relative">
                <div className="absolute inset-0 hidden md:block">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
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
                    <h2 className="text-3xl md:text-4xl mb-4">
                        Le sur-mesure pour tous les bijoux en diamants
                    </h2>
                    <p className="text-base mb-6 max-w-xl mx-auto">
                        Pour ceux qui cherchent l’unique, Diamant Rouge propose un service
                        sur-mesure accessible à tous. Chaque diamant est minutieusement
                        sélectionné pour donner vie à des créations entièrement personnalisées.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link href="/sur-mesure-etapes" legacyBehavior>
                            <a className="button-primary text-sm">Processus sur-mesure</a>
                        </Link>
                        <Link href="/contact" legacyBehavior>
                            <a className="button-primary text-sm">Concevoir votre bijou</a>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECTION 5: UNE FABRICATION ARTISANALE & DES DIAMANTS D’EXCEPTION */}
            <section className="py-16 px-4 text-center text-brandIvory">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-6 md:mb-0 order-1 md:order-2">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2024/12/Amantys_Haute_Joaillerie.jpg"
                            alt="Fabrication artisanale & diamants d’exception"
                            width={660}
                            height={780}
                            className="object-cover rounded"
                        />
                    </div>
                    <div className="md:w-1/2 order-2 md:order-1 text-left md:pl-6">
                        <h2 className="text-3xl md:text-4xl mb-4 text-brandGold">
                            Une fabrication artisanale & des diamants d’exception
                        </h2>
                        <p className="text-base mb-6 text-platinumGray">
                            Diamant Rouge ouvre les portes de son atelier pour vous révéler
                            l’expertise de ses artisans. À travers des capsules immersives,
                            découvrez comment la matière brute se transforme en une œuvre d’art
                            joaillière, façonnée à la main dans la tradition du luxe.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <Link href="/atelier" legacyBehavior>
                                <a className="button-primary text-sm">
                                    Un atelier ouvert à tous
                                </a>
                            </Link>
                            <Link href="/histoire" legacyBehavior>
                                <a className="button-primary text-sm">
                                    L’excellence Diamant Rouge
                                </a>
                            </Link>
                            <Link href="/artisans" legacyBehavior>
                                <a className="section-btn text-white">
                                    Qui sont les artisans joailliers ?
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: ARTICLES */}
            <section className="blog-sec">
                <div className="w-full overflow-x-auto overflow-y-hidden">
                    <div className="flex gap-[1px] min-w-full">
                        {/* Article 1 */}
                        <Link href="comment-choisir-une-bague-de-fiancailles/index.html" legacyBehavior>
                            <a className="blog-box block w-[30rem]">
                                <article className="category-blog format-standard has-post-thumbnail hentry post status-publish type-post category-tutos-conseils category-fiancailles-mariage post-96 tag-baguesdefiancailles tag-diamants">
                                    <div className="relative group h-[400px]">
                                        <Image
                                            src="https://amantys.fr/wp-content/uploads/2023/07/amantys_showroom_paris_bijoux_diamants_9-1.jpg"
                                            alt="Choisir la bague idéale"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                            <div className="flex items-center justify-start">
                        <span
                            className="text-white font-semibold inline-block text-xl"
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          Voir plus
                        </span>
                                                <svg
                                                    className="w-5 h-5 text-white inline-block ml-1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M7.293 14.707a1 1 0 001.414 0L13 10.414 8.707 6.121a1 1 0 00-1.414 1.414L10.172 10l-2.879 2.879a1 1 0 000 1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        </Link>

                        {/* Article 2 */}
                        <Link href="concept-emprunter-bague-de-fiancailles/index.html" legacyBehavior>
                            <a className="blog-box block w-[30rem]">
                                <article className="category-blog format-standard has-post-thumbnail hentry post status-publish type-post category-tutos-conseils category-fiancailles-mariage post-113 tag-baguedefiancailles tag-mariage tag-pre-demande">
                                    <div className="relative group h-[400px]">
                                        <Image
                                            src="https://amantys.fr/wp-content/uploads/2023/07/pac_bdf_art_eme_100_san_ros_3-1.jpg"
                                            alt="Concept : Emprunter une bague"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                            <div className="flex items-center justify-start">
                        <span
                            className="text-white font-semibold inline-block text-xl"
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          Concept : Emprunter une bague
                        </span>
                                                <svg
                                                    className="w-5 h-5 text-white inline-block ml-1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M7.293 14.707a1 1 0 001.414 0L13 10.414 8.707 6.121a1 1 0 00-1.414 1.414L10.172 10l-2.879 2.879a1 1 0 000 1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        </Link>

                        {/* Article 3 */}
                        <Link href="collier-bracelet-de-naissance-diamant/index.html" legacyBehavior>
                            <a className="blog-box block w-[30rem]">
                                <article className="category-blog format-standard has-post-thumbnail hentry post status-publish type-post category-cadeaux-sur-mesure post-107 tag-naissance">
                                    <div className="relative group h-[400px]">
                                        <Image
                                            src="https://amantys.fr/wp-content/uploads/2023/07/liv_bra_del_ron_020_cla_bla_2-2.jpg"
                                            alt="Célébrer une naissance"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                            <div className="flex items-center justify-start">
                        <span
                            className="text-white font-semibold inline-block text-xl"
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          Célébrer une naissance
                        </span>
                                                <svg
                                                    className="w-5 h-5 text-white inline-block ml-1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M7.293 14.707a1 1 0 001.414 0L13 10.414 8.707 6.121a1 1 0 00-1.414 1.414L10.172 10l-2.879 2.879a1 1 0 000 1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        </Link>

                        {/* Article 4 */}
                        <Link href="showrooms-a-paris-bordeaux/index.html" legacyBehavior>
                            <a className="blog-box block w-[30rem]">
                                <article className="category-blog format-standard has-post-thumbnail hentry post status-publish type-post tag-showroomparis tag-showroombordeaux">
                                    <div className="relative group h-[400px]">
                                        <Image
                                            src="https://amantys.fr/wp-content/uploads/2023/07/amantys_experience_client_diamant_bijou_sur_mesure_paris_palais_royal_louvre_6-1.jpg"
                                            alt="Showrooms à Paris & Bordeaux"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                            <div className="flex items-center justify-start">
                        <span
                            className="text-white font-semibold inline-block text-xl"
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          Showrooms à Paris & Bordeaux
                        </span>
                                                <svg
                                                    className="w-5 h-5 text-white inline-block ml-1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M7.293 14.707a1 1 0 001.414 0L13 10.414 8.707 6.121a1 1 0 00-1.414 1.414L10.172 10l-2.879 2.879a1 1 0 000 1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        </Link>

                        {/* Article 5 */}
                        <Link href="comment-determiner-la-taille-de-doigt/index.html" legacyBehavior>
                            <a className="blog-box block w-[30rem]">
                                <article className="category-blog format-standard has-post-thumbnail hentry post status-publish type-post tag-baguesdefiancailles tag-diamants">
                                    <div className="relative group h-[400px]">
                                        <Image
                                            src="https://amantys.fr/wp-content/uploads/2023/07/amantys_showroom_mat_1-1.jpg"
                                            alt="Comment déterminer la taille de doigt ?"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                            <div className="flex items-center justify-start">
                        <span
                            className="text-white font-semibold inline-block text-xl"
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          Comment déterminer la taille de doigt ?
                        </span>
                                                <svg
                                                    className="w-5 h-5 text-white inline-block ml-1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M7.293 14.707a1 1 0 001.414 0L13 10.414 8.707 6.121a1 1 0 00-1.414 1.414L10.172 10l-2.879 2.879a1 1 0 000 1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
