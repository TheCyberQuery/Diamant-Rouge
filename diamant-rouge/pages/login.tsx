import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        setErrorMsg('');
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (result?.error) {
            setErrorMsg(result.error);
        } else {
            // If no error, we can redirect
            router.push('/');
        }
    }

    return (
        <section className="p-8 max-w-md mx-auto text-ivory">
            <h1 className="text-3xl font-serif mb-4">Login</h1>
            {errorMsg && <p className="mb-2 text-red-500">{errorMsg}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 text-ebony"
                        placeholder="name@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 text-ebony"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-crimson hover:bg-gold text-ivory py-2 px-4">
                    Sign In
                </button>
            </form>

            <p className="mt-4">
                Don&apos;t have an account?{' '}
                <a href="/signup" className="text-crimson hover:text-gold">
                    Sign up
                </a>
            </p>
        </section>
    );
}
