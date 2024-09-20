import { Check } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react';
import { validatePassword } from '@/lib/utils';

export const PasswordCheck: FC<{ password: string; email: string | null }> = ({
  password,
  email,
}) => {
  const [validePassword, setValidePassword] = useState(
    validatePassword(password, email),
  );

  useEffect(() => {
    setValidePassword(validatePassword(password, email));
  }, [email, password]);

  return (
    <div className="bg-accent border-primary py-2 px-4 border-1">
      <p className="text-sm text-muted-foreground">
        Pour garantir la sécurité de votre compte, veuillez respecter les
        critères suivants lors du choix de votre mot de passe :
      </p>
      <ul className="mt-2">
        <li
          className={`flex items-center text-sm gap-x-2 text-primary ${validePassword.isValidLength && '!text-green-600'}`}
        >
          <Check size={14} /> Longueur minimale de 8 caractères.
        </li>
        <li
          className={`flex items-center text-sm gap-x-2 text-primary ${validePassword.isNotEmail && '!text-green-600'}`}
        >
          <Check size={14} /> Ne doit pas être identique à votre adresse e-mail.
        </li>
        <li
          className={`flex items-center text-sm gap-x-2 text-primary ${validePassword.hasUppercase && '!text-green-600'}`}
        >
          <Check size={14} /> Au moins une lettre majuscule.
        </li>
        <li
          className={`flex items-center text-sm gap-x-2 text-primary ${validePassword.hasLowercase && '!text-green-600'}`}
        >
          <Check size={14} /> Au moins une lettre minuscule.
        </li>
        <li
          className={`flex items-center text-sm gap-x-2 text-primary ${validePassword.hasDigit && '!text-green-600'}`}
        >
          <Check size={14} /> Au moins un chiffre.
        </li>
        <li
          className={`flex items-center text-sm gap-x-2 text-primary ${validePassword.hasSpecialChar && '!text-green-600'}`}
        >
          <Check size={14} /> Au moins un caractère spécial (parmi ! @ # $ % &
          ).
        </li>
      </ul>
    </div>
  );
};
