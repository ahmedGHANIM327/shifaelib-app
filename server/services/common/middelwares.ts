import { auth } from '@/auth';
import { Session } from 'next-auth';

export const isAuth = async (): Promise<Session> => {
  const session = await auth();
  console.log('session', session);
  if (!session || !session?.user || !session.user.id) {
    throw new Error('INVALID_SESSION');
  }
  return session;
};

export const isOwner = async (): Promise<Session> => {
  const session = await isAuth();
  if (!session.user.isOwner) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}