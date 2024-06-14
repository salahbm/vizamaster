import CredentialProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';
import { NextRequest } from 'next/server';

export const { auth, handlers, signIn, signOut } = NextAuth(() => {
  return {
    secret: process.env.AUTH_SECRET,
    debug: true,
    // basePath: '/api/auth',
    providers: [
      // google({
      //   clientId: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // }),
      CredentialProvider({
        credentials: {
          email: {
            type: 'email',
          },
          password: {
            type: 'password',
          },
        },
        async authorize(
          credentials: Partial<Record<'email' | 'password', unknown>>,
          req: NextRequest
        ) {
          const user = {
            id: '1',
            name: 'John',
            email: credentials?.email as string,
          };
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        },
      }),
    ],
  };
});
