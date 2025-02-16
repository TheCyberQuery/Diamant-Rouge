"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import {
    ShoppingCart,
    Heart,
    User,
    Calendar,
    LogOut,
    MessageCircle,
    Menu,
    X,
    ChevronDown,
    Sun,
    Moon,
    ShieldCheck, // or any other Lucide icon for admin
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // ========== THEME STATE ==========
    // By default, let's check localStorage or fallback to false (light mode)
    const [isDarkMode, setIsDarkMode] = useState(false);

    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const { data: session } = useSession();

    // Track scroll to change header style
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // On mount, check if we have a saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("diamantrouge-theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // Toggle theme function
    const handleThemeToggle = () => {
        setIsDarkMode((prev) => {
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

    return (
        <header
            className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${
                isScrolled
                    ? "bg-brandIvory/90 shadow-luxury backdrop-blur-md"
                    : "bg-transparent"
            }
      `}
        >
            {/* ====== Top Bar ====== */}
            <div className="w-full bg-brandIvory/80 py-3 border-b border-platinumGray">
                <div className="container mx-auto flex items-center justify-between px-6">
                    {/* Left side: WhatsApp + Appointment */}
                    <div className="flex items-center gap-4 text-richEbony">
                        <a
                            href="https://wa.me/YOUR_WHATSAPP_NUMBER"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-burgundy hover-scale transition duration-300"
                        >
                            <MessageCircle size={24} />
                        </a>
                        <Link
                            href="/appointments"
                            className="flex items-center gap-1 hover:text-brandGold transition duration-300"
                        >
                            <Calendar size={20} />
                            <span className="hidden md:inline">Prendre Rendez-vous</span>
                        </Link>
                    </div>

                    {/* Logo in the center */}
                    <Link href="/" className="flex items-center justify-center">
                        <div className="relative w-[140px] h-[57px] hover-scale transition-transform duration-500">
                            {/* Ensure your logo asset has burgundy & gold colors */}
                            <Image
                                src="/images/logo_center.png"
                                alt="Diamant Rouge"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* Right side: user icons + Theme Toggle */}
                    <div className="flex items-center gap-5">
                        {/* Wishlist Icon */}
                        <Link
                            href="/wishlist"
                            className="relative hover-scale transition-transform duration-300"
                        >
                            <Heart className="text-brandGold" size={26} />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-burgundy text-brandIvory text-xs px-2 py-1 rounded-full">
                  {wishlist.length}
                </span>
                            )}
                        </Link>

                        {/* Cart Icon */}
                        <Link
                            href="/cart"
                            className="relative hover-scale transition-transform duration-300"
                        >
                            <ShoppingCart className="text-brandGold" size={26} />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-burgundy text-brandIvory text-xs px-2 py-1 rounded-full">
                  {cart.length}
                </span>
                            )}
                        </Link>

                        {/* Admin Icon - only if user is admin */}
                        {session?.user?.role === "admin" && (
                            <Link
                                href="/admin"
                                className="hover-scale transition-transform duration-300 hover:text-brandGold"
                            >
                                <ShieldCheck className="text-brandGold" size={26} />
                            </Link>
                        )}

                        {/* Auth Icons */}
                        {session ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="hover:text-brandGold transition duration-300"
                                >
                                    <User className="text-brandGold" size={26} />
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-brandGold hover:text-burgundy transition duration-300"
                                >
                                    <LogOut size={26} />
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth"
                                className="hover:text-brandGold transition duration-300"
                            >
                                <User className="text-brandGold" size={26} />
                            </Link>
                        )}

                        {/* Dark/Light Mode Toggle Button */}
                        <button
                            onClick={handleThemeToggle}
                            className="text-brandGold hover:text-burgundy transition duration-300"
                        >
                            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                        </button>

                        {/* Mobile Menu Toggle (Burger Icon) */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-brandGold hover:text-burgundy transition duration-300"
                        >
                            {menuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ====== Second Bar: Main Nav ====== */}
            <div
                className={`hidden md:block w-full bg-brandIvory transition-all duration-500 ${
                    isScrolled ? "shadow-subtle" : ""
                }`}
            >
                <nav className="container mx-auto py-2 flex justify-center space-x-10">
                    {/* Each nav link */}
                    <Link
                        href="/"
                        className="text-richEbony hover:text-brandGold transition duration-300"
                    >
                        Home
                    </Link>

                    {/* Creations Dropdown */}
                    <div
                        className="relative flex items-center gap-1 text-richEbony hover:text-brandGold transition duration-300"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button className="flex items-center gap-1">
                            Creations
                            <ChevronDown size={18} />
                        </button>
                        <div
                            className={`dropdown-menu ${
                                isDropdownOpen ? "dropdown-menu-active" : ""
                            } left-1/2 -translate-x-1/2`}
                        >
                            <Link
                                href="/collections/rings"
                                className="block px-5 py-3 hover:bg-burgundy hover:text-brandIvory transition duration-300"
                            >
                                Rings
                            </Link>
                            <Link
                                href="/collections/bracelets"
                                className="block px-5 py-3 hover:bg-burgundy hover:text-brandIvory transition duration-300"
                            >
                                Bracelets
                            </Link>
                            <Link
                                href="/collections/necklaces"
                                className="block px-5 py-3 hover:bg-burgundy hover:text-brandIvory transition duration-300"
                            >
                                Necklaces
                            </Link>
                            <Link
                                href="/collections/bespoke"
                                className="block px-5 py-3 bg-brandGold text-richEbony font-medium transition duration-300"
                            >
                                Bespoke Creations
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/appointments"
                        className="text-richEbony hover:text-brandGold transition duration-300"
                    >
                        Appointments
                    </Link>
                    <Link
                        href="/the-house"
                        className="text-richEbony hover:text-brandGold transition duration-300"
                    >
                        The House
                    </Link>
                    <Link
                        href="/contact"
                        className="text-richEbony hover:text-brandGold transition duration-300"
                    >
                        Contact
                    </Link>
                </nav>
            </div>

            {/* ====== Mobile Nav Menu ====== */}
            {menuOpen && (
                <div className="mobile-menu md:hidden bg-brandIvory p-4 border-t border-platinumGray">
                    <Link
                        href="/"
                        className="block py-3 text-richEbony hover:text-brandGold transition duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/collections/rings"
                        className="block py-3 text-richEbony hover:text-brandGold transition duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        Rings
                    </Link>
                    <Link
                        href="/collections/bracelets"
                        className="block py-3 text-richEbony hover:text-brandGold transition duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        Bracelets
                    </Link>
                    <Link
                        href="/collections/necklaces"
                        className="block py-3 text-richEbony hover:text-brandGold transition duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        Necklaces
                    </Link>
                    <Link
                        href="/collections/bespoke"
                        className="block py-3 text-brandGold font-medium hover:text-brandIvory transition duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        Bespoke Creations
                    </Link>
                    <Link
                        href="/appointments"
                        className="block py-3 text-richEbony hover:text-brandGold transition duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        Appointments
                    </Link>
                    <Link
                        href="/the-house"
                        className="block py-3 text-richEbony hover:text-brandGold transition duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        The House
                    </Link>
                    <Link
                        href="/contact"
                        className="block py-3 text-richEbony hover:text-brandGold transition duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </div>
            )}
        </header>
    );
}
