'use client';
import React, { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserSchema } from '@/lib/schemas/users';
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
import { PasswordInput } from '@/components/shared/inputs/PasswordInput';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ServerResponse } from '@/lib/types';
import { loginUser } from '@/server/services/users';
import { User } from '@/lib/types/users';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import LoginErrorComponent from '@/components/auth/components/LoginErrorComponent';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginUserSchema>) => {
    setError(null);
    startTransition(async () => {
      try {
        const response: ServerResponse<User> = await loginUser(data);
        if (response.ok) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          router.push("/");
          router.refresh();
        } else {
          setError(response.error as string);
        }
      } catch (error: any) {
        setError(error as string);
      }
    });
  };

  // @ts-ignore
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-[100%] gap-y-0 mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} id={'loginEmail'} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-[100%] gap-y-0">
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          href={'/request-reset-password'}
          className="text-sm -mt-2 text-primary"
        >
          Mot de passe oublié ?
        </Link>
        <LoginErrorComponent error={error} />
        <Button
          type="submit"
          className="md:px-16 w-full gap-x-2 mt-4"
          disabled={isPending}
        >
          Se connecter
          {isPending && <LoadingSpinner size={15} />}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
