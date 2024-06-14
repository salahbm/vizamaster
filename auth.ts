import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';

export const { auth, handlers, signIn, signOut } = NextAuth(() => {
  return {
    secret: process.env.AUTH_SECRET,
    debug: true,
    basePath: '/api/auth',
    providers: [
      google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
  };
});
