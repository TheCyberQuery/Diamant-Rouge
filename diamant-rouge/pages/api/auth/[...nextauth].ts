// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

/**
 * Create a single Prisma client instance to share across modules.
 */
console.log("DEBUG: NEXTAUTH_SECRET =>", process.env.NEXTAUTH_SECRET);
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or password');
                }
                // Find user by email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error('No user found');
                }

                // Check hashed password with bcrypt
                const isValid = await compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error('Invalid credentials');
                }

                // Return user object if login is successful
                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                };
            },
        }),
    ],
    callbacks: {
        // Add user info (role, etc.) to the JWT
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.email = user.email;
            }
            return token;
        },
        // Make the role available in session
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as number;
                session.user.role = token.role as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login', // Our custom login page
        // optional: signOut, error, etc.
    },
};

export default NextAuth(authOptions);
