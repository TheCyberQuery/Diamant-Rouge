// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            {/* Simple global header */}
            <header style={{ padding: '1rem' }}>
                <h2 style={{ margin: 0, display: 'inline' }}>Diamant-Rouge</h2>
                <LanguageSwitcher />
            </header>
            <Component {...pageProps} />
        </>
    );
}
