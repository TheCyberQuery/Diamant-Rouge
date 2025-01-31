import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Moon, Sun, Globe, ShoppingCart } from 'lucide-react';

export default function Header() {
    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark-mode');
            setIsDark(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        setIsDark(!isDark);
    };

    return (
        <header className="fixed w-full top-0 left-0 z-50 bg-rich-ebony/90 backdrop-blur-md p-4">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link href="/">
                    <h1 className="text-gold text-3xl font-bold tracking-wider">Diamant Rouge</h1>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <Link href="/collections/rings" className="text-ivory hover:text-gold transition">Rings</Link>
                    <Link href="/collections/bracelets" className="text-ivory hover:text-gold transition">Bracelets</Link>
                    <Link href="/collections/necklaces" className="text-ivory hover:text-gold transition">Necklaces</Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <button onClick={toggleDarkMode}>
                        {isDark ? <Sun className="text-gold" size={24} /> : <Moon className="text-gold" size={24} />}
                    </button>
                    <Link href="/cart">
                        <ShoppingCart className="text-gold" size={24} />
                    </Link>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <Globe className="text-gold" size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-rich-ebony text-ivory p-6 shadow-lg">
                    <Link href="/collections/rings" className="block py-2">Rings</Link>
                    <Link href="/collections/bracelets" className="block py-2">Bracelets</Link>
                    <Link href="/collections/necklaces" className="block py-2">Necklaces</Link>
                </div>
            )}
        </header>
    );
}
