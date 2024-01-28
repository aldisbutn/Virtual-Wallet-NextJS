import { executeQuery, getConnection } from '@/services/db';
import { UserType } from '@/types/userType';
import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { NextApiHandler } from 'next/types';
import CredentialsProvider from 'next-auth/providers/credentials';

type Credentials = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // Function for authorization
      async authorize(credentials: Credentials) {
        const { email, password } = credentials;
        await getConnection();
        try {
          // Find user by email
          const user = (await executeQuery({
            query: 'SELECT * FROM users WHERE email = ?',
            values: [email],
          })) as UserType[];

          // If no user found, throw error
          if (user.length === 0) {
            throw new Error('No user found');
          }

          // Compare password if user exists
          const isPasswordCorrect = await compare(password, user[0].password);

          // If password is correct, return user
          if (isPasswordCorrect) {
            return {
              id: user[0].userID,
              email: user[0].email,
              name: user[0].firstName,
            };
          } else {
            throw new Error('Incorrect password');
          }
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },

  session: {
    strategy: 'jwt',
  },
  // Keep user logged in for 7 days
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};

const handler: NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };
