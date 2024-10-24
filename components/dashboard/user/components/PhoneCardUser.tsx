import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserAccountStatus } from '@/components/dashboard/user/components/UserAccountStatus';
import { Card } from '@/components/ui/card';
import { User } from '@/lib/types/users';
import { convertGender, getFullName, getInitials } from '@/lib/utils';
import { UpdateUserForm } from '@/components/dashboard/user/forms/UpdateUserForm';
import { DeleteUser } from '@/components/dashboard/user/components/DeleteUser';

export const PhoneCardUser:FC<{user: User}> = ({ user }) => {
  return (
    <Card className='w-full rounded-md p-2 relative overflow-hidden'>
      <div className='flex flex-col items-center gap-x-3 mt-2'>
        <Avatar className="cursor-pointer">
          <AvatarImage src={''} alt="profile-photo" />
          <AvatarFallback className="bg-green-800 text-white">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-2 my-1 font-semibold text-[15px]">{getFullName(user, true)}</h2>
        <UserAccountStatus status={user.status} />
      </div>
      <div className='flex justify-between mt-4 px-2 gap-y-2 gap-x-4 flex-wrap sm:text-sm'>
        <div className={'text-sm'}>
          <p className='font-semibold'>E-mail</p>
          <p>{user.email}</p>
        </div>
        <div className={'text-sm'}>
          <p className='font-semibold'>Phone</p>
          <p>{user.phone || '-'}</p>
        </div>
      </div>
      {!user.isOwner && <div className="gap-x-2 flex justify-center flex-col absolute top-2 right-2">
        <UpdateUserForm
          user={user}
        />
        <DeleteUser
          user={user}
        />
      </div>}
    </Card>
  );
};
