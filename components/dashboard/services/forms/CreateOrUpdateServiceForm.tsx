'use client';

import React, { FC, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createServiceSchema } from '@/lib/schemas/services';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ColorsInput } from '@/components/shared/inputs/ColorInput';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { AdditionalQuestionType, CreateOrUpdateServiceInput, Service } from '@/lib/types/services';
import { AdditionalQuestionForm } from '@/components/dashboard/services/forms/AdditionalQuestionForm';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PencilIcon, Plus } from 'lucide-react';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { AdditionalQuestionBlock } from '@/components/dashboard/services/components/AdditionalQuestionBlock';
import { DeleteAdditionalQuestion } from '@/components/dashboard/services/components/DeleteAdditionalQuestion';
import { createService, updateService as updateServiceAction } from '@/server/services/services';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';
import useUserStore from '@/stores/user';
import { SessionDurations } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CreateServiceFormProps = {
  type: 'create' | 'update';
  service?: Service;
  iconeClassName?: string;
};

export const CreateOrUpdateServiceForm:FC<CreateServiceFormProps> = ({ type = 'create', service, iconeClassName }) => {

  const [isPending, startTransition] = useTransition();
  const [additionalQuestions, setAdditionalQuestions] = useState<AdditionalQuestionType[]>((service?.config as AdditionalQuestionType[] ) || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addService = useUserStore((state) => state.addCabinetService);
  const updateService = useUserStore((state) => state.updateCabinetService);


  // @ts-ignore
  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: type === 'update' ? {
      name: service?.name || '',
      tarif: service?.tarif || '0',
      duration: service?.duration || '30',
      color: service?.color || '',
    } : {
      name: '',
      tarif: '0',
      duration: '30',
      color: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof createServiceSchema>) => {
    startTransition(async () => {
      try {
        if(type === 'create') {
          const service = {
            ...data,
            config: additionalQuestions
          } as CreateOrUpdateServiceInput;

          const response = await createService(service);
          if(response.ok) {
            addService(response.data as Service);
            form.reset();
            setIsDialogOpen(false);
            // @ts-ignore
            toast.success('Service crée avec succès');
          } else {
            if (response.error === 'SERVICE_COLOR_ALREADY_EXISTS') {
              // @ts-ignore
              toast.error('Un service avec la même couleur exist déjà. Veuillez réessayer.');
            } else {
              // @ts-ignore
              toast.error('Une erreur est servenue. Veuillez réessayer.');
            }
          }
        } else {
          const updatedServiceData = {
            ...data,
            config: additionalQuestions
          } as CreateOrUpdateServiceInput;

          const response = await updateServiceAction(service?.id as string, updatedServiceData);
          if(response.ok) {
            updateService(response.data as Service);
            form.reset();
            setIsDialogOpen(false);
            // @ts-ignore
            toast.success('Service mis à jour avec succès');
          } else {
            if (response.error === 'SERVICE_COLOR_ALREADY_EXISTS') {
              // @ts-ignore
              toast.error('Un service avec la même couleur exist déjà. Veuillez réessayer.');
            } else {
              // @ts-ignore
              toast.error('Une erreur est servenue. Veuillez réessayer.');
            }
          }
        }
      } catch (error: any) {
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
      return (<Button className='gap-x-2 w-full'>
        <Plus />
        Créer un service
      </Button>);
    }
    return (<PencilIcon size={15} className={cn('text-primary', iconeClassName)}/>)
  }

  // @ts-ignore
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger className={'w-full px-0'}>
        <TriggerComponent />
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
        <DialogFormTitle
          title={type === 'create'? 'Créer un nouveau service' : 'Mettre à jour votre service'}
        />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DialogFormContainer className='flex flex-col gap-4 pt-0'>
          <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-[100%] gap-y-0">
                  <FormLabel>Nom du service</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tarif"
              render={({ field }) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Tarif de séance</FormLabel>
                  <FormControl>
                    <Input placeholder="Tarif de séance" {...field} type={'number'} min={0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                  <FormLabel>Durée de la séance</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || '30'}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Durée moyenne de la séance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SessionDurations.map((duration) => <SelectItem value={duration.value}
                                                                         key={duration.value}>{duration.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-[100%] gap-y-0">
                <FormLabel>Couleur</FormLabel>
                <FormControl>
                  <ColorsInput
                    color={field.value}
                    handleChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="bg-accent p-2 mb-2">
            <div className={'flex justify-between items-center'}>
              <p>Questions complementaires</p>
              <AdditionalQuestionForm
                type={'create'}
                additionalQuestions={additionalQuestions}
                setAdditionalQuestions={setAdditionalQuestions}
              />
            </div>
            <div>
              {additionalQuestions.map(question => (
                <div className='relative' key={question.id}>
                  <AdditionalQuestionBlock question={question}/>
                  <div className='absolute top-2 right-2 flex flex-col gap-y-2'>
                    <DeleteAdditionalQuestion
                      question={question}
                      additionalQuestions={additionalQuestions}
                      setAdditionalQuestions={setAdditionalQuestions}
                    />
                    <AdditionalQuestionForm
                      type={'update'}
                      selectedAdditionalQuestion={question}
                      additionalQuestions={additionalQuestions}
                      setAdditionalQuestions={setAdditionalQuestions}
                    />
                  </div>
                </div>
              ))}
            </div>
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