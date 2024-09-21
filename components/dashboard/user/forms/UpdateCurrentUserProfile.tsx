'use client';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateCurrentUserSchema, updatePasswordUserSchema } from '@/lib/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import useUserStore from '@/stores/user';
import { UpdateCurrentUserInput, UpdatePasswordUserInput, User } from '@/lib/types/users';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CardTitle } from '@/components/shared/components/CardTitle';
import {CircleUser} from "lucide-react";
import { updateCurrentPasswordUser, updateCurrentUser } from '@/server/services/users';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';

export const UpdateCurrentUserProfile = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateCurrentUserSchema>>({
    resolver: zodResolver(updateCurrentUserSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: currentUser.phone,
      gender: currentUser.gender
    },
  });

  const onSubmit = async (data: z.infer<typeof updatePasswordUserSchema>) => {
    startTransition(async () => {
      try {
        const response = await updateCurrentUser(data as UpdateCurrentUserInput);
        if(response.ok) {
          setCurrentUser(response.data as User);
          console.log('updatedUser', response.data);
          // @ts-ignore
          toast.success('Votre profile est mis à jour avec succès.');
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
    <Card className='p-4 pt-0 md:pb-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className='flex items-center w-full'>
            <CardTitle
              title={'Mettre à jour votre profil utilisateur'}
              icon={<CircleUser />}
              className={'mb-0'}
            />
            <Button
              type={'submit'}
              disabled={isPending}
              className='px-16 md:flex hidden gap-x-2'
            >
              Mettre à jour
              {isPending && <LoadingSpinner size={14}/>}
            </Button>
          </div>
          <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
            <FormField
              control={form.control}
              name="gender"
              render={({field}) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Genre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Genre"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">Homme</SelectItem>
                      <SelectItem value="F">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
            <FormField
              control={form.control}
              name="lastName"
              render={({field}) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({field}) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Prénom" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Numèro de téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Numèro de téléphone" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button
            type={'submit'}
            disabled={isPending}
            className='w-full md:hidden gap-x-2'
          >
            Mettre à jour
            {isPending && <LoadingSpinner size={14}/>}
          </Button>
        </form>
      </Form>
    </Card>
  );
};