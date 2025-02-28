// components/Layout.tsx
import { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
    children: ReactNode;
    title?: string;
    description?: string;
};

export default function Layout({ children, title, description }: LayoutProps) {
    const router = useRouter();
    const isProductPage = router.pathname.startsWith("/products/");

    return (
        <>
            <Head>
                <title>
                    {title ? `${title} | Diamant-Rouge` : "Diamant-Rouge - Luxury Jewelry House"}
                </title>
                {description && <meta name="description" content={description} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            {/* Main container nearly full width (95% of viewport) */}
            <div className="w-full mx-auto px-20 md:px-15" style={{ maxWidth: "95%" }}>
                <main
                    className={`min-h-screen transition-opacity duration-500 ease-in-out ${
                        !!isProductPage ? "pt-24 md:pt-28" : ""
                    }`}
                >
                    {children}
                </main>
            <Footer />
            </div>

        </>
    );
}
