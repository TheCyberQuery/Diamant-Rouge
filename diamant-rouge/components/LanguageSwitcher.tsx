// components/LanguageSwitcher.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
    const router = useRouter();
    const { pathname, query, asPath } = router;

    return (
        <div className="flex gap-2">
            <Link href={{ pathname, query }} as={asPath} locale="en" className="hover:text-crimson">
                EN
            </Link>
            <span>|</span>
            <Link href={{ pathname, query }} as={asPath} locale="fr" className="hover:text-crimson">
                FR
            </Link>
            <span>|</span>
            <Link href={{ pathname, query }} as={asPath} locale="ar" className="hover:text-crimson">
                AR
            </Link>
        </div>
    );
}
