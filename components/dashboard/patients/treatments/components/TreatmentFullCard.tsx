'use client';
import React, { FC, useEffect, useState } from 'react';
import { COLORS, NON_SPECIFIED_SERVICE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  CreateOrUpdateTreatmentForm
} from '@/components/dashboard/patients/treatments/forms/CreateOrUpdateTreatmentForm';
import { DeleteTreatment } from '@/components/dashboard/patients/treatments/components/DeleteTreatment';
import { TreatmentStatusComponent } from '@/components/dashboard/patients/treatments/components/TreatmentStatus';
import { TreatmentAdditionalData } from '@/components/dashboard/patients/treatments/components/TreatmentAdditionalData';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import { ServiceHoverCard } from '@/components/dashboard/services/components/ServiceHoverCard';
import { PatientHoverCard } from '@/components/dashboard/patients/components/PatientHoverCard';
import { Patient } from '@/lib/types/patients';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { User } from '@/lib/types/users';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Treatment } from '@/lib/types/patients/treatments';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateSessionProps, Session, SessionStatus } from '@/lib/types/patients/sessions';
import { CreateSessionForm } from '@/components/dashboard/patients/sessions/forms/CreateSessionForm';
import { FicheSessionComponent } from '@/components/dashboard/patients/sessions/components/FicheSessionComponent';
import useSessionStore from '@/stores/patient/sessions';
import { FicheSessionsFilter } from '@/components/dashboard/patients/fiche-components/FicheSessionsFilter';
import { convertSessionStatus } from '@/lib/helpers/agenda';
import { CreateOrUpdatePaimentsForm } from '@/components/dashboard/patients/paiments/forms/CreateOrUpdatePaimentsForm';
import { Payment } from '@/lib/types/patients/paiments';
import { FichePaymentComponent } from '@/components/dashboard/patients/fiche-components/FichePaymentComponent';
import usePaymentStore from '@/stores/patient/payment';

type TreatmentFullCardProps = {
  treatment: Treatment;
  from: 'fiche_patient';
};

export const TreatmentFullCard:FC<TreatmentFullCardProps> = ({treatment, from}) => {
  const service = treatment.service || NON_SPECIFIED_SERVICE;
  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const textColor = COLORS.find(c => c.color === color)?.textLightColor!;

  const sessionState = useSessionStore((state) => state.state);
  const resetSessionState = useSessionStore((state) => state.resetState);
  const [openCreateSession, setOpenCreateSession] = useState<CreateSessionProps>({
    open: false,
    startTime: new Date()
  });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [status, setStatus] = useState("SCHEDULED");
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(sessions);

  const [payments, setPayments] = useState<Payment[]>([]);
  const paymentState = usePaymentStore((state) => state.state);
  const resetPaymentState = usePaymentStore((state) => state.resetState);
  const viewAgendaSession = useSessionStore((state) => state.viewAgendaSession);
  const setViewAgendaSession = useSessionStore((state) => state.setViewAgendaSession);

  useEffect(() => {
    let filteredSessionsUpdated: Session[] = [];
    if(status === 'ALL') {
      filteredSessionsUpdated = sessions;
    } else {
      filteredSessionsUpdated = sessions.filter((session: Session) => session.status === status);
    }
    setFilteredSessions(filteredSessionsUpdated);
  }, [status, sessions]);

  useEffect(() => {
    setSessions(treatment.sessions || []);
    setPayments(treatment.payments || []);
  }, [treatment]);

  useEffect(() => {
    if(sessionState) {
      if(sessionState.type === 'SESSION_CREATED') {
        const createdSession = sessionState.payload as Session;
        if(createdSession.treatmentId === treatment.id) {
          setSessions([createdSession,...sessions]);
          resetSessionState();
        }
      } else if (sessionState.type === 'SESSION_UPDATED') {
        const updatedSession = sessionState.payload as Session;
        if(updatedSession.treatmentId === treatment.id) {
          const updatedSessions = sessions.map((session) => session.id === updatedSession.id ? updatedSession : session);
          setSessions(updatedSessions);
          resetSessionState();
        }
      } else if (sessionState.type === 'SESSION_DELETED') {
        const id = sessionState.payload as string;
        const filteredSession = sessions.filter(s => s.id !== id);
        setSessions(filteredSession);
        resetSessionState();
      }
    }
  }, [sessionState]);

  useEffect(() => {
    if(paymentState) {
      if(paymentState.type === 'PAYMENT_DELETED') {
        const deletedPayment = paymentState.payload as Payment;
        if(deletedPayment.treatmentId === treatment.id) {
          const filteredPayments = payments.filter(p => p.id !== deletedPayment.id);
          setPayments(filteredPayments);
          resetPaymentState();
        }
      } else if( paymentState.type === 'PAYMENT_CREATED') {
        const createdPayment = paymentState.payload as Payment;
        if(createdPayment.treatmentId === treatment.id) {
          setPayments([...payments, createdPayment]);
          resetPaymentState();
        }
      } else if(paymentState.type === 'SESSION_PAYMENT_CREATED') {
        const createdPayment = paymentState.payload as Payment;
        const sessionId = createdPayment.sessionId!;
        if(createdPayment.treatmentId === treatment.id) {
          setPayments([...payments, createdPayment]);
          const session = sessions.find(s => s.id === sessionId);
          if(session) {
            const updatedSession = {
              ...session,
              payments: [createdPayment]
            } as Session;
            const updatedSessions = sessions.map((session) => session.id === updatedSession.id ? updatedSession : session);
            if(viewAgendaSession.data.id === sessionId) {
              setViewAgendaSession({
                ...viewAgendaSession,
                data: updatedSession
              })
            }
            setSessions(updatedSessions);
          }
          resetPaymentState();
        }
      } else if(paymentState.type === 'SESSION_PAYMENT_DELETED') {
        const deletedPayment = paymentState.payload as Payment;
        const sessionId = deletedPayment.sessionId!;
        if(deletedPayment.treatmentId === treatment.id) {
          const filteredPayments = payments.filter(p => p.id !== deletedPayment.id);
          setPayments(filteredPayments);
          const session = sessions.find(s => s.id === sessionId);
          if(session) {
            const updatedSession = {
              ...session,
              payments: []
            } as Session;
            const updatedSessions = sessions.map((session) => session.id === updatedSession.id ? updatedSession : session);
            if(viewAgendaSession.data.id === sessionId) {
              setViewAgendaSession({
                ...viewAgendaSession,
                data: updatedSession
              })
            }
            setSessions(updatedSessions);
          }
          resetPaymentState();
        }
      }
    }
  }, [paymentState]);

  return (
    <div className='border'>
      <div className={cn(bgColor, textColor, 'text-center py-2 relative')}>
        {treatment.code}
        <div className={'flex w-fit gap-x-2 absolute top-[50%] right-2 -translate-y-[50%]'}>
          <CreateOrUpdateTreatmentForm type={'update'} treatment={treatment} iconeClassName={textColor} />
          <DeleteTreatment treatment={treatment} iconeClassName={textColor} />
        </div>
      </div>
      <div className="grid grid-cols-3 xs:grid-cols-1 gap-y-6 gap-x-6 text-sm pb-1 bg-accent mx-2 my-2 p-2">
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Nombre de séances</p>
          <p>{treatment.nbSessions}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Statut</p>
          <TreatmentStatusComponent status={treatment.status} />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Données supp.</p>
          <TreatmentAdditionalData data={treatment.data as AdditionalQuestionType[]} />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Service</p>
          <ServiceHoverCard service={treatment.service as Service} />
        </div>
        {from !== 'fiche_patient' && <div className="flex flex-col justify-between">
          <p className="font-semibold">Patient</p>
          <PatientHoverCard patient={treatment.patient as Patient} />
        </div>}
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Praticien</p>
          <UserHoverCard user={treatment.responsible as User} />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Date de création</p>
          <p>{treatment.createdAt && format(new Date(treatment.createdAt), 'dd LLL y - HH:mm', { locale: fr })}</p>
        </div>
      </div>
      <div className='mx-2 my-2'>
        <div className='flex items-center justify-between'>
          <h2 className={'text-primary font-semibold text-lg'}>Séances</h2>
          <Button onClick={()=>setOpenCreateSession({
            ...openCreateSession,
            open: true,
            fiche: true,
            patientId: treatment.patientId,
            treatmentId: treatment.id,
          })}>
            <PlusIcon size={13}/>
          </Button>
        </div>
        <FicheSessionsFilter
          index={status}
          setIndex={setStatus}
          sessions={sessions}
        />
        {filteredSessions.length === 0 &&
          <div className='bg-accent text-center py-8 px-2 rounded-md md:text-lg text-sm'>
            Pas de séances {status !== 'ALL' && convertSessionStatus(status as SessionStatus).toLowerCase()+'s'}
          </div>}
        <div>
          {filteredSessions.map((session) => <FicheSessionComponent session={session} key={session.id}/>)}
        </div>
      </div>
      <div className={'m-2'}>
        <div className='flex items-center justify-between'>
          <h2 className={'text-primary font-semibold text-lg'}>Paiements</h2>
          <CreateOrUpdatePaimentsForm
            treatmentId={treatment.id}
            date={new Date()}
            type={'create'}
            isFiche={true}
          />
        </div>
        <div className='mt-2 flex gap-y-1 flex-col'>
          {payments.map((payment) => <FichePaymentComponent payment={payment} key={payment.id}/>)}
        </div>
      </div>
      <CreateSessionForm data={openCreateSession} handleChange={setOpenCreateSession} />
    </div>
  );
};