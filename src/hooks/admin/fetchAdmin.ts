import { auth } from '../../../auth';
import { DB } from '@/lib/db';

export const handleAdmin = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error(' Admin not found');
  }

  const getAdmin = await DB.admin.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  if (!getAdmin) {
    throw new Error(' Admin not found');
  }
  const isAdmin = getAdmin.isAdmin;
  console.log(`isAdmin:`, isAdmin);

  // if (!isAdmin) {
  //   throw new Error(' Admin not found');
  // }
  return isAdmin;
};
