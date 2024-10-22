import React, { useEffect, useState } from 'react';
import { cn, getFullName } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useSessionStore from '@/stores/patient/sessions';
import { Patient } from '@/lib/types/patients';
import { COLORS, NON_SPECIFIED_SERVICE } from '@/lib/constants';
import { CalendarSession, Session } from '@/lib/types/patients/sessions';
import { Banknote, Clock, CoinsIcon, PencilIcon, Stethoscope, Trash2, UserRound, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateOrUpdatePatientForm } from '@/components/dashboard/patients/forms/CreateOrUpdatePatientForm';
import { DeletePatient } from '@/components/dashboard/patients/components/DeletePatient';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { SessionStatusComponent } from '@/components/dashboard/agenda/components/SessionStatusComponent';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { PatientHoverCard } from '@/components/dashboard/patients/components/PatientHoverCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import sessions from '@/stores/patient/sessions';
import { CreateOrUpdatePaimentsForm } from '@/components/dashboard/patients/paiments/forms/CreateOrUpdatePaimentsForm';
import { DeletePayment } from '@/components/dashboard/patients/paiments/components/DeletePayment';
import usePaymentStore from '@/stores/patient/payment';
import { Payment } from '@/lib/types/patients/paiments';

export const ViewAgendaSessionComponent = () => {

  const viewAgendaSession = useSessionStore((state) => state.viewAgendaSession);
  const setSessionState = useSessionStore((state) => state.setState);
  const setViewAgendaSession = useSessionStore((state) => state.setViewAgendaSession);
  const resetSessionState = useSessionStore((state) => state.resetState);

  const paymentState = usePaymentStore((state) => state.state);
  const resetPaymentState = usePaymentStore((state) => state.resetState);

  const [payments, setPayments] = useState<Payment[]>([]);

  const setIsOpen = (open: boolean):void => {
    setViewAgendaSession({
      ...viewAgendaSession,
      open
    });
  };

  const handleClose = () => {
    setViewAgendaSession({
      ...viewAgendaSession,
      open: false
    })
  };

  const handleUpdate = () => {
    setViewAgendaSession({
      ...viewAgendaSession,
      type: 'update',
      open: true
    })
  };

  const handleDelete = () => {
    setViewAgendaSession({
      ...viewAgendaSession,
      type: 'delete',
      open: true
    })
  };

  const session = viewAgendaSession.data as Session;
  const patient = session.treatment.patient as Patient;
  const praticien = session.treatment.responsible || null;
  const service = session.treatment.service || NON_SPECIFIED_SERVICE;
  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const textColor = COLORS.find(c => c.color === color)?.textColor!;
  const textLightColor = COLORS.find(c => c.color === color)?.textLightColor!;
  const borderColor = COLORS.find(c => c.color === color)?.borderColor!;

  useEffect(() => {
    setPayments(viewAgendaSession.data.payments || []);
  }, [viewAgendaSession.data]);

  useEffect(() => {
    if(paymentState) {
      if(paymentState.type === 'PAYMENT_DELETED') {
        const updatedSession = {
          ...viewAgendaSession.data,
          payments: []
        } as Session;
        setSessionState('SESSION_UPDATED', JSON.stringify(updatedSession));
        setViewAgendaSession({
          ...viewAgendaSession,
          data: updatedSession,
          type: 'view'
        });
        resetPaymentState();
      } else if( paymentState.type === 'PAYMENT_CREATED') {
        const createdPayment = JSON.parse(paymentState.payload) as Payment;
        const updatedSession = {
          ...viewAgendaSession.data,
          payments: [createdPayment]
        } as Session;
        setSessionState('SESSION_UPDATED', JSON.stringify(updatedSession));
        setViewAgendaSession({
          ...viewAgendaSession,
          data: updatedSession,
          type: 'view'
        });
        resetPaymentState();
      }
    }
  }, [paymentState]);

  return (
    <AlertDialog open={viewAgendaSession.open && viewAgendaSession.type === 'view'} onOpenChange={setIsOpen}>
      <AlertDialogContent className={cn(`md:w-[550px] md:max-w-[850px] p-0 pb-4 border ${borderColor}`)}>
        <div className={`flex items-center justify-between py-4 relative px-2 ${bgColor} ${textLightColor}`}>
          <Button variant={'link'} className={`${textLightColor} p-0 h-fit`} onClick={handleClose}>
            <XIcon size={15} />
          </Button>
          <p>{service.name} ({session.treatment.code})</p>
          <div className='flex gap-x-2'>
            <Button variant={'link'} className={`${textLightColor} p-0 h-fit`} onClick={handleUpdate}>
              <PencilIcon size={15} />
            </Button>
            <Button variant={'link'} className={`${textLightColor} p-0 h-fit`} onClick={handleDelete}>
              <Trash2 size={15} />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-y-4 mb-2 px-4">
          <div className='flex items-center gap-x-2 mb-2 w-full justify-center'>
            <SessionStatusComponent status={session.status} />
          </div>
          <div className="flex flex-col gap-x-4 md:w-[49%] w-full">
            <div className={`flex items-center gap-x-1 font-mono ${textColor}`}>
              <Stethoscope size={13} />
              Patient
            </div>
            <PatientHoverCard patient={patient} triggerClassName={'text-[15px]'} />
          </div>
          <div className="flex flex-col gap-x-4 md:w-[49%] w-full">
            <div className={`flex items-center gap-x-1 font-mono ${textColor}`}>

              <UserRound size={13} className={'font-bold'} />
              Praticien
            </div>
            <UserHoverCard user={praticien} triggerClassName={'text-[15px]'} />
          </div>
          <div className="flex flex-col gap-x-4 md:w-[49%] w-full">
            <div className={`flex items-center gap-x-1 font-mono ${textColor}`}>
              <Clock size={13} />
              Horaire
            </div>
            <p>{format(session.startTime, "dd LLL y", { locale: fr })} {format(session.startTime, "HH:mm", { locale: fr })} - {format(session.endTime, "HH:mm", { locale: fr })}</p>
          </div>
          <div className="flex flex-col gap-x-4 md:w-[49%] w-full">
            <div className={`flex items-center gap-x-1 font-mono ${textColor}`}>
              <Banknote size={14} />
              Tarif
            </div>
            <p>Tarif de cette séance : {session.tarif || '0'} MAD</p>
          </div>
          {payments.length > 0 && <div className="flex flex-col gap-x-4 w-full">
            <div className={`flex items-center gap-x-1 font-mono ${textColor}`}>
              <CoinsIcon size={14} />
              Total payé pendant la session
            </div>
            <div className={'bg-accent py-1 flex justify-between px-2'}>
              <p className={'text-green-700'}>{payments[0].amount} MAD</p>
              <DeletePayment id={payments[0].id}/>
            </div>
          </div>}
        </div>
        {payments.length === 0 && <div className="px-4">
          <CreateOrUpdatePaimentsForm
            treatmentId={session.treatment.id}
            sessionId={session.id}
            date={session.startTime}
            type={'create'}
          />
        </div>}
      </AlertDialogContent>
    </AlertDialog>
  );
};