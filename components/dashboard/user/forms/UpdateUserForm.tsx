'use client';
import React, { FC, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateUserSchema } from '@/lib/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { CreateUserInput, UpdateUserInput, User } from '@/lib/types/users';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AccountStatusToggle } from '@/components/dashboard/user/components/AccountStatusToggle';
import useUserStore from '@/stores/user';
import { createUser, updateUser } from '@/server/services/users';

export const UpdateUserForm:FC<{ user:User }> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const updateCabinetUser = useUserStore((state) => state.updateCabinetUser);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      status: user.status,
      email: user.email,
      phone: user.phone
    }
  });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    startTransition(async () => {
      try {
        const response = await updateUser(user.id, data as UpdateUserInput);
        if(response.ok) {
          updateCabinetUser(response.data as User);
          form.reset();
          setIsDialogOpen(false);
          // @ts-ignore
          toast.success('Utilisateur mis à jour avec succès');
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

  const handleCancel = () => {
    setIsDialogOpen(false);
  }

  // @ts-ignore
  return (<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <AlertDialogTrigger>
      <Button className="rounded-full h-5 w-5 p-0 text-primary" variant={'ghost'}>
        <PencilIcon size={15} />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
      <DialogFormTitle
        title={'Mettre à jour cet utilisateur'}
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
                    <Select onValueChange={field.onChange} defaultValue={user.gender}>
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
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                    <FormLabel>Statut</FormLabel>
                    <FormControl>
                      <AccountStatusToggle
                        value={user.status}
                        onChange={field.onChange}
                      />
                    </FormControl>
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
              Mettre à jour
              {isPending && <LoadingSpinner size={14}/>}
            </Button>
          </DialogFormActions>
        </form>
      </Form>
    </AlertDialogContent>
  </AlertDialog>)
};