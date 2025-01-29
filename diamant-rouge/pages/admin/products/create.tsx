import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function CreateProductPage() {
    const router = useRouter();
    const [sku, setSku] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [enName, setEnName] = useState('');
    const [enDesc, setEnDesc] = useState('');

    // Add other languages if needed
    // const [frName, setFrName] = useState('');
    // const [frDesc, setFrDesc] = useState('');
    // const [arName, setArName] = useState('');
    // const [arDesc, setArDesc] = useState('');

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const response = await fetch('/api/admin/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sku,
                basePrice: parseFloat(basePrice),
                translations: [
                    {
                        language: 'en',
                        name: enName,
                        description: enDesc,
                    },
                    // Include fr/ar if needed
                ],
            }),
        });
        if (response.ok) {
            router.push('/admin/products');
        } else {
            console.error('Failed to create product');
        }
    }

    return (
        <section className="p-8">
            <h1 className="text-3xl font-serif mb-4">Create Product</h1>
            <form onSubmit={handleCreate} className="max-w-md space-y-4">
                <div>
                    <label className="block mb-1">SKU</label>
                    <input
                        type="text"
                        className="w-full p-2 text-ebony"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1">Base Price</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full p-2 text-ebony"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                    />
                </div>
                <hr />
                <h3 className="text-xl font-serif">English Translation</h3>
                <div>
                    <label className="block mb-1">Name (EN)</label>
                    <input
                        type="text"
                        className="w-full p-2 text-ebony"
                        value={enName}
                        onChange={(e) => setEnName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1">Description (EN)</label>
                    <textarea
                        className="w-full p-2 text-ebony"
                        rows={4}
                        value={enDesc}
                        onChange={(e) => setEnDesc(e.target.value)}
                    />
                </div>
                {/* Additional fields for FR / AR if needed */}
                <button type="submit" className="bg-crimson text-ivory px-4 py-2 hover:bg-gold">
                    Create
                </button>
            </form>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session || session.user.role !== 'admin') {
        return {
            redirect: { destination: '/', permanent: false },
        };
    }
    return { props: {} };
};
