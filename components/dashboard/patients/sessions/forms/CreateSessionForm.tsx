'use client';

import React, { FC, useTransition, useState, useEffect } from 'react';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSessionSchema } from '@/lib/schemas/patients/sessions';
import { toast } from 'react-toastify';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COLORS, NON_SPECIFIED_SERVICE, SessionDurations } from '@/lib/constants';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Patient } from '@/lib/types/patients';
import { PatientsSelectInput } from '@/components/shared/inputs/PatientsSelectInput';
import { Treatment } from '@/lib/types/patients/treatments';
import { cn } from '@/lib/utils';
import { Service } from '@/lib/types/services';
import { createSession } from '@/server/services/sessions';
import { CreateSessionInput, CreateSessionProps } from '@/lib/types/patients/sessions';
import useSessionStore from '@/stores/patient/sessions';

type CreateSessionFormProps = {
  data: CreateSessionProps;
  handleChange: (data: CreateSessionProps) => void;
}
export const CreateSessionForm:FC<CreateSessionFormProps> = ({
  data,
  handleChange
                                                             }) => {

  const setSessionState = useSessionStore((state) => state.setState);
  const [isPending, startTransition] = useTransition();
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedService, setSelectedService] = useState<Service>({} as Service);

  const form = useForm<z.infer<typeof createSessionSchema>>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      startTime: format(data.startTime, 'yyyy-MM-dd HH:mm').replace(' ', 'T'),
      note: '',
      treatmentId: data.treatmentId || ''
    }
  });

  const setIsOpen =  (open: boolean): void => {
    handleChange({
      ...data,
      open
    })
  }

  const onSubmit = async (data: z.infer<typeof createSessionSchema>) => {
    startTransition(async () => {
      try {
        const response = await createSession(data as CreateSessionInput);
        if(response.ok) {
          setSessionState('SESSION_CREATED', JSON.stringify(response.data));
          // @ts-ignore
          toast.success('Séance crée avec succès');
        } else {
          // @ts-ignore
          toast.error('[Création de séance]- Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      } finally {
        form.reset();
        setIsOpen(false);
      }
    });
  };

  const handleCancel = () => {
    form.reset();
    setIsOpen(false);
  }

  useEffect(() => {
    const patientTreatments = patient?.treatments || [];
    setTreatments(patientTreatments);
  }, [patient]);

  useEffect(() => {
    if(data.open) {
      // @ts-ignore
      form.setValue('startTime', format(data.startTime, 'yyyy-MM-dd HH:mm').replace(' ', 'T'));
      // @ts-ignore
      form.setValue('treatmentId', data.treatmentId || '');
    }
  }, [data]);

  const TreatmentSelectItem = (t: Treatment) => {
    const service = t.service || NON_SPECIFIED_SERVICE;
    const color = service.color;
    const bgColor = COLORS.find(c => c.color === color)?.bgColor!;

    return (<p className={'flex items-center gap-x-2'}>
      <span className={cn(bgColor, 'h-3 w-3 block rounded-full')}></span>
      {service.name} ({t.code})
    </p>)
  }

  // @ts-ignore
  const treatmentSelectedId = form.watch('treatmentId');

  useEffect(() => {
    if(treatmentSelectedId && treatmentSelectedId !== '') {
      console.log('here selected treatment', treatmentSelectedId);
      const selectedTreatmentService = treatments.find(t => t.id === treatmentSelectedId)?.service || NON_SPECIFIED_SERVICE;
      setSelectedService(selectedTreatmentService as Service);
    }
  }, [treatmentSelectedId]);

  useEffect(() => {
    if(selectedService.id) {
      console.log('here', selectedService);
      // @ts-ignore
      form.setValue('tarif', selectedService.tarif);
      // @ts-ignore
      form.setValue('duration', selectedService.duration);
    }
  }, [selectedService]);

  // @ts-ignore
  return (
    <AlertDialog open={data?.open || false} onOpenChange={setIsOpen}>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
        <DialogFormTitle
          title={'Créer une nouvelle séance'}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogFormContainer className="flex flex-col gap-4 pt-0">
              <div className={'flex gap-4'}>
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="w-[100%] gap-y-0">
                      <FormLabel>Début de séance</FormLabel>
                      <FormControl>
                        <Input type={'datetime-local'} {...field} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={'flex gap-4'}>
                <FormItem className={'md:w-[49%] w-[100%] gap-y-0 z-100'}>
                  <FormLabel>Patient</FormLabel>
                  <FormControl>
                    <PatientsSelectInput handleChange={setPatient} disabled={data.fiche} selectedId={data.patientId}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormField
                  control={form.control}
                  name="treatmentId"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Traitement</FormLabel>
                      <Select onValueChange={field.onChange} disabled={!patient.id} value={field.value}>
                        <FormControl>
                          <SelectTrigger className='disabled:opacity-100 disabled:cursor-default'>
                            <SelectValue placeholder="Traitement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {treatments.map((t) => <SelectItem value={t.id}
                                                             key={t.id}>
                            {TreatmentSelectItem(t)}
                          </SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex gap-4'>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Durée de la séance</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || selectedService.duration || '30'}>
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
                <FormField
                  control={form.control}
                  name="tarif"
                  render={({ field }) => (
                    <FormItem className={'md:w-[49%] w-[100%] gap-y-0 z-100'}>
                      <FormLabel>Tarif</FormLabel>
                      <FormControl>
                        <Input placeholder="Tarif" type={'number'} {...field}
                               value={field.value || selectedService.tarif} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={'flex gap-4 flex-wrap'}>
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="w-[100%] gap-y-0">
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Note ..."
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
                Créer
                {isPending && <LoadingSpinner size={14} />}
              </Button>
            </DialogFormActions>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
