'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updatePasswordUserSchema } from '@/lib/schemas/users';
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
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import useUserStore from '@/stores/user';
import { updateCurrentPasswordUser } from '@/server/services/users';
import { UpdatePasswordUserInput, User } from '@/lib/types/users';
import { toast } from 'react-toastify';

export const UpdatePasswordUserForm = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof updatePasswordUserSchema>>({
    resolver: zodResolver(updatePasswordUserSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof updatePasswordUserSchema>) => {
    startTransition(async () => {
      try {
        const response = await updateCurrentPasswordUser(data as UpdatePasswordUserInput);
        if(response.ok) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          setCurrentUser(response.data as User);
          // @ts-ignore
          toast.success('Votre mot de passe est mis à jour avec succès.');
        } else {
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      } finally {
        setIsDialogOpen(false);
      }
    });
  };

  useEffect(() => {
    console.log('current user', currentUser);
    if(currentUser.isTemporaryPassword) {
      setIsDialogOpen(true);
    }
  }, [currentUser]);

  // @ts-ignore
  const password = form.watch('password');

  /* const FormInputs = () => {
    // @ts-ignore
    return (<div className="flex flex-wrap md:gap-x-[2%] gap-y-4 mb-2">
      <div className="w-full">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="md:w-[49%] w-[100%] gap-y-0">
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
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
    </div>);
  } */

  // @ts-ignore
  /* const FormInputs = () => (
    <DialogFormContainer>
      <div className="flex flex-wrap md:gap-x-[2%] gap-y-4 mb-2">
        <div className="w-full">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                <FormLabel>Mot de passe actuel</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Mot de passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
    </DialogFormContainer>
  ); */

  // @ts-ignore
  /* const formCard = (
    <Card>
      <DialogFormTitle title={'Mettre à jour votre mot de passe temporaire'} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInputs />
          <DialogFormActions>
            <Button type="submit" className="md:px-16 md:w-fit w-full gap-x-2">
              Mettre à jour
            </Button>
            <Button type="submit" className="md:px-16 md:w-fit w-full gap-x-2">
              Mettre à jour
            </Button>
          </DialogFormActions>
        </form>
      </Form>
    </Card>
  ); */

  // @ts-ignore
  /* const formDialog = (
    <AlertDialog open={true}>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogFormTitle
              title={'Mettre à jour votre mot de passe temporaire'}
            />
            <FormInputs />
            <DialogFormActions>
              <Button
                variant={'destructive'}
                className="md:px-16 md:w-fit w-full gap-x-2"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="md:px-16 md:w-fit w-full gap-x-2"
              >
                Mettre à jour
              </Button>
            </DialogFormActions>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  ); */

  // @ts-ignore
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogFormTitle
              title={'Mettre à jour votre mot de passe temporaire'}
            />
            <div className='px-4 py-2'>
              <div className="flex flex-wrap md:gap-x-[2%] gap-y-4 mb-2">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                        <FormLabel>Mot de passe actuel</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="Mot de passe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
            </div>
            <DialogFormActions>
              <Button
                variant={'secondary'}
                className="md:px-16 md:w-fit w-full gap-x-2"
                onClick={()=>setIsDialogOpen(false)}
              >
                Pas maintenant
              </Button>
              <Button
                type="submit"
                className="md:px-16 md:w-fit w-full gap-x-2"
                disabled={isPending}
              >
                Mettre à jour
                {isPending && <LoadingSpinner size={14}/>}
              </Button>
            </DialogFormActions>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
