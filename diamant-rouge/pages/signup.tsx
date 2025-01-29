import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSignUp(e: FormEvent) {
        e.preventDefault();
        setErrorMsg('');

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password }),
        });

        if (response.ok) {
            // Automatically redirect to login or auto-login
            router.push('/login');
        } else {
            const data = await response.json();
            setErrorMsg(data.error || 'Failed to sign up');
        }
    }

    return (
        <section className="p-8 max-w-md mx-auto text-ivory">
            <h1 className="text-3xl font-serif mb-4">Create an Account</h1>
            {errorMsg && <p className="mb-2 text-red-500">{errorMsg}</p>}

            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label className="block mb-1">Full Name</label>
                    <input
                        type="text"
                        className="w-full p-2 text-ebony"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 text-ebony"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                    />
                </div>
                <div>
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 text-ebony"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                    />
                </div>
                <button type="submit" className="bg-crimson hover:bg-gold text-ivory py-2 px-4">
                    Sign Up
                </button>
            </form>
        </section>
    );
}
