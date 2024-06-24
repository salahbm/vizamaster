import bcrypt from 'bcryptjs';
import { DB } from '@/lib/db';
import credentials from 'next-auth/providers/credentials';

import { authSchema } from '@/app/[locale]/(auth)/_components/user-auth-form';
import { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(DB),
  session: { strategy: 'jwt' },
  providers: [
    credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials) {
        const validatedFields = authSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const user = await DB.admin.findUnique({ where: { email } });

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
};

export default authConfig;
