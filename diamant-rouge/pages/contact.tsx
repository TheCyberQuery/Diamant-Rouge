// pages/contact.tsx
import Head from "next/head";

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact Diamant-Rouge</title>
            </Head>
            <main className="section-light min-h-screen p-8 max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif text-brandGold mb-6">Contact Us</h1>
                <p className="mb-6 text-platinumGray leading-relaxed">
                    For bespoke inquiries, press opportunities, or assistance with your order, feel free to reach out.
                </p>

                <div className="mb-8 space-y-2">
                    <h2 className="text-2xl font-serif text-brandGold">Our Atelier</h2>
                    <p className="text-richEbony">123 Rue de la Beauté, 75001 Paris, France</p>
                    <p className="text-richEbony">+33 (0)1 23 45 67 89</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block mb-2 font-medium text-richEbony">Name</label>
                        <input
                            type="text"
                            className="input-field w-full"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-richEbony">Email</label>
                        <input
                            type="email"
                            className="input-field w-full"
                            placeholder="Your Email"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-richEbony">Message</label>
                        <textarea
                            className="input-field w-full h-32"
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>
                    <button type="submit" className="button-primary mt-4">
                        Send
                    </button>
                </form>
            </main>
        </>
    );
}
