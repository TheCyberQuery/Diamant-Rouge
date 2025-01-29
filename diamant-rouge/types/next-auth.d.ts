import { DefaultSession } from 'next-auth';

// Adding 'role' to session.user
declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            role: string;
            email: string;
            name?: string;
        } & DefaultSession['user'];
    }
}
