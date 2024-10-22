import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createSessionSchema, updateSessionSchema } from '@/lib/schemas/patients/sessions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CreateSessionInput, Session, UpdateSessionInput } from '@/lib/types/patients/sessions';
import { toast } from 'react-toastify';
import useSessionStore from '@/stores/patient/sessions';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COLORS, NON_SPECIFIED_SERVICE, SessionDurations } from '@/lib/constants';
import { Textarea } from '@/components/ui/textarea';
import { PatientsSelectInput } from '@/components/shared/inputs/PatientsSelectInput';
import { Patient } from '@/lib/types/patients';
import { Treatment } from '@/lib/types/patients/treatments';
import { Service } from '@/lib/types/services';
import { updateSession } from '@/server/services/sessions';

export const UpdateSessionForm = () => {

  const viewAgendaSession = useSessionStore((state) => state.viewAgendaSession);
  const setViewAgendaSession = useSessionStore((state) => state.setViewAgendaSession);

  const [patient, setPatient] = useState<Patient>({} as Patient);
  const [isPending, startTransition] = useTransition();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const setSessionState = useSessionStore((state) => state.setState);
  const form = useForm<z.infer<typeof updateSessionSchema>>({
    resolver: zodResolver(updateSessionSchema),
    defaultValues: {
      startTime: format(viewAgendaSession.data.startTime, 'yyyy-MM-dd HH:mm').replace(' ', 'T'),
      duration: viewAgendaSession.data.duration,
      tarif: viewAgendaSession.data.tarif,
      note: viewAgendaSession.data.note,
      status: viewAgendaSession.data.status,
      treatmentId: viewAgendaSession.data.treatment.id
    }
  });

  const handleClose = () => {
    setViewAgendaSession({
      ...viewAgendaSession,
      open: false
    })
  };

  const handleBack = () => {
    setViewAgendaSession({
      ...viewAgendaSession,
      type: 'view'
    });
    setPatient({} as Patient);
  };

  const setIsOpen = (open: boolean):void => {
    setViewAgendaSession({
      ...viewAgendaSession,
      open
    })
  };

  const onSubmit = async (data: z.infer<typeof updateSessionSchema>) => {
    startTransition(async () => {
      try {
        const response = await updateSession(viewAgendaSession.data.id, data as UpdateSessionInput);
        if(response.ok) {
          setSessionState('SESSION_UPDATED', JSON.stringify(response.data));
          setViewAgendaSession({
            ...viewAgendaSession,
            data: response.data as Session,
            type: 'view'
          });
          // @ts-ignore
          toast.success('Séance mis à jour avec succès');
        } else {
          // @ts-ignore
          toast.error('[Mise à jour de séance]- Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('[Mise à jour de séance] - Une erreur est servenue. Veuillez réessayer.');
      }
    });
  };

  const TreatmentSelectItem = (t: Treatment) => {
    const service = t.service || NON_SPECIFIED_SERVICE;
    const color = service.color;
    const bgColor = COLORS.find(c => c.color === color)?.bgColor!;

    return (<p className={'flex items-center gap-x-2'}>
      <span className={cn(bgColor, 'h-3 w-3 block rounded-full')}></span>
      {service.name} ({t.code})
    </p>)
  }

  useEffect(() => {
    if(viewAgendaSession.open) {
      const p = viewAgendaSession.data.treatment.patient as Patient;
      setPatient(p);
    }
  }, [viewAgendaSession.open, viewAgendaSession.type]);

  useEffect(() => {
    const patientTreatments = patient?.treatments || [];
    setTreatments(patientTreatments);
  }, [patient]);

  // @ts-ignore
  return (
    <AlertDialog open={viewAgendaSession.open && viewAgendaSession.type === 'update'} onOpenChange={setIsOpen}>
      <AlertDialogContent className={cn(`md:w-[700px] md:max-w-[850px] p-0`)}>
        <div className='relative'>
          <Button variant={'link'} className={`bg-destructive text-white rounded-full p-0 absolute right-4 top-[50%] -translate-y-[50%] h-fit`} onClick={handleClose}>
            <XIcon size={15} />
          </Button>
          <DialogFormTitle
            title={'Mettre à jour votre séance'}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogFormContainer className="flex flex-col gap-4 pt-0">
              <div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-[100%] gap-y-0">
                      <FormLabel>Statut</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SCHEDULED">Programmée</SelectItem>
                          <SelectItem value="ATTENDED">Assistée</SelectItem>
                          <SelectItem value="NOT_ATTENDED">Non assistée</SelectItem>
                          <SelectItem value="CANCELED">Annulée</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                    <PatientsSelectInput handleChange={setPatient} value={patient}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormField
                  control={form.control}
                  name="treatmentId"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Traitement</FormLabel>
                      <Select onValueChange={field.onChange} disabled={!patient.id} value={field.value || viewAgendaSession.data.treatment.id}>
                        <FormControl>
                          <SelectTrigger>
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
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Durée de la séance</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || viewAgendaSession.data.duration}>
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
                               value={field.value} />
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
                onClick={handleBack}
              >
                Retour
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
