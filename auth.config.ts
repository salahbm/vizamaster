import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/',
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

// const authConfig = {
//   providers: [
//     CredentialProvider({
//       credentials: {
//         email: {
//           type: 'email',
//         },
//         password: {
//           type: 'password',
//         },
//       },
//       async authorize(credentials, req) {
//         const user = {
//           id: '1',
//           name: 'John',
//           email: credentials?.email as string,
//         };
//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/sign-in', //sig-in page
//     signOut: '/',
//   },
// } satisfies NextAuthConfig;

// export default authConfig;
