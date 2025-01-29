// pages/test-auth.tsx
import { useState } from 'react';

export default function TestAuthPage() {
    const [result, setResult] = useState('');

    async function handleTestAuth() {
        setResult('Testing...');
        try {
            const res = await fetch('/api/test-auth', {
                method: 'GET', // or POST if you want to mirror your place-order approach
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // ensure cookies are sent
            });
            if (!res.ok) {
                const data = await res.json();
                setResult(`Error: ${res.status} ${data?.error || ''}`);
            } else {
                const data = await res.json();
                setResult(`Success! ${JSON.stringify(data, null, 2)}`);
            }
        } catch (err) {
            setResult(`Fetch error: ${String(err)}`);
        }
    }

    return (
        <main className="p-4">
            <h1>Test Auth Page</h1>
            <button
                onClick={handleTestAuth}
                className="bg-crimson text-ivory px-4 py-2"
            >
                Test Session
            </button>
            <pre className="mt-4 bg-gray-100 text-black p-2">
        {result || 'No result yet.'}
      </pre>
        </main>
    );
}
