import React, { FC } from 'react';
import { User } from '@/lib/types/users';
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { convertGender, getFullName, getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserAccountStatus } from '@/components/dashboard/user/components/UserAccountStatus';

export const UserHoverCard:FC<{ user: User }> = ({ user }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className='px-0 w-fit underline text-foreground'>{getFullName(user)}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
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
      </HoverCardContent>
    </HoverCard>
  );
};