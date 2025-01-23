// pages/contact.tsx
import Head from 'next/head';

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact Diamant-Rouge</title>
            </Head>
            <main className="p-8 max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif mb-6">Contact Us</h1>
                <p className="mb-4">
                    For bespoke inquiries, press opportunities, or assistance with your order,
                    feel free to reach out.
                </p>

                <div className="mb-8">
                    <h2 className="text-2xl font-serif mb-2">Our Atelier</h2>
                    <p>123 Rue de la Beauté, 75001 Paris, France</p>
                    <p>+33 (0)1 23 45 67 89</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 text-ebony"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 text-ebony"
                            placeholder="Your Email"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Message</label>
                        <textarea className="w-full p-2 text-ebony" rows={5}></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-crimson hover:bg-gold text-ivory py-2 px-4"
                    >
                        Send
                    </button>
                </form>
            </main>
        </>
    );
}
