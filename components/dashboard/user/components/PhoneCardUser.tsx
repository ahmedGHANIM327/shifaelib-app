import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserAccountStatus } from '@/components/dashboard/user/components/UserAccountStatus';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from '@/lib/types/users';
import { convertGender, getFullName, getInitials } from '@/lib/utils';

export const PhoneCardUser:FC<{user: User}> = ({ user }) => {
  return (
    <Card className='w-full rounded-md p-2'>
      <div className='flex flex-col items-center gap-x-3 mt-2'>
        <Avatar className="cursor-pointer">
          <AvatarImage src={''} alt="profile-photo" />
          <AvatarFallback className="bg-green-800 text-white">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-2 my-1 font-semibold">{getFullName(user)}</h2>
        <UserAccountStatus status={user.status} />
      </div>
      <div className='flex justify-between mt-4 px-2 gap-y-2 gap-x-4 flex-wrap'>
        <div>
          <p className='font-semibold'>Genre</p>
          <p>{convertGender(user.gender)}</p>
        </div>
        <div>
          <p className='font-semibold'>E-mail</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className='font-semibold'>Phone</p>
          <p>{user.phone || '-'}</p>
        </div>
      </div>
      {!user.isOwner && <div className='flex justify-end'>
        <Button variant={'link'} className='text-destructive underline'>
          Supprimer
        </Button>
        <Button variant={'link'} className='underline'>
          Modifier
        </Button>
      </div>}
    </Card>
  );
};
