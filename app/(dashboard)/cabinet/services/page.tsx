import React from 'react';
import { ServicesPageHeader } from '@/components/dashboard/services/components/ServicesPageHeader';
import { Card } from '@/components/ui/card';

const Page = () => {
  return (
    <div>
      <ServicesPageHeader />
      <Card className='p-4 min-h-[500px]'>
        services
      </Card>
    </div>
  );
};

export default Page;