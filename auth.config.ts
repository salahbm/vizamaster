import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import { DB } from '@/lib/db';
import { authSchema } from '@/app/[locale]/(auth)/_components/user-auth-form';

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = authSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await DB.user.findUnique({ where: { email } });

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
