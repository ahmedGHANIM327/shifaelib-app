import { auth } from '@/auth';

export const validateAuthSession = async () => {
  const session = await auth();
  if (!session?.user || !session.user.id) {
    throw new Error('INVALID_SESSION');
  }
  return session;
};
