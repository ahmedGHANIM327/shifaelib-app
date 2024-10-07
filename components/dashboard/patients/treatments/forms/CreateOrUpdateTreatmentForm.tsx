import React, { useEffect, useState, useTransition } from 'react';
import { createOrUpdateTreatmentSchema } from '@/lib/schemas/patients/treatments';
import { z } from 'zod';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { PencilIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { UsersSelectInput } from '@/components/shared/inputs/UserSelectInput';
import { ServicesSelectInput } from '@/components/shared/inputs/ServicesSelectInput';
import { PatientsSelectInput } from '@/components/shared/inputs/PatientsSelectInput';
import { AdditionalQuestionType } from '@/lib/types/services';
import { DynamicInput } from '@/components/shared/inputs/DynamicInput';
import { createTreatment } from '@/server/services/patients/treatments';
import { CreateOrUpdateTreatmentInput } from '@/lib/types/patients/treatments';

export const CreateOrUpdateTreatmentForm = () => {

  const type = 'create';
  const iconeClassName = '';

  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [additionalData, setAdditionalData] = useState<AdditionalQuestionType[]>([] as AdditionalQuestionType[]);

  // @ts-ignore
  const form = useForm<z.infer<typeof createOrUpdateTreatmentSchema>>({
    resolver: zodResolver(createOrUpdateTreatmentSchema),
  });

  const onSubmit = async (data: z.infer<typeof createOrUpdateTreatmentSchema>) => {
    startTransition(async () => {
      try {
        const treatmentData =  {
          ...data,
          data: additionalData
        } as CreateOrUpdateTreatmentInput;
        const response = await createTreatment(treatmentData);
        if(response.ok) {
          form.reset();
          setIsDialogOpen(false);
          // @ts-ignore
          toast.success('Traitement crée avec succès');
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
    if(type === 'create') {
      form.reset();
    }
    setIsDialogOpen(false);
  }

  const TriggerComponent = () => {
    if(type === 'create') {
      return (<Button className={'w-full'}>
        <Plus size={18}/>
        Créer un traitement
      </Button>);
    }
    return (<Button className={'p-0 hover:bg-transparent'} variant={'ghost'}>
      <PencilIcon size={15} className={cn('text-primary', iconeClassName)}/>
    </Button>)
  }

  // @ts-ignore
  const selectedService = form.watch('service');

  const handleUpdateAdditionalData = (id: string, newValues: AdditionalQuestionType) => {
    const filteredData = additionalData.filter(q => q.id !== id);
    const orderedData = [...filteredData, newValues].sort((a,b) => a.order - b.order);
    setAdditionalData(orderedData);
  }

  useEffect(() => {
    if(selectedService && selectedService?.id) {
      setAdditionalData(selectedService.config as AdditionalQuestionType[]);
    }
  }, [selectedService]);

  // @ts-ignore
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger className={cn(type==='create' && 'w-full')}>
        <TriggerComponent />
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
        <DialogFormTitle
          title={type === 'create'? 'Créer un nouveau traitement' : 'Mettre à jour votre traitement'}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogFormContainer className='flex flex-col gap-4 pt-0'>
              <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
                <FormField
                  control={form.control}
                  name="nbSessions"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Nombre de séances</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de séances" {...field} type={'number'} min={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="praticien"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Praticien</FormLabel>
                      <FormControl>
                        <UsersSelectInput handleChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Service</FormLabel>
                      <FormControl>
                        <ServicesSelectInput handleChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patient"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Patient</FormLabel>
                      <FormControl>
                        <PatientsSelectInput handleChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {additionalData.length > 0 && <div className='border border-primary border-t-0'>
                <p className='bg-primary text-center text-white text-sm py-3'>Données supplémentaires</p>
                <div className='mx-2 my-4 flex flex-col gap-y-3'>
                  {
                    additionalData.map((q) => <DynamicInput key={q.id} question={q} disabled={false} handleChange={handleUpdateAdditionalData} />)
                  }
                </div>
              </div>}
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