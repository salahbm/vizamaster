import { auth } from '../../../auth';
import { DB } from '@/lib/db';

export const handleAdmin = async () => {
  const session = await auth();

  if (!session?.user) {
    return false;
  }

  const getAdmin = await DB.admin.findUnique({
    where: {
      email: session.user.email as string,
    },
    select: {
      isAdmin: true,
    },
  });

  if (!getAdmin) return false;
  const isAdmin = getAdmin.isAdmin;

  return isAdmin;
};
