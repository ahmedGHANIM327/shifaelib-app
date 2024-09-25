'use client';

import React from 'react';
import useUserStore from '@/stores/user';
import { getFullName } from '@/lib/utils';
import { LoadingSection } from '@/components/shared/components/LoadingSection';

const Page = () => {
  const { isCurrentUserLoading, currentUser } = useUserStore((state) => state);

  return (
    <div>
      <LoadingSection
        loading={isCurrentUserLoading || !currentUser.id}
        loadingClassName={'w-full h-[70px] bg-white'}
      >
        <h1 className="md:text-5xl text-2xl font-semibold md:my-4 my-2">
          Bonjour{' '}
          <span className="text-primary">{getFullName(currentUser)}</span> 👋
        </h1>
      </LoadingSection>
    </div>
  );
};

export default Page;
