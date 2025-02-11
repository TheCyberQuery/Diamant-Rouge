import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { ShoppingCart, Heart, User, Calendar, LogOut, MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-richEbony/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
            {/* 🌟 First Floor Navigation */}
            <div className="w-full bg-richEbony/80 py-3">
                <div className="container mx-auto flex justify-between items-center px-6">

                    {/* Left Side: Appointment & WhatsApp */}
                    <div className="flex items-center gap-4">
                        <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank" rel="noopener noreferrer"
                           className="text-gold hover:text-crimson transition-all duration-500 transform hover:scale-110">
                            <MessageCircle size={24} />
                        </a>
                        <Link href="/appointments" className="flex items-center gap-2 text-ivory hover:text-gold transition-all duration-500 transform hover:scale-105">
                            <Calendar size={20} /> <span className="hidden md:inline">Book an Appointment</span>
                        </Link>
                    </div>

                    {/* Logo at Center with Perfect Scaling */}
                    <Link href="/" className="flex items-center justify-center">
                        <div className="relative w-[140px] h-[57px] max-w-full transition-transform duration-500 hover:scale-110">
                            <Image
                                src="/images/logo_center.png"
                                alt="Diamant Rouge"
                                layout="fill"
                                objectFit="contain"
                                className="cursor-pointer"
                            />
                        </div>
                    </Link>

                    {/* Right Side: User Icons */}
                    <div className="flex items-center gap-5">
                        <Link href="/wishlist">
                            <div className="relative hover:scale-110 transition-transform duration-500">
                                <Heart className="text-gold" size={26} />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-crimson text-ivory text-xs px-2 py-1 rounded-full animate-pulse">
                                        {wishlist.length}
                                    </span>
                                )}
                            </div>
                        </Link>

                        <Link href="/cart">
                            <div className="relative hover:scale-110 transition-transform duration-500">
                                <ShoppingCart className="text-gold" size={26} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-crimson text-ivory text-xs px-2 py-1 rounded-full animate-pulse">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                        </Link>

                        {session ? (
                            <>
                                <Link href="/profile">
                                    <User className="text-gold hover:scale-110 transition-transform duration-500" size={26} />
                                </Link>
                                <button onClick={() => signOut()} className="text-gold hover:text-crimson transition-all duration-500">
                                    <LogOut size={26} />
                                </button>
                            </>
                        ) : (
                            <Link href="/login">
                                <User className="text-gold hover:scale-110 transition-transform duration-500" size={26} />
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                            {menuOpen ? <X className="text-gold" size={26} /> : <Menu className="text-gold" size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 🌟 Second Floor Navigation */}
            <div className={`w-full bg-richEbony py-2 transition-all duration-500 ${isScrolled ? "shadow-md" : ""}`}>
                <nav className="container mx-auto flex justify-center space-x-10 text-ivory text-lg">
                    <Link href="/" className="hover:text-gold transition-all duration-500">Home</Link>

                    <div className="relative">
                        <button
                            className="hover:text-gold transition-all duration-500 flex items-center gap-1"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            Creations <ChevronDown size={18} />
                        </button>

                        {/* Dropdown Menu with Smooth Animation */}
                        <div
                            className={`absolute left-0 mt-2 w-56 bg-richEbony text-ivory shadow-lg rounded-lg overflow-hidden transition-all duration-700 transform ${
                                isDropdownOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                            }`}
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <Link href="/collections/rings" className="block px-5 py-3 hover:bg-velvetCrimson hover:text-softIvory transition-all duration-500">Rings</Link>
                            <Link href="/collections/bracelets" className="block px-5 py-3 hover:bg-velvetCrimson hover:text-softIvory transition-all duration-500">Bracelets</Link>
                            <Link href="/collections/necklaces" className="block px-5 py-3 hover:bg-velvetCrimson hover:text-softIvory transition-all duration-500">Necklaces</Link>
                            <Link href="/collections/bespoke" className="block px-5 py-3 bg-royalGold text-richEbony font-medium transition-all duration-500">Bespoke Creations</Link>
                        </div>
                    </div>

                    <Link href="/appointments" className="hover:text-gold transition-all duration-500">Appointments</Link>
                    <Link href="/the-house" className="hover:text-gold transition-all duration-500">The House</Link>
                    <Link href="/contact" className="hover:text-gold transition-all duration-500">Contact</Link>
                </nav>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="md:hidden absolute top-[4rem] left-0 w-full bg-richEbony text-ivory p-6 shadow-lg transition-all duration-500 transform scale-95 opacity-0 animate-fadeIn">
                    <Link href="/" className="block py-3">Home</Link>
                    <Link href="/collections/rings" className="block py-3">Rings</Link>
                    <Link href="/collections/bracelets" className="block py-3">Bracelets</Link>
                    <Link href="/collections/necklaces" className="block py-3">Necklaces</Link>
                    <Link href="/collections/bespoke" className="block py-3 text-gold font-bold">Bespoke Creations</Link>
                    <Link href="/appointments" className="block py-3">Appointments</Link>
                    <Link href="/the-house" className="block py-3">The House</Link>
                    <Link href="/contact" className="block py-3">Contact</Link>
                </div>
            )}
        </header>
    );
}
