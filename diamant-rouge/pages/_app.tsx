// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { CartProvider } from '../contexts/CartContext';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
    const { locale } = useRouter();

    return (
        <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <CartProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </CartProvider>
        </div>
    );
}
