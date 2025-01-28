// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-ebony text-ivory py-6">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">

                {/* Brand Statement or Copyright */}
                <p className="mb-4 md:mb-0 font-serif text-sm">
                    © {new Date().getFullYear()} Diamant-Rouge. All Rights Reserved.
                </p>

                {/* Quick Links (Could be expanded with more pages) */}
                <nav className="flex gap-4 text-sm">
                    <Link href="/about" className="hover:text-crimson transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-crimson transition-colors">Contact</Link>
                    <Link href="/faq" className="hover:text-crimson transition-colors">FAQ</Link>
                    {/* Terms/Privacy if you have them */}
                </nav>

            </div>
        </footer>
    );
}
