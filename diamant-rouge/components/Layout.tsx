// components/Layout.tsx
import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
    children: ReactNode;
    title?: string;
    description?: string;
};

export default function Layout({ children, title, description }: LayoutProps) {
    return (
        <>
            {/* Basic SEO tags. You can enhance these dynamically later. */}
            <Head>
                <title>{title ? `${title} | Diamant-Rouge` : 'Diamant-Rouge'}</title>
                {description && <meta name="description" content={description} />}
            </Head>

            {/* Site Header */}
            <Header />

            {/* Main Content Area */}
            <main className="min-h-[80vh]">{children}</main>

            {/* Site Footer */}
            <Footer />
        </>
    );
}
