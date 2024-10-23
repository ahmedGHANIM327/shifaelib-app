import React, { FC, useEffect, useState } from 'react';
import { FicheTreatmentFilters } from '@/components/dashboard/patients/treatments/components/FicheTreatmentFilters';
import { PillIcon } from 'lucide-react';
import { CardTitle } from '@/components/shared/components/CardTitle';
import {
  CreateOrUpdateTreatmentForm
} from '@/components/dashboard/patients/treatments/forms/CreateOrUpdateTreatmentForm';
import { Treatment } from '@/lib/types/patients/treatments';
import { TreatmentFullCard } from '@/components/dashboard/patients/treatments/components/TreatmentFullCard';
import { Patient } from '@/lib/types/patients';
import useTreatmentStore from '@/stores/patient/treatment';


export const FichePatientTreatments:FC<{ patient: Patient }> = ({ patient }) => {

  const treatmentState = useTreatmentStore((state) => state.state);
  const resetTreatmentState = useTreatmentStore((state) => state.resetState);
  const [treatments, setTreatments] = useState<Treatment[]>(patient.treatments || []);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>(treatments);

  useEffect(() => {
    if(selectedFilter === 'ALL') {
      setFilteredTreatments(treatments);
    } else {
      const filtered = treatments.filter(t => t.status === selectedFilter);
      setFilteredTreatments(filtered);
    }
  }, [selectedFilter, treatments]);

  useEffect(() => {
    if(treatmentState) {
      if(treatmentState.type === 'TREATMENT_UPDATED') {
        const updatedTreatment = JSON.parse(treatmentState.payload) as Treatment;
        setTreatments(treatments.map((e: Treatment) => e.id === updatedTreatment.id ? updatedTreatment : e));
      } else if(treatmentState.type === 'TREATMENT_DELETED') {
        const deletedId = treatmentState.payload as string;
        setTreatments(treatments.filter((e: Treatment) => e.id !== deletedId));
      } else if(treatmentState.type === 'TREATMENT_CREATED') {
        const createdTreatment = JSON.parse(treatmentState.payload) as Treatment;
        setTreatments([createdTreatment, ...treatments]);
      }
      // do action
      resetTreatmentState();
    }
  }, [treatmentState]);

  return (
    <div className='mt-2 p-4'>
      <div className='flex items-center justify-between mb-2'>
        <CardTitle
          title={'Traitements'}
          icon={<PillIcon size={20}/>}
          className={'mb-0'}
        />
        <CreateOrUpdateTreatmentForm type={'create'} patient={patient} isFiche={true}/>
      </div>
      {
        treatments.length === 0 ? <div className="mt-2 bg-accent text-center py-14">
          Pas de traitements
        </div> : <>
          <FicheTreatmentFilters
            status={selectedFilter}
            setStatus={setSelectedFilter}
            treatments={treatments}
          />

          <div className='mt-2 flex flex-col gap-y-2'>
            {
              filteredTreatments.map((treatment: Treatment) => (<TreatmentFullCard treatment={treatment} from={'fiche_patient'} key={treatment.id}/>))
            }
          </div>
        </>
      }
    </div>
  );
};