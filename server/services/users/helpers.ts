import { User } from '@/lib/types/users';

export const checkLoginStatus = (user: User) => {
  const userStatus = user.status;
  const cabinetStatus = user.cabinet!.status;
  if (cabinetStatus === 'ACTIF') {
    if (userStatus !== 'ACTIF') {
      throw new Error(`ACCOUNT_${userStatus}`);
    }
  } else {
    throw new Error(`CABINET_${cabinetStatus}`);
  }
};
