import { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
    children: ReactNode;
    title?: string;
    description?: string;
};

export default function Layout({ children, title, description }: LayoutProps) {
    return (
        <>
            {/* ✅ Enhanced SEO Metadata */}
            <Head>
                <title>{title ? `${title} | Diamant-Rouge` : "Diamant-Rouge - Luxury Jewelry House"}</title>
                {description && <meta name="description" content={description} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Luxury Fixed Header */}
            <Header />

            {/* Main Content Area */}
            <main className="min-h-screen pt-24 md:pt-28 bg-richEbony text-softIvory transition-opacity duration-500 ease-in-out">
                {children}
            </main>

            {/* Elegant Footer */}
            <Footer />
        </>
    );
}
