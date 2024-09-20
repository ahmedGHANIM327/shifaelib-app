import React from 'react';
import AuthFormCard from '@/components/auth/components/AuthFormCard';
import LoginForm from '@/components/auth/forms/LoginForm';

const Page = () => {
  return (
    <AuthFormCard
      title={'Connectez-vous à votre espace'}
      containerClass={'md:px-16 px-6 md:max-w-[500px]'}
    >
      <LoginForm />
    </AuthFormCard>
  );
};

export default Page;
