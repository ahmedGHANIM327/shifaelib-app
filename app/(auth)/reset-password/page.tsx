import React from 'react';
import AuthFormCard from '@/components/auth/components/AuthFormCard';
import { ResetPasswordForm } from '@/components/auth/forms/ResetPasswordForm';

const Page = () => {
  return (
    <AuthFormCard
      title={'Mettre à jour votre mot de passe'}
      containerClass={'md:px-14 px-6 md:max-w-[750px]'}
    >
      <ResetPasswordForm />
    </AuthFormCard>
  );
};

export default Page;
