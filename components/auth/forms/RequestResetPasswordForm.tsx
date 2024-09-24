'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { requestResetPasswordSchema } from '@/lib/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { ServerResponse } from '@/lib/types';
import { requestResetPassword } from '@/server/services/users';
import { DialogToaster } from '@/components/shared/components/DialogToaster';
import { REQUEST_RESET_PASSWORD_SUCCESS } from '@/lib/constants/textes/auth';
import { toast } from 'react-toastify';
import { SendIcon } from 'lucide-react';

const RequestResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof requestResetPasswordSchema>>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof requestResetPasswordSchema>) => {
    startTransition(async () => {
      try {
        const response: ServerResponse = await requestResetPassword(data);
        if (response.ok) {
          setIsDialogOpen(true);
        } else {
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  };

  // @ts-ignore
  return (
    <>
      <DialogToaster
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        description={REQUEST_RESET_PASSWORD_SUCCESS}
        icon={<SendIcon className="text-green-700" size={45} />}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[100%] gap-y-0">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-y-2 gap-x-2 justify-end mt-4">
            <Button
              type="submit"
              className="md:px-16 w-full gap-x-2"
              disabled={isPending}
            >
              Envoyer
              {isPending && <LoadingSpinner size={18} />}
            </Button>
            <Link href="/login">
              <Button
                variant="link"
                className="md:px-16 w-full border-0 text-destructive"
              >
                Annuler
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-center">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Vous n’avez pas reçu le ?{' '}
            <Button variant="link" className="p-0 text-primary" type="submit">
              Renvoyer le lien
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RequestResetPasswordForm;
