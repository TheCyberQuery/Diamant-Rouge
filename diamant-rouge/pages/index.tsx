// pages/index.tsx
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Diamant-Rouge | Luxury French Jewelry</title>
            </Head>
            <main style={{ textAlign: 'center', padding: '2rem' }}>
                <h1>Bienvenue à Diamant-Rouge</h1>
                <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
                    Explore the timeless brilliance of our exclusive collections.
                </p>
            </main>
        </>
    );
}
