// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const { locale } = useRouter();

    return (
        <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <Component {...pageProps} />
        </div>
    );
}
