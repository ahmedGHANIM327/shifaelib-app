import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { Input } from '@/components/ui/input';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { createUserSchema } from '@/lib/schemas/users';
import { PasswordInput } from '@/components/shared/inputs/PasswordInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PasswordCheck } from '@/components/shared/components/PasswordCheck';
import { CreateUserInput, User } from '@/lib/types/users';
import { createUser } from '@/server/services/users';
import useUserStore from '@/stores/user';

export const CreateNewUserForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const addCabinetUser = useUserStore((state) => state.addCabinetUser);

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: z.infer<typeof createUserSchema>) => {
    startTransition(async () => {
      try {
        const response = await createUser(data as CreateUserInput);
        if(response.ok) {
          addCabinetUser(response.data as User);
          form.reset();
          setIsDialogOpen(false);
          // @ts-ignore
          toast.success('Utilisateur crée avec succès');
        } else {
          if (response.error === 'USER_EMAIL_ALREADY_EXISTS') {
            // @ts-ignore
            toast.error('Un utilisateur avec la même adresse email exist déjà. Veuillez réessayer.');
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

  const handleCancel = () => {
    setIsDialogOpen(false);
  }

  // @ts-ignore
  const password = form.watch('password');
  // @ts-ignore
  const email = form.watch('email');

  // @ts-ignore
  return (<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <AlertDialogTrigger className={'w-full'}>
      <Button className='gap-x-2 w-full'>
        <Plus />
        Créer un utilisateur
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
      <DialogFormTitle
        title={'Créer un nouveau utilisateur'}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogFormContainer className='flex flex-col gap-4 pt-0'>
            <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">Homme</SelectItem>
                        <SelectItem value="F">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                    <FormLabel>Numèro de téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="Numèro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
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
              <PasswordCheck email={email} password={password} className='-mt-2'/>
            </div>
          </DialogFormContainer>
          <DialogFormActions>
            <Button
              variant={'secondary'}
              className="md:px-16 md:w-fit w-full gap-x-2"
              onClick={handleCancel}
              type={'button'}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="md:px-16 md:w-fit w-full gap-x-2"
              disabled={isPending}
            >
              Créer
              {isPending && <LoadingSpinner size={14} />}
            </Button>
          </DialogFormActions>
        </form>
      </Form>
    </AlertDialogContent>
  </AlertDialog>)
};