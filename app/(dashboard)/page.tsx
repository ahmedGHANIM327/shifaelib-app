'use client';

import React from 'react';
import useUserStore from '@/stores/user';
import { getFullName } from '@/lib/utils';
import { LoadingSection } from '@/components/shared/components/LoadingSection';
import { NewUserAccount } from '@/lib/email-templates/new-user-account';
import { testSendingEmail } from '@/server/services/users';
import { Button } from '@/components/ui/button';

const Page = () => {
  const { isCurrentUserLoading, currentUser } = useUserStore((state) => state);

  const testEmail = async () => {
    await testSendingEmail();
  }

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
      <Button onClick={testEmail}>Send</Button>
    </div>
  );
};

export default Page;
