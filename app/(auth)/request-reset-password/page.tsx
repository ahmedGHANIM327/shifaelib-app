import React from 'react';
import AuthFormCard from '@/components/auth/components/AuthFormCard';
import RequestResetPasswordForm from '@/components/auth/forms/RequestResetPasswordForm';

const Page = () => {
  return (
    <AuthFormCard
      title={'Nous allons vous envoyer un lien par email.'}
      description={
        'Merci de renseigner votre adresse email afin de réinitialiser votre mot de passe.'
      }
      containerClass={'md:px-16 px-6 md:max-w-[500px] max-w-[400px]'}
    >
      <RequestResetPasswordForm />
    </AuthFormCard>
  );
};

export default Page;
