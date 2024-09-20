import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/server/services/users';
import { User } from '@/lib/types/users';

// @ts-ignore
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/',
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const email = credentials?.email as string;

          const response = await getUserByEmail(email);

          if (!response.ok) {
            return null;
          }

          const user = response.data as User;

          return {
            id: user.id,
            email: user.email,
            cabinetId: user.cabinet?.id as string,
          };
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          cabinetId: user.cabinetId,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          cabinetId: token.cabinetId as string,
        },
      };
    },
  },
});
