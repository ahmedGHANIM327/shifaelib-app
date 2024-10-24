import React, { FC, useEffect, useState, useTransition } from 'react';
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
import { cn, removeDuplicationById } from '@/lib/utils';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { UsersSelectInput } from '@/components/shared/inputs/UserSelectInput';
import { ServicesSelectInput } from '@/components/shared/inputs/ServicesSelectInput';
import { PatientsSelectInput } from '@/components/shared/inputs/PatientsSelectInput';
import { AdditionalQuestionType } from '@/lib/types/services';
import { DynamicInput } from '@/components/shared/inputs/DynamicInput';
import { createTreatment, updateTreatment } from '@/server/services/patients/treatments';
import { CreateOrUpdateTreatmentInput, Treatment } from '@/lib/types/patients/treatments';
import useTreatmentStore from '@/stores/patient/treatment';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Patient } from '@/lib/types/patients';
import useUserStore from '@/stores/user';

type CreateOrUpdateTreatmentProps = {
  type: 'create' | 'update';
  treatment?: Treatment;
  iconeClassName?: string;
  patient?: Patient;
  isFiche?: boolean;
};

export const CreateOrUpdateTreatmentForm:FC<CreateOrUpdateTreatmentProps> = ({
  type = 'create',
  treatment,
  iconeClassName,
                                                                               patient,
  isFiche = false
                                                                             }) => {

  // state
  const setTreatmentState = useTreatmentStore((state) => state.setState);
  const currentUser = useUserStore((state) => state.currentUser);

  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [additionalData, setAdditionalData] = useState<AdditionalQuestionType[]>([] as AdditionalQuestionType[]);

  // @ts-ignore
  const form = useForm<z.infer<typeof createOrUpdateTreatmentSchema>>({
    resolver: zodResolver(createOrUpdateTreatmentSchema),
    defaultValues: type === 'update' ? {
      nbSessions: treatment && treatment.nbSessions!,
      status: treatment && treatment?.status!
    } : {}
  });

  const handleCreate = async (data: CreateOrUpdateTreatmentInput) => {
    const response = await createTreatment(data);
    if(response.ok) {
      setTreatmentState('TREATMENT_CREATED', JSON.stringify(response.data));
      form.reset();
      setIsDialogOpen(false);
      // @ts-ignore
      toast.success('Traitement crée avec succès');
    } else {
      // @ts-ignore
      toast.error('Une erreur est servenue. Veuillez réessayer.');
    }
  }

  const handleUpdate = async (data: CreateOrUpdateTreatmentInput) => {
    const response = await updateTreatment(treatment?.id as string, data);
    if(response.ok) {
      setTreatmentState('TREATMENT_UPDATED', JSON.stringify(response.data));
      setIsDialogOpen(false);
      // @ts-ignore
      toast.success('Traitement mis à jour avec succès');
    } else {
      // @ts-ignore
      toast.error('Une erreur est servenue. Veuillez réessayer.');
    }
  }

  const onSubmit = async (data: z.infer<typeof createOrUpdateTreatmentSchema>) => {
    startTransition(async () => {
      try {
        const treatmentData =  {
          ...data,
          data: additionalData
        } as CreateOrUpdateTreatmentInput;
        if(type === 'create') {
          await handleCreate(treatmentData);
        } else {
          await handleUpdate(treatmentData);
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
      if(isFiche) {
        return (<>
          <AlertDialogTrigger type={'button'} className={cn('bg-primary text-white md:flex hidden w-fit items-center justify-center gap-x-2 py-2 rounded-md text-sm font-medium text-nowrap px-10')}>
            <Plus size={17} className={iconeClassName}/>
            Créer un traitement
          </AlertDialogTrigger>
          <AlertDialogTrigger type={'button'} className={cn('bg-primary text-white md:hidden flex w-fit items-center justify-center gap-x-2 py-2 rounded-md text-sm font-medium px-2')}>
            <Plus size={17} className={iconeClassName}/>
          </AlertDialogTrigger>
        </>)
      } else {
        return (<AlertDialogTrigger type={'button'} className={cn('bg-primary text-white flex w-full items-center justify-center gap-x-2 py-2 rounded-md text-sm font-medium')}>
          <Plus size={17} className={iconeClassName}/>
          Créer un traitement
        </AlertDialogTrigger>)
      }
    }
    else {
      return (<AlertDialogTrigger type={'button'} className={cn('text-white flex items-center justify-center gap-x-2 py-2 rounded-md text-sm font-medium p-0 hover:bg-transparent bg-transparent')}>
        <PencilIcon size={15} className={cn('text-primary', iconeClassName)}/>
      </AlertDialogTrigger>)
    }
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
      // create case
      if (type === 'create') {
        setAdditionalData(selectedService.config);
      } else {
        if(treatment && treatment?.service?.id! === selectedService?.id) {
          const treatmentData = treatment?.data! as AdditionalQuestionType[];
          const serviceData = selectedService.config as AdditionalQuestionType[];
          const combine = removeDuplicationById([...serviceData, ...treatmentData]);
          setAdditionalData(combine);
        } else {
          setAdditionalData(selectedService.config);
        }
      }
    }
  }, [selectedService]);

  // @ts-ignore
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TriggerComponent />
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
        <DialogFormTitle
          title={type === 'create'? 'Créer un nouveau traitement' : 'Mettre à jour votre traitement'}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogFormContainer className='flex flex-col gap-4 pt-0'>
              <div className="flex flex-wrap md:gap-x-[2%] gap-y-4">
                {type === 'update' && <FormField
                  control={form.control}
                  name="status"
                  render={({field}) => (
                    <FormItem className="w-[100%] gap-y-0">
                      <FormLabel>Statut du traitement</FormLabel>
                      <       Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Statut du traitement"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                          <SelectItem value="ON_HOLD">En suspens</SelectItem>
                          <SelectItem value="COMPLETED">Terminé</SelectItem>
                          <SelectItem value="CANCELLED">Annulé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}
                />}
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
                        <UsersSelectInput
                          handleChange={field.onChange}
                          value={treatment?.responsible || currentUser}
                        />
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
                        <ServicesSelectInput
                          handleChange={field.onChange}
                          value={treatment?.service}
                        />
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
                        <PatientsSelectInput
                          handleChange={field.onChange}
                          disabled={isFiche}
                          selectedId={treatment?.patientId || patient?.id || ''}
                        />
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