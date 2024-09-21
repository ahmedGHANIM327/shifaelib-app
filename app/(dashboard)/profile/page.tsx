'use client';

import React from 'react';
import { UpdateCurrentUserProfile } from '@/components/dashboard/user/forms/UpdateCurrentUserProfile';
import { UpdatePasswordUserForm } from '@/components/dashboard/user/forms/UpdatePasswordUserForm';
import useUserStore from '@/stores/user';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';

const Page = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const isCurrentUserLoading = useUserStore((state) => state.isCurrentUserLoading);

  if(isCurrentUserLoading || !currentUser.id) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  return <div className={'flex flex-col gap-4'}>
    <UpdateCurrentUserProfile />
    <UpdatePasswordUserForm type={'card'}/>
  </div>;
};

export default Page;
