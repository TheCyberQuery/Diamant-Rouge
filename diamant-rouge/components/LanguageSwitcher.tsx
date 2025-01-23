// components/LanguageSwitcher.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
    const router = useRouter();
    const { pathname, query, asPath } = router;

    return (
        <div style={{ margin: '1rem' }}>
            <Link href={{ pathname, query }} as={asPath} locale="en">
                English
            </Link>{' '}
            |{' '}
            <Link href={{ pathname, query }} as={asPath} locale="fr">
                Français
            </Link>{' '}
            |{' '}
            <Link href={{ pathname, query }} as={asPath} locale="ar">
                العربية
            </Link>
        </div>
    );
}
