import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../lib/prisma';
import { compare } from 'bcryptjs'; // if you store hashed passwords

export default NextAuth({
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
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user) {
                    throw new Error('No user found');
                }

                // Compare password if hashed
                const isValid = await compare(credentials!.password, user.password);
                if (!isValid) {
                    throw new Error('Invalid credentials');
                }

                // Return user object with id converted to string
                return {
                    id: user.id.toString(), // Convert `id` to string
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
});