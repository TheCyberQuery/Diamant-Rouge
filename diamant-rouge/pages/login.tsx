// pages/login.tsx
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (result?.error) {
            setError(result.error);
        } else {
            // redirect to home or user dashboard
            window.location.href = '/';
        }
    };

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Login to Diamant-Rouge</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" style={{ marginTop: '1rem' }}>Sign In</button>
            </form>
        </main>
    );
}
