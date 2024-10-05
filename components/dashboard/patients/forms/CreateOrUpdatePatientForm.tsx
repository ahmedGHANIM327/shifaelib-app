'use client';

import React, { FC, useState, useTransition } from 'react';
import { CreateOrUpdatePatientInput, Patient } from '@/lib/types/patients';
import { createOrUpdatePatientSchema } from '@/lib/schemas/patients';
import { z } from 'zod';
import { PencilIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createPatient, updatePatient } from '@/server/services/patients';
import { toast } from 'react-toastify';
import usePatientStore from '@/stores/patient';
import Router from "next/router";

type CreateOrUpdatePatientProps = {
  type: 'create' | 'update';
  patient?: Patient;
  iconeClassName?: string;
};

export const CreateOrUpdatePatientForm:FC<CreateOrUpdatePatientProps> = (props) => {

  const { type = 'create', patient, iconeClassName } = props;
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const reload = usePatientStore((state) => state.setReloadPatients);
  const setResetFilters = usePatientStore((state) => state.setResetFilters);

  // @ts-ignore
  const form = useForm<z.infer<typeof createOrUpdatePatientSchema>>({
    resolver: zodResolver(createOrUpdatePatientSchema),
    defaultValues: type === 'update' ? {
      firstName: patient?.firstName || '',
      lastName: patient?.lastName || '',
      birthDate: patient?.birthDate || '',
      gender: patient?.gender || '',
      email: patient?.email || '',
      phone: patient?.phone || '',
      address: patient?.address || '',
    } : {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof createOrUpdatePatientSchema>) => {
    startTransition(async () => {
      try {
        if(type === 'create') {
          const response = await createPatient(data as CreateOrUpdatePatientInput);
          if(response.ok) {
            setResetFilters();
            form.reset();
            setIsDialogOpen(false);
            // @ts-ignore
            toast.success('Patient crée avec succès');
          } else {
            // @ts-ignore
            toast.error('Une erreur est servenue. Veuillez réessayer.');
          }
        } else {
          const response = await updatePatient(patient?.id as string,data as CreateOrUpdatePatientInput);
          if(response.ok) {
            reload(true);
            form.reset();
            setIsDialogOpen(false);
            // @ts-ignore
            toast.success('Patient mis à jour avec succès');
          } else {
            // @ts-ignore
            toast.error('Une erreur est servenue. Veuillez réessayer.');
          }
        }
      } catch (error: any) {
        console.log('here error', error);
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  };

  const handleCancel = () => {
    if(type === 'create') {
      form.reset();
    }
    setIsDialogOpen(false);
  }

  const TriggerComponent = () => {
    if(type === 'create') {
      return (<Button className={'w-full'}>
        <Plus size={18}/>
        Créer un patient
      </Button>);
    }
    return (<Button className={'p-0'} variant={'ghost'}>
      <PencilIcon size={15} className={cn('text-primary', iconeClassName)}/>
    </Button>)
  }

  // @ts-ignore
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger className={cn(type==='create' && 'w-full')}>
        <TriggerComponent />
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
        <DialogFormTitle
          title={type === 'create'? 'Créer un nouveau patient' : 'Mettre à jour votre patient'}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogFormContainer className='flex flex-col gap-4 pt-0'>
              <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
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
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Date de naissance</FormLabel>
                      <FormControl>
                        <Input placeholder="Date de naissance" type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="Numéro de téléphone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-[100%] gap-y-0">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      <FormLabel>L'adresse complète</FormLabel>
                      <FormControl>
                        <Input placeholder="L'adresse complète" {...field} />
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
                type={'button'}
                onClick={handleCancel}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="md:px-16 md:w-fit w-full gap-x-2"
                disabled={isPending}
              >
                {type === 'create' ? 'Créer' : 'Mettre à jour'}
                {isPending && <LoadingSpinner size={14} />}
              </Button>
            </DialogFormActions>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
