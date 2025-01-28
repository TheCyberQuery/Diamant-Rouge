// components/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSwitcher from './LanguageSwitcher'; // We will move this from components/LanguageSwitcher.tsx or keep it as is

export default function Header() {
    const router = useRouter();

    return (
        <header className="bg-ebony text-ivory">
            <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">

                {/* Left: Brand Logo */}
                <Link href="/" className="text-3xl font-serif tracking-wider">
                    Diamant-Rouge
                </Link>

                {/* Center: Navigation */}
                <nav className="hidden md:flex gap-6 font-sans uppercase">
                    <Link href="/" className="hover:text-crimson transition-colors">Home</Link>
                    <Link href="/collections/rings" className="hover:text-crimson transition-colors">Collections</Link>
                    <Link href="/about" className="hover:text-crimson transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-crimson transition-colors">Contact</Link>
                </nav>

                {/* Right: User Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <LanguageSwitcher />

                    {/* Cart Icon */}
                    <Link href="/cart" className="hover:text-crimson transition-colors">
                        Cart
                    </Link>

                    {/* Profile/Login */}
                    {/* If logged in, show Profile; else show Login */}
                    {/* We'll keep it simple for now: */}
                    <Link href="/login" className="hover:text-crimson transition-colors">
                        Login
                    </Link>
                </div>
            </div>

            {/* Optional: Mobile Nav Toggle */}
            {/* You can add a hamburger menu here for smaller screens if desired. */}
        </header>
    );
}
