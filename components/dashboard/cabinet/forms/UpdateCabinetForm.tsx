'use client';

import React, { useState, useTransition } from 'react';
import useCabinetStore from '@/stores/cabinet';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCabinetSchema } from '@/lib/schemas/cabinet';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { updateCabinet } from '@/server/services/cabinet';
import { Cabinet, UpdateCabinetInput } from '@/lib/types/cabinet';
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
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { PencilIcon } from 'lucide-react';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';

export const UpdateCabinetForm = () => {

  const currentCabinet = useCabinetStore((state) => state.currentCabinet);
  const setCurrentCabinet = useCabinetStore((state) => state.setCurrentCabinet);
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    console.log('heeree');
    startTransition(async () => {
      try {
        const response = await updateCabinet(data as UpdateCabinetInput);
        if(response.ok) {
          setCurrentCabinet(response.data as Cabinet);
          setIsDialogOpen(false);
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

  const handleCancel = () => {
    setIsDialogOpen(false);
  }

  // @ts-ignore
  return (<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <AlertDialogTrigger>
      <Button>
        <PencilIcon size={13}/>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
      <DialogFormTitle
        title={'Mettre à jour votre cabinet'}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogFormContainer>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0 -mt-2">
                  <FormLabel>Nom du cabinet</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du cabinet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap md:gap-x-[2%] gap-y-4 my-2">
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
                  <FormItem className="w-[100%] gap-y-0 -my-2">
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
          </DialogFormContainer>
          <DialogFormActions>
            <Button
              variant={'secondary'}
              className="md:px-16 md:w-fit w-full gap-x-2"
              onClick={handleCancel}
              type={'button'}
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
  </AlertDialog>)
};