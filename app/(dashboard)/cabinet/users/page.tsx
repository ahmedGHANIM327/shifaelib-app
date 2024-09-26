'use client';

import React, { useEffect } from 'react';
import { UsersPageHeader } from '@/components/dashboard/user/components/UsersPageHeader';
import { Card } from '@/components/ui/card';
import useUserStore from '@/stores/user';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { UsersColumns } from '@/components/dashboard/user/components/UsersColumns';
import DataTable from '@/components/shared/components/DataTable';

const Page = () => {

  const cabinetUsers = useUserStore((state) => state.cabinetUsers);
  const isCabinetUsersLoading = useUserStore(
    (state) => state.isCabinetUsersLoading,
  );
  const getCabinetUsers = useUserStore((state) => state.getCabinetUsers);

  useEffect(() => {
    getCabinetUsers();
  }, []);

  if(isCabinetUsersLoading || cabinetUsers.length === 0) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  return (
    <div>
      <UsersPageHeader />
      <Card className='p-4 min-h-[500px]'>
        <DataTable columns={UsersColumns as ColumnDef<RowData>[]} data={cabinetUsers || []} noDataText={`Pas d'utilisateurs`}/>
      </Card>
    </div>
  );
};

export default Page;