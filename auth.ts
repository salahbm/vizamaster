import NextAuth from 'next-auth';

import { authOptions } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authOptions,
});
