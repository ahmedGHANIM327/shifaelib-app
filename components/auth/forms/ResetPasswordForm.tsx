'use client';

import React, { useEffect, useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { resetPasswordUserSchema } from '@/lib/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/shared/inputs/PasswordInput';
import { PasswordCheck } from '@/components/shared/components/PasswordCheck';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ServerResponse } from '@/lib/types';
import { resetPasswordUser } from '@/server/services/users';
import { toast } from 'react-toastify';
import { RESET_PASSWORD_INVALID_TOKEN, RESET_PASSWORD_SUCCESS } from '@/lib/constants/textes/auth';
import { DialogToaster } from '@/components/shared/components/DialogToaster';
import { CircleX, CircleCheck } from 'lucide-react';
import Link from 'next/link';

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');
  const [isDialogErrorOpen, setIsDialogErrorOpen] = useState(false);
  const [isDialogSuccessOpen, setIsDialogSuccessOpen] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordUserSchema>>({
    resolver: zodResolver(resetPasswordUserSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordUserSchema>) => {
    startTransition(async () => {
      try {
        const response: ServerResponse = await resetPasswordUser(data, token);
        if (response.ok) {
          setIsDialogSuccessOpen(true);
        } else {
          if (response.error === 'INVALID_TOKEN') {
            setIsDialogErrorOpen(true);
          } else {
            // @ts-ignore
            toast.error('Une erreur est servenue. Veuillez réessayer.');
          }
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  };

  // @ts-ignore
  const password = form.watch('password');

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const currentEmail = queryParameters.get('email');
    const currentToken = queryParameters.get('token') || '';
    setEmail(currentEmail);
    setToken(currentToken);
  }, []);

  // @ts-ignore
  return (
    <>
      <DialogToaster
        isOpen={isDialogErrorOpen}
        setIsOpen={setIsDialogErrorOpen}
        description={RESET_PASSWORD_INVALID_TOKEN}
        icon={<CircleX size={45} className="text-destructive" />}
        actions={
          <>
            <Link href={'/request-reset-password'}>
              <Button className="px-12">Renvoyer le lien</Button>
            </Link>
          </>
        }
      />
      <DialogToaster
        isOpen={isDialogSuccessOpen}
        setIsOpen={setIsDialogSuccessOpen}
        description={RESET_PASSWORD_SUCCESS}
        icon={<CircleCheck size={45} className="text-green-700" />}
        actions={
          <>
            <Link href={'/login'}>
              <Button className="px-12">Se connecter</Button>
            </Link>
          </>
        }
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-wrap md:gap-x-[2%] gap-y-4 mb-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Nouveau mot de passe</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Mot de passe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirmer le mot de passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <PasswordCheck email={email} password={password} />
          <Button
            type="submit"
            className="md:px-16 w-full gap-x-2 mt-2"
            disabled={isPending}
          >
            Mettre à jour
            {isPending && <LoadingSpinner size={15} />}
          </Button>
        </form>
      </Form>
    </>
  );
};
