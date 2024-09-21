import React, { useTransition } from 'react';
import useCabinetStore from '@/stores/cabinet';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCabinetSchema } from '@/lib/schemas/cabinet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CardTitle } from '@/components/shared/components/CardTitle';
import { toast } from 'react-toastify';
import { updateCabinet } from '@/server/services/cabinet';
import { Cabinet, UpdateCabinetInput } from '@/lib/types/cabinet';
import {Hospital} from "lucide-react";
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CabinetTypeSelect } from '@/components/shared/inputs/CabinetTypeSelect';

export const UpdateCabinetForm = () => {

  const currentCabinet = useCabinetStore((state) => state.currentCabinet);
  const setCurrentCabinet = useCabinetStore((state) => state.setCurrentCabinet);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateCabinetSchema>>({
    resolver: zodResolver(updateCabinetSchema),
    defaultValues: {
      name: currentCabinet.name,
      email: currentCabinet.email,
      phone: currentCabinet.phone,
      speciality: currentCabinet.speciality,
      address: currentCabinet.address,
      description: currentCabinet.description
    },
  });

  const onSubmit = async (data: z.infer<typeof updateCabinetSchema>) => {
    startTransition(async () => {
      try {
        const response = await updateCabinet(data as UpdateCabinetInput);
        if(response.ok) {
          setCurrentCabinet(response.data as Cabinet);
          // @ts-ignore
          toast.success('Votre cabinet profile est mis à jour avec succès.');
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
              title={'Mettre à jour votre cabinet'}
              icon={<Hospital />}
              className={'mb-0'}
            />
            <Button
              type={'submit'}
              disabled={isPending}
              className='px-16 md:flex hidden gap-x-2'
            >
              Mettre à jour
              {isPending && <LoadingSpinner size={14} />}
            </Button>
          </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Nom du cabinet</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du cabinet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
              <FormField
                control={form.control}
                name="speciality"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                    <FormLabel>Spécialité</FormLabel>
                    <FormControl>
                      <CabinetTypeSelect
                        handleChange={field.onChange}
                        type={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <FormLabel>L'adresse du cabinet</FormLabel>
                    <FormControl>
                      <Input placeholder="L'adresse du cabinet" {...field} />
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-[100%] gap-y-0">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
              {isPending && <LoadingSpinner size={14} />}
            </Button>
        </form>
      </Form>
    </Card>
);
};