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
import { faMagnifyingGlass, faDiamond, faGem } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const { data: session } = useSession();
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const router = useRouter();
    const currentLocale = router.locale || "fr";
    const isProductPage = router.pathname.startsWith("/products/");
    const shouldApplyColorSwitching = !isProductPage;

    // Enhanced French translations with more elegant and poetic language
    const translations = {
        fr: {
            appointment: "Réservation Privilège",
            collections: "Collections sur-mesure",
            atelier: "L'Art de l'Atelier",
            haute: "Haute Joaillerie",
            expertise: "Héritage & Savoir-faire",
            showrooms: "Écrins de Prestige",
            joaillerie: "L'Univers des Diamants",
            guide: "Guide du Connaisseur",
            compte: "Espace Privilège",
            envies: "Vos Coups de Cœur",
            panier: "Votre Écrin",
            rechercher: "Explorer nos Trésors",
        },
    };
    const t = translations[currentLocale] || translations.fr;

    // Local state
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // For submenu: track active menu key, its left offset, and its width
    const [activeSubmenu, setActiveSubmenu] = useState({ key: null, left: 0, width: 0 });
    const hideTimeout = useRef(null);

    // Elegant product naming for search
    const elegantProducts = [
        "Bague Éternité Diamant",
        "Collier Héritage Or Rose",
        "Bracelet Intemporel Platine",
        "Boucles d'Oreilles Éclat Royal",
        "Pendentif Émeraude Rêverie",
        "Broche Rubis Dynastie",
        "Montre Saphir Prestige",
    ];

    // Debounce search update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() === "") {
                setSearchResults([]);
            } else {
                setSearchResults(
                    elegantProducts.filter((item) =>
                        item.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                );
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Add the scroll listener for all pages
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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

    // For logos and icons
    const logoSrc = "/logo11.png";

    // Custom icon paths - Using better quality static paths instead of external URLs
    const whatsappIcon = "/images/icons/whatsapp-icon.svg"; // Replace with your local path
    const calendarIcon = "/images/icons/calendar-icon.svg"; // Replace with your local path
    const guideIcon = "/images/icons/diamond-guide-icon.svg"; // Replace with your local path
    const accountIcon = "/images/icons/account-icon.svg"; // Replace with your local path
    const enviesIcon = "/images/icons/wishlist-icon.svg"; // Replace with your local path
    const panierIcon = "/images/icons/cart-icon.svg"; // Replace with your local path

    const defaultTextClass = shouldApplyColorSwitching
        ? (scrolled ? "text-richEbony" : "text-white")
        : "text-richEbony";

    // Enhanced submenu content with more elegant descriptions
    const submenuContent = {
        atelier: [
            { href: "/atelier-creations/inspirations", label: "Sources d'Inspiration" },
            { href: "/atelier-creations/engagement-rings", label: "Bagues de Fiançailles d'Exception" },
            { href: "/atelier-creations/pre-proposal-rings", label: "Bagues de Pré-Demande Sentimentales" },
            { href: "/atelier-creations/alliances", label: "Alliances Éternelles" },
            { href: "/atelier-creations/necklaces", label: "Colliers Précieux" },
            { href: "/atelier-creations/bracelets", label: "Bracelets Rafffinés" },
            { href: "/atelier-creations/earrings", label: "Boucles d'Oreilles Éblouissantes" },
        ],
        expertise: [
            { href: "/expertise/diamonds", label: "L'Âme du Diamant" },
            { href: "/expertise/ethical-diamonds", label: "Diamants Éthiques d'Exception" },
            { href: "/expertise/custom-service", label: "L'Art du Sur-Mesure" },
            { href: "/expertise/artisanal", label: "Confection Artisanale Parisienne" },
            { href: "/expertise/quality", label: "Excellence au Prix Juste" },
            { href: "/about-us", label: "Histoire et Héritage de la Maison" },
        ],
        showrooms: [
            { href: "/showrooms/paris", label: "Paris – Le Cœur de la Maison" },
            { href: "/showrooms/bordeaux", label: "Bordeaux – L'Écrin du Sud-Ouest" },
            { href: "/showrooms/virtual", label: "Rendez-vous Virtuel Personnalisé" },
        ],
        joaillerie: [
            { href: "/joaillerie/engagement-guide", label: "Art des Fiançailles & du Mariage" },
            { href: "/joaillerie/custom-gifts", label: "Cadeaux d'Exception Sur-Mesure" },
            { href: "/joaillerie/diamond-science", label: "Science et Poésie des Diamants" },
            { href: "/joaillerie/tips", label: "Conseils de Joailliers" },
            { href: "/joaillerie/news", label: "Journal de la Maison" },
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
            className={`fixed top-0 w-full z-50 transition-all duration-700 ${
                scrolled ? "bg-brandIvory shadow-lg" : "bg-transparent"
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
                        className="hover:opacity-80 transition-all duration-300 hover:scale-110"
                    >
                        <Image src={whatsappIcon} alt="WhatsApp" width={27} height={27} />
                    </a>
                    <Link
                        href="/appointments"
                        className={`flex items-center transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass}`}
                    >
                        <Image
                            src={calendarIcon}
                            alt="Calendrier"
                            width={24}
                            height={27}
                            className="mr-2"
                        />
                        <span className="ml-1 hidden md:inline text-sm font-medium font-didot">
                            {t.appointment}
                        </span>
                    </Link>
                </div>

                {/* Center Column: Logo with subtle animation */}
                <div className="flex justify-center pt-7">
                    <Link href="/">
                        <div className="transition-all duration-500 hover:opacity-90 hover:scale-105">
                            <Image
                                src={logoSrc}
                                alt="Diamant Rouge"
                                width={333}
                                height={30}
                                priority
                                className="object-contain"
                            />
                        </div>
                    </Link>
                </div>

                {/* Right Column */}
                <div className="flex items-center justify-end space-x-4">
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="https://www.youtube.com/playlist?list=PLAbU-g895HAqhHQRmYZbgbKa3A8u4utII"
                            className={`flex items-center transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass}`}
                            target="_blank"
                        >
                            <div className="relative">
                                <Image src={guideIcon} alt={t.guide} width={30} height={30} />
                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            </div>
                            <span className="ml-1 text-sm font-medium font-didot">{t.guide}</span>
                        </Link>
                        <Link
                            href="/mon-compte"
                            className={`flex items-center transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass}`}
                        >
                            <Image src={accountIcon} alt={t.compte} width={20} height={20} />
                            <span className="ml-1 text-sm font-medium font-didot">{t.compte}</span>
                        </Link>
                        <button
                            onClick={() => {
                                /* Open wishlist modal if needed */
                            }}
                            className={`flex items-center transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass} relative`}
                        >
                            <Image src={enviesIcon} alt={t.envies} width={20} height={20} />
                            <span className="ml-1 text-sm font-medium font-didot">{t.envies}</span>
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-xs rounded-full bg-red-600 text-white">
                                    {wishlist.length}
                                </span>
                            )}
                        </button>
                        <Link
                            href="/mon-panier"
                            className={`flex items-center transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass} relative`}
                        >
                            <Image src={panierIcon} alt={t.panier} width={21} height={22} />
                            <span className="ml-1 text-sm font-medium font-didot">
                                {t.panier}
                            </span>
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-xs rounded-full bg-red-600 text-white">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>
                    <button
                        aria-label="Toggle menu"
                        className="md:hidden focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <X
                                size={26}
                                className={`transition-all duration-300 ${
                                    shouldApplyColorSwitching
                                        ? scrolled
                                            ? "text-richEbony"
                                            : "text-white"
                                        : "text-richEbony"
                                }`}
                            />
                        ) : (
                            <Menu
                                size={26}
                                className={`transition-all duration-300 ${
                                    shouldApplyColorSwitching
                                        ? scrolled
                                            ? "text-richEbony"
                                            : "text-white"
                                        : "text-richEbony"
                                }`}
                            />
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
                                    className={`block py-2 text-base font-didot font-medium transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass}`}
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
                                    className={`block py-2 text-base font-didot font-medium transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass} group`}
                                >
                                    <span className="inline-flex items-center">
                                        {t.atelier}
                                        <FontAwesomeIcon
                                            icon={faGem}
                                            className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/haute-joaillerie"
                                    className={`block py-2 text-base font-didot font-medium transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass}`}
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
                                    className={`block py-2 text-base font-didot font-medium transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass} group`}
                                >
                                    <span className="inline-flex items-center">
                                        {t.expertise}
                                        <FontAwesomeIcon
                                            icon={faGem}
                                            className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </span>
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
                                    className={`block py-2 text-base font-didot font-medium transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass} group`}
                                >
                                    <span className="inline-flex items-center">
                                        {t.showrooms}
                                        <FontAwesomeIcon
                                            icon={faGem}
                                            className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </span>
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
                                    className={`block py-2 text-base font-didot font-medium transition-all duration-300 hover:text-brandGold hover:scale-105 ${defaultTextClass} group`}
                                >
                                    <span className="inline-flex items-center">
                                        {t.joaillerie}
                                        <FontAwesomeIcon
                                            icon={faGem}
                                            className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </span>
                                </Link>
                            </li>

                            {/* Search Nav Item */}
                            <li>
                                <button
                                    onClick={() => setShowSearch(!showSearch)}
                                    className="focus:outline-none relative top-2 transition-all duration-300 hover:scale-110"
                                >
                                    {showSearch ? (
                                        <X
                                            size={26}
                                            className={`transition-all duration-300 ${
                                                shouldApplyColorSwitching
                                                    ? scrolled
                                                        ? "text-richEbony"
                                                        : "text-white"
                                                    : "text-richEbony"
                                            }`}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                            size="lg"
                                            className={`transition-all duration-300 ${
                                                shouldApplyColorSwitching
                                                    ? scrolled
                                                        ? "text-richEbony"
                                                        : "text-white"
                                                    : "text-richEbony"
                                            }`}
                                        />
                                    )}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Enhanced Panel for Search or Submenu with elegant transitions */}
                {showSearch ? (
                    <div
                        className={`absolute left-0 top-full w-full transition-all duration-700 ${
                            scrolled ? "bg-brandIvory/95 backdrop-blur-sm" : "bg-black/80 backdrop-blur-sm"
                        } animate-slideDownRefined`}
                        style={{ animationDuration: "1.8s" }}
                    >
                        <div className="container mx-auto px-6 pt-6 pb-6 flex flex-col space-y-4">
                            <div className="w-full max-w-2xl mx-auto">
                                <div className="relative">
                                    <input
                                        type="search"
                                        placeholder={t.rechercher}
                                        className="w-full input-field py-3 px-5 text-base font-didot font-medium rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brandGold transition-all duration-300"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <FontAwesomeIcon
                                            icon={faDiamond}
                                            size="sm"
                                            className="text-brandGold"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-2xl mx-auto">
                                {searchResults.length > 0 ? (
                                    <ul className="space-y-2">
                                        {searchResults.map((result, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={`/search?query=${encodeURIComponent(result)}`}
                                                    className={`block px-4 py-2 text-sm font-didot transition-all duration-500 ease-out hover:scale-105 hover:bg-brandGold hover:text-richEbony ${
                                                        scrolled ? "text-richEbony" : "text-white"
                                                    } rounded-md`}
                                                >
                                                    {result}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    searchQuery.trim() !== "" && (
                                        <p className={`text-sm font-didot italic ${
                                            scrolled ? "text-gray-600" : "text-gray-300"
                                        }`}>
                                            Aucun résultat trouvé pour votre recherche.
                                        </p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    activeSubmenu.key && (
                        <div
                            className={`absolute left-0 top-full w-full transition-all duration-700 ${
                                scrolled ? "bg-brandIvory/95 backdrop-blur-sm" : "bg-black/80 backdrop-blur-sm"
                            } animate-slideDownRefined`}
                            style={{ animationDuration: "1.8s" }}
                            onMouseEnter={handleSubmenuEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="container pb-4 pt-2">
                                <div className="relative">
                                    <div style={{ marginLeft: activeSubmenu.left, width: activeSubmenu.width }}>
                                        <ul className="space-y-1">
                                            {submenuContent[activeSubmenu.key]?.map((item, idx) => (
                                                <li key={idx}>
                                                    <Link
                                                        href={item.href}
                                                        className={`block px-3 py-2 text-sm font-didot transition-all duration-500 ease-out hover:scale-105 hover:bg-brandGold hover:text-richEbony ${
                                                            scrolled ? "text-richEbony" : "text-white"
                                                        } rounded-md`}
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

            {/* Mobile Menu - Slide from side */}
            <div
                className={`fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-all duration-500 
                    ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMenuOpen(false)}
            >
                <div
                    className={`absolute top-0 right-0 w-3/4 h-full bg-brandIvory transition-all duration-500 transform
                        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-end p-6">
                        <button onClick={() => setMenuOpen(false)}>
                            <X size={24} className="text-richEbony" />
                        </button>
                    </div>

                    <div className="px-6 py-4">
                        <ul className="space-y-6">
                            <li>
                                <Link
                                    href="/custom-collections"
                                    className="block py-2 text-lg font-didot font-medium text-richEbony hover:text-brandGold transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t.collections}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/atelier-creations"
                                    className="block py-2 text-lg font-didot font-medium text-richEbony hover:text-brandGold transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t.atelier}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/haute-joaillerie"
                                    className="block py-2 text-lg font-didot font-medium text-richEbony hover:text-brandGold transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t.haute}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/expertise"
                                    className="block py-2 text-lg font-didot font-medium text-richEbony hover:text-brandGold transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t.expertise}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/showrooms"
                                    className="block py-2 text-lg font-didot font-medium text-richEbony hover:text-brandGold transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t.showrooms}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/joaillerie"
                                    className="block py-2 text-lg font-didot font-medium text-richEbony hover:text-brandGold transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t.joaillerie}
                                </Link>
                            </li>
                        </ul>

                        <div className="mt-12 space-y-6">
                            <Link
                                href="/mon-compte"
                                className="flex items-center text-richEbony hover:text-brandGold transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Image src={accountIcon} alt={t.compte} width={20} height={20} className="mr-3" />
                                <span className="text-base font-didot">{t.compte}</span>
                            </Link>

                            <Link
                                href="/mon-panier"
                                className="flex items-center text-richEbony hover:text-brandGold transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Image src={panierIcon} alt={t.panier} width={20} height={20} className="mr-3" />
                                <span className="text-base font-didot">{t.panier} ({cart.length})</span>
                            </Link>

                            <Link
                                href="/appointments"
                                className="flex items-center text-richEbony hover:text-brandGold transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Image src={calendarIcon} alt="Calendrier" width={20} height={20} className="mr-3" />
                                <span className="text-base font-didot">{t.appointment}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}