import { DefaultSession, DefaultUser } from 'next-auth';

// Adding 'role' to session.user and User
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: string;
            email: string;
            name?: string;
        } & DefaultSession['user'];
    }

    interface User extends DefaultUser {
        id: string;
        role: string;
    }
}