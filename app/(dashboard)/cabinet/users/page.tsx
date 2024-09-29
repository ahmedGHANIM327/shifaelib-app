'use client';

import React, { useEffect } from 'react';
import { UsersPageHeader } from '@/components/dashboard/user/components/UsersPageHeader';
import { Card } from '@/components/ui/card';
import useUserStore from '@/stores/user';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { UsersColumns } from '@/components/dashboard/user/components/UsersColumns';
import DataTable from '@/components/shared/components/DataTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { User } from '@/lib/types/users';
import { UserStatus } from '@/lib/types';
import { UserAccountStatus } from '@/components/dashboard/user/components/UserAccountStatus';
import { Button } from '@/components/ui/button';
import { PhoneCardUser } from '@/components/dashboard/user/components/PhoneCardUser';

const Page = () => {

  const cabinetUsers = useUserStore((state) => state.cabinetUsers);
  const isCurrentUserLoading = useUserStore((state) => state.isCurrentUserLoading);

  if(isCurrentUserLoading) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  return (
    <div>
      <UsersPageHeader />
      <Card className='p-4 min-h-[500px]'>
        <div className='hidden md:flex'>
          <DataTable columns={UsersColumns as ColumnDef<RowData>[]} data={cabinetUsers || []} noDataText={`Pas d'utilisateurs`}/>
        </div>
        <div className='md:hidden flex flex-col gap-4'>
          {cabinetUsers.map(user => <PhoneCardUser key={user.id} user={user} />)}
        </div>
      </Card>
    </div>
  );
};

export default Page;