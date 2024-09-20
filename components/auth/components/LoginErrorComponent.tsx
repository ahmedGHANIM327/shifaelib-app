import React, { FC } from 'react';
import { loginErrors } from '@/lib/constants/textes/auth';

type LoginErrorProps = {
  error: string | null;
};

type ErrorKey =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_BLOCKED'
  | 'ACCOUNT_DELETED'
  | 'CABINET_INACTIF'
  | 'CABINET_BLOCKED'
  | 'CABINET_DELETED';

const LoginErrorComponent: FC<LoginErrorProps> = ({ error }) => {
  if (!error) return <></>;
  return (
    <div className="text-sm w-full bg-red-100 text-red-700 text-center mt-4 mb-0 py-4 font-semibold rounded-md px-2">
      {loginErrors[error as ErrorKey] || loginErrors.INVALID_CREDENTIALS}
    </div>
  );
};

export default LoginErrorComponent;
