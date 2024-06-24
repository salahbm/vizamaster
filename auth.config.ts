import { authSchema } from '@/app/[locale]/(auth)/_components/user-auth-form';
// auth.config.ts
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { DB } from '@/lib/db';

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials as any;

        // Check if user exists
        const user = await DB.admin.findUnique({
          where: { email },
        });

        if (user) {
          // Verify password
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) return null;
          return user;
        } else {
          // Sign-up new user
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await DB.admin.create({
            data: {
              email,
              password: hashedPassword,
            },
          });
          return newUser;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
};
