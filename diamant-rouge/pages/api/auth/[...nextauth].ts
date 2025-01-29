import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
    cookies: {
        sessionToken: {
            name: 'nextauth_dev.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: false,
            },
        },
        callbackUrl: {
            name: 'nextauth_dev.callback-url',
            options: {
                sameSite: 'lax',
                path: '/',
                secure: false,
            },
        },
        csrfToken: {
            name: 'nextauth_dev.csrf-token',
            options: {
                httpOnly: false,
                sameSite: 'lax',
                path: '/',
                secure: false,
            },
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Missing email or password');
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user) throw new Error('No user found');
                const isValid = await compare(credentials.password, user.password);
                if (!isValid) throw new Error('Invalid credentials');
                return {
                    id: user.id.toString(), // Convert id to string
                    email: user.email,
                    role: user.role,
                    name: user.name,
                } as User; // Cast to User type
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};

export default NextAuth(authOptions);