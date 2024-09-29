import { User } from '@/lib/types/users';
import { omit } from 'ramda';
import { Cabinet } from '@/lib/types/cabinet';
import { Service } from '@/lib/types/services';

export const transformCurrentUser = (currentUser: User) => {
  const user: User = omit(['cabinet'], currentUser);
  const cabinet: Cabinet = currentUser.cabinet! as Cabinet;
  const users: User[] = cabinet.users! as User[];
  const services: Service[] = cabinet.services! as Service[];
  return {
    user,
    cabinet: omit(['users', 'services'], cabinet) as Cabinet,
    users,
    services
  };
}