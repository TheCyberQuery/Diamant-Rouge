"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const { data: session } = useSession();
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const router = useRouter();
    const currentLocale = router.locale || "fr";
    const isHomePage = router.pathname === "/";

    const translations = {
        fr: {
            appointment: "Prendre Rendez-vous",
            collections: "Collections sur‑mesure",
            atelier: "Les créations de l’Atelier",
            haute: "Haute Joaillerie",
            expertise: "Expertise et Savoir‑faire",
            showrooms: "Showrooms",
            joaillerie: "Comprendre la joaillerie",
            guide: "Guide",
            compte: "Compte",
            envies: "Envies",
            panier: "Panier",
            rechercher: "Rechercher",
        },
    };
    const t = translations[currentLocale] || translations.fr;

    // Local state
    const [menuOpen, setMenuOpen] = useState(false);
    // Only update the scrolled state on the home page
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // For submenu: track active menu key, its left offset, and its width
    const [activeSubmenu, setActiveSubmenu] = useState({ key: null, left: 0, width: 0 });
    const hideTimeout = useRef(null);

    // Dummy search data (replace with your real API)
    const dummyData = [
        "Diamond Ring",
        "Gold Necklace",
        "Silver Bracelet",
        "Platinum Earrings",
        "Emerald Pendant",
        "Ruby Brooch",
        "Sapphire Watch",
    ];

    // Debounce search update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() === "") {
                setSearchResults([]);
            } else {
                setSearchResults(
                    dummyData.filter((item) =>
                        item.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                );
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Only on the home page add the scroll listener
    useEffect(() => {
        if (!isHomePage) return;
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHomePage]);

    // Dark mode logic
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const saved = localStorage.getItem("diamantrouge-theme");
        if (saved === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);
    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newTheme = !prev;
            if (newTheme) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("diamantrouge-theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("diamantrouge-theme", "light");
            }
            return newTheme;
        });
    };

    // For logos and icons, define different sources based on scroll state,
    // but if not on home page, always use the "scrolled" (solid) version.
    const logoSrc = "/logo11.png";
    const whatsappIcon = isHomePage
        ? (scrolled
            ? "https://amantys.fr/wp-content/uploads/2023/07/Logo-WhatsApp-1-1.svg"
            : "https://amantys.fr/wp-content/uploads/2023/07/Logo-WhatsApp.svg")
        : "https://amantys.fr/wp-content/uploads/2023/07/Logo-WhatsApp-1-1.svg";
    const calendarIcon = isHomePage
        ? (scrolled
            ? "https://amantys.fr/wp-content/uploads/2023/07/Calendrier-1.svg"
            : "https://amantys.fr/wp-content/uploads/2023/07/Calendrier.svg")
        : "https://amantys.fr/wp-content/uploads/2023/07/Calendrier-1.svg";
    const guideIcon = isHomePage
        ? (scrolled
            ? "https://amantys.fr/wp-content/uploads/2024/06/Diamond-spark-rotation-HD-BLACK-new-1.gif"
            : "https://amantys.fr/wp-content/uploads/2024/06/Diamond-spark-rotation-HD-WHITE-1-1.gif")
        : "https://amantys.fr/wp-content/uploads/2024/06/Diamond-spark-rotation-HD-BLACK-new-1.gif";
    const accountIcon = isHomePage
        ? (scrolled
            ? "https://amantys.fr/wp-content/uploads/2023/08/Compte.svg"
            : "https://amantys.fr/wp-content/uploads/2023/08/Compte_white.svg")
        : "https://amantys.fr/wp-content/uploads/2023/08/Compte.svg";
    const enviesIcon = isHomePage
        ? (scrolled
            ? "https://amantys.fr/wp-content/uploads/2023/08/Vector-1.svg"
            : "https://amantys.fr/wp-content/uploads/2023/08/Vector-1_white.svg")
        : "https://amantys.fr/wp-content/uploads/2023/08/Vector-1.svg";
    const panierIcon = isHomePage
        ? (scrolled
            ? "https://amantys.fr/wp-content/uploads/2023/10/Panier.svg"
            : "https://amantys.fr/wp-content/uploads/2023/10/Panier_white.png")
        : "https://amantys.fr/wp-content/uploads/2023/10/Panier.svg";

    // Define text class based on page and scroll.
    // On home page, use white text when not scrolled; on other pages always use dark text.
    const defaultTextClass = isHomePage
        ? (scrolled ? "text-richEbony" : "text-white")
        : "text-richEbony";

    // Submenu content mapping
    const submenuContent = {
        atelier: [
            { href: "/atelier-creations/inspirations", label: "Inspirations" },
            { href: "/atelier-creations/engagement-rings", label: "Bagues de fiançailles" },
            { href: "/atelier-creations/pre-proposal-rings", label: "Bagues de pré‑demande" },
            { href: "/atelier-creations/alliances", label: "Alliances pour elle & pour lui" },
            { href: "/atelier-creations/necklaces", label: "Colliers" },
            { href: "/atelier-creations/bracelets", label: "Bracelets" },
            { href: "/atelier-creations/earrings", label: "Boucles d’oreilles" },
        ],
        expertise: [
            { href: "/expertise/diamonds", label: "L’essentiel du diamant" },
            { href: "/expertise/ethical-diamonds", label: "Diamants éthiques d’exception" },
            { href: "/expertise/custom-service", label: "Notre service sur‑mesure" },
            { href: "/expertise/artisanal", label: "Confection artisanale à Paris" },
            { href: "/expertise/quality", label: "Qualité au meilleur prix" },
            { href: "/about-us", label: "Histoire de la Maison" },
        ],
        showrooms: [
            { href: "/showrooms/paris", label: "Paris – l’Atelier" },
            { href: "/showrooms/bordeaux", label: "Bordeaux" },
            { href: "/showrooms/virtual", label: "En visio" },
        ],
        joaillerie: [
            { href: "/joaillerie/engagement-guide", label: "Guide fiançailles & mariage" },
            { href: "/joaillerie/custom-gifts", label: "Cadeaux sur‑mesure" },
            { href: "/joaillerie/diamond-science", label: "Science des diamants" },
            { href: "/joaillerie/tips", label: "Tuto & conseils" },
            { href: "/joaillerie/news", label: "Actualités" },
        ],
    };

    // Refs for inner nav container and each nav item with a dropdown
    const navContainerRef = useRef(null);
    const navItemRefs = {
        atelier: useRef(null),
        expertise: useRef(null),
        showrooms: useRef(null),
        joaillerie: useRef(null),
    };

    // When mouse enters a nav item, calculate its left offset and width
    const handleMouseEnter = (menuKey) => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        const el = navItemRefs[menuKey].current;
        const containerRect = navContainerRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const leftOffset = elRect.left - containerRect.left;
        const width = elRect.width;
        setActiveSubmenu({ key: menuKey, left: leftOffset, width });
    };

    // Delay hiding to allow smooth transition into submenu
    const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => {
            setActiveSubmenu({ key: null, left: 0, width: 0 });
        }, 200);
    };

    // When entering submenu, cancel hide timeout
    const handleSubmenuEnter = () => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                isHomePage ? (scrolled ? "bg-brandIvory" : "bg-transparent") : "bg-brandIvory"
            }`}
        >
            {/* Unified (top) Navigation Bar */}
            <div className="container mx-auto px-6 py-3 grid grid-cols-3 items-center">
                {/* Left Column */}
                <div className="flex items-center space-x-4">
                    <a
                        href="https://api.whatsapp.com/send/?phone=744094495&text"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition"
                    >
                        <Image
                            src={whatsappIcon}
                            alt="WhatsApp"
                            width={27}
                            height={27}
                        />
                    </a>
                    <Link
                        href="/appointments"
                        className={`flex items-center transition hover:text-brandGold ${defaultTextClass}`}
                    >
                        <Image
                            src={calendarIcon}
                            alt="Calendrier"
                            width={24}
                            height={27}
                            className="mr-2"
                        />
                        <span className="ml-1 hidden md:inline text-sm font-medium">
              {t.appointment}
            </span>
                    </Link>
                </div>

                {/* Center Column: Logo */}
                <div className="flex justify-center pt-7">
                    <Link href="/">
                        <Image
                            src={logoSrc}
                            alt="Diamant Rouge"
                            width={333}
                            height={30}
                            priority
                            className="object-contain"
                        />
                    </Link>
                </div>

                {/* Right Column */}
                <div className="flex items-center justify-end space-x-4">
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="https://www.youtube.com/playlist?list=PLAbU-g895HAqhHQRmYZbgbKa3A8u4utII"
                            className={`flex items-center transition hover:text-brandGold ${defaultTextClass}`}
                            target="_blank"
                        >
                            <Image
                                src={guideIcon}
                                alt={t.guide}
                                width={30}
                                height={30}
                            />
                            <span className="ml-1 text-sm font-medium">{t.guide}</span>
                        </Link>
                        <Link
                            href="/mon-panque"
                            className={`flex items-center transition hover:text-brandGold ${defaultTextClass}`}
                        >
                            <Image
                                src={accountIcon}
                                alt={t.compte}
                                width={20}
                                height={20}
                            />
                            <span className="ml-1 text-sm font-medium">{t.compte}</span>
                        </Link>
                        <button
                            onClick={() => {
                                /* Open wishlist modal if needed */
                            }}
                            className={`flex items-center transition hover:text-brandGold ${defaultTextClass}`}
                        >
                            <Image
                                src={enviesIcon}
                                alt={t.envies}
                                width={20}
                                height={20}
                            />
                            <span className="ml-1 text-sm font-medium">{t.envies}</span>
                        </button>
                        <Link
                            href="/mon-panier"
                            className={`flex items-center transition hover:text-brandGold ${defaultTextClass}`}
                        >
                            <Image
                                src={panierIcon}
                                alt={t.panier}
                                width={21}
                                height={22}
                            />
                            <span className="ml-1 text-sm font-medium">
                {t.panier} ({cart.length})
              </span>
                        </Link>
                    </div>
                    <button
                        aria-label="Toggle menu"
                        className="md:hidden focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <X size={26} className={isHomePage ? (scrolled ? "text-richEbony" : "text-white") : "text-richEbony"} />
                        ) : (
                            <Menu size={26} className={isHomePage ? (scrolled ? "text-richEbony" : "text-white") : "text-richEbony"} />
                        )}
                    </button>
                </div>
            </div>

            {/* MAIN NAVIGATION (second floor) */}
            <div className="relative" ref={navContainerRef}>
                <div className="container mx-auto px-6 py-3 flex items-center">
                    <nav className="flex-1">
                        <ul className="flex justify-center space-x-12">
                            <li>
                                <Link
                                    href="/custom-collections"
                                    className={`block py-2 text-base font-medium transition hover:text-brandGold ${defaultTextClass}`}
                                >
                                    {t.collections}
                                </Link>
                            </li>

                            {/* Atelier */}
                            <li
                                className="relative"
                                ref={navItemRefs.atelier}
                                onMouseEnter={() => handleMouseEnter("atelier")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    href="/atelier-creations"
                                    className={`block py-2 text-base font-medium transition hover:text-brandGold ${defaultTextClass}`}
                                >
                                    {t.atelier}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/haute-joaillerie"
                                    className={`block py-2 text-base font-medium transition hover:text-brandGold ${defaultTextClass}`}
                                >
                                    {t.haute}
                                </Link>
                            </li>

                            {/* Expertise */}
                            <li
                                className="relative"
                                ref={navItemRefs.expertise}
                                onMouseEnter={() => handleMouseEnter("expertise")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    href="/expertise"
                                    className={`block py-2 text-base font-medium transition hover:text-brandGold ${defaultTextClass}`}
                                >
                                    {t.expertise}
                                </Link>
                            </li>

                            {/* Showrooms */}
                            <li
                                className="relative"
                                ref={navItemRefs.showrooms}
                                onMouseEnter={() => handleMouseEnter("showrooms")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    href="/showrooms"
                                    className={`block py-2 text-base font-medium transition hover:text-brandGold ${defaultTextClass}`}
                                >
                                    {t.showrooms}
                                </Link>
                            </li>

                            {/* Joaillerie */}
                            <li
                                className="relative"
                                ref={navItemRefs.joaillerie}
                                onMouseEnter={() => handleMouseEnter("joaillerie")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    href="/joaillerie"
                                    className={`block py-2 text-base font-medium transition hover:text-brandGold ${defaultTextClass}`}
                                >
                                    {t.joaillerie}
                                </Link>
                            </li>

                            {/* Search Nav Item */}
                            <li>
                                <button
                                    onClick={() => setShowSearch(!showSearch)}
                                    className="focus:outline-none relative top-2"
                                >
                                    {showSearch ? (
                                        <X size={26} className={isHomePage ? (scrolled ? "text-richEbony" : "text-white") : "text-richEbony"} />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                            size="lg"
                                            className={isHomePage ? (scrolled ? "text-richEbony" : "text-white") : "text-richEbony"}
                                        />
                                    )}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Extended panel for Search or Submenu */}
                {showSearch ? (
                    <div
                        className={`absolute left-0 top-full w-full transition-all duration-500 ${
                            isHomePage ? (scrolled ? "bg-brandIvory" : "bg-transparent") : "bg-brandIvory"
                        } animate-slideDownRefined`}
                        style={{ animationDuration: "1.8s" }}
                    >
                        <div className="container mx-auto px-6 pt-6 pb-3 flex flex-col space-y-4">
                            <div className="w-full">
                                <input
                                    type="search"
                                    placeholder={t.rechercher}
                                    className="w-full input-field py-1 px-3 text-base font-medium rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brandGold transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="w-full">
                                {searchResults.length > 0 ? (
                                    <ul className="space-y-1">
                                        {searchResults.map((result, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={`/search?query=${encodeURIComponent(result)}`}
                                                    className={`block px-2 py-1 text-sm transition-all duration-700 ease-out hover:scale-105 hover:bg-brandGold hover:text-richEbony ${defaultTextClass}`}
                                                >
                                                    {result}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    searchQuery.trim() !== "" && (
                                        <p className="text-sm text-gray-500">No results found.</p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    activeSubmenu.key && (
                        <div
                            className={`absolute left-0 top-full w-full transition-all duration-500 ${
                                isHomePage ? (scrolled ? "bg-brandIvory" : "bg-transparent") : "bg-brandIvory"
                            } animate-slideDownRefined`}
                            style={{ animationDuration: "1.8s" }}
                            onMouseEnter={handleSubmenuEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="container pb-3">
                                <div className="relative">
                                    <div style={{ marginLeft: activeSubmenu.left, width: activeSubmenu.width }}>
                                        <ul className="space-y-0.5">
                                            {submenuContent[activeSubmenu.key]?.map((item, idx) => (
                                                <li key={idx}>
                                                    <Link
                                                        href={item.href}
                                                        className={`block px-2 py-1 text-sm transition-all duration-700 ease-out hover:scale-105 hover:bg-brandGold hover:text-richEbony ${defaultTextClass}`}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </header>
    );
}
