// components/LanguageSwitcher.tsx
import Link from "next/link";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
    const router = useRouter();
    const { pathname, query, asPath } = router;

    return (
        <div className="flex gap-2 text-richEbony">
            <Link
                href={{ pathname, query }}
                as={asPath}
                locale="en"
                className="hover:text-brandGold transition"
            >
                EN
            </Link>
            <span>|</span>
            <Link
                href={{ pathname, query }}
                as={asPath}
                locale="fr"
                className="hover:text-brandGold transition"
            >
                FR
            </Link>
            <span>|</span>
            <Link
                href={{ pathname, query }}
                as={asPath}
                locale="ar"
                className="hover:text-brandGold transition"
            >
                AR
            </Link>
        </div>
    );
}
