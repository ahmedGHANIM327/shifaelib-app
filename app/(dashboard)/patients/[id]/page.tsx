'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Patient } from '@/lib/types/patients';
import { getPatientById } from '@/server/services/patients';
import { toast } from 'react-toastify';
import { FichePatientHeader } from '@/components/dashboard/patients/fiche-components/FichePatientHeader';
import { FichePatientTreatments } from '@/components/dashboard/patients/fiche-components/FichePatientTreatments';
import { FichePatientComments } from '@/components/dashboard/patients/fiche-components/FichePatientComments';
import { Card } from '@/components/ui/card';
import usePatientStore from '@/stores/patient';
import useSessionStore from '@/stores/patient/sessions';
import { ViewAgendaSessionComponent } from '@/components/dashboard/patients/sessions/components/ViewSessionComponent';
import { UpdateSessionForm } from '@/components/dashboard/patients/sessions/forms/UpdateSessionForm';
import { DeleteSessionComponent } from '@/components/dashboard/patients/sessions/components/DeleteSessionComponent';

const Page = () => {

  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const patientState = usePatientStore((state) => state.state);
  const resetPatientState = usePatientStore((state) => state.resetState);

  const viewAgendaSession = useSessionStore((state) => state.viewAgendaSession);

  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient>({} as Patient);

  useEffect(() => {
    startTransition(async () => {
      try {
        setError(null);
        const response = await getPatientById(id);
        console.log('here', response.data);
        if(response.ok && response?.data) {
          setPatient(response.data as Patient);
        } else {
          setError(response?.error || null);
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        setError(JSON.stringify(error) || null);
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  }, [id]);

  useEffect(() => {
    if(patientState) {
      if(patientState.type === 'PATIENT_UPDATED') {
        const updatedPatient = JSON.parse(patientState.payload) as Patient;
        setPatient({
          ...patient,
          ...updatedPatient
        });
      } else if (patientState.type === 'PATIENT_DELETED' && patientState.payload === id) {
        router.push('/patients');
      }
      // do action
      resetPatientState();
    }
  }, [patientState]);

  if(error) {
    return <div className='w-full h-full flex justify-center items-center'>
      {error}
    </div>;
  }

  if(isLoading || !patient.id) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  console.log('here viewAgendaSession', viewAgendaSession);

  return (
    <Card>
      <FichePatientHeader
        patient={patient}
      />
      <FichePatientTreatments
        patient={patient}
      />
      <FichePatientComments />
      {viewAgendaSession.open &&
        <>
          <ViewAgendaSessionComponent />
          <UpdateSessionForm />
          <DeleteSessionComponent />
        </>
      }
    </Card>
  );
};

export default Page;