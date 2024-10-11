import React, { useEffect, useState } from 'react';
import usePatientStore from '@/stores/patient';
import { FicheTreatmentFilters } from '@/components/dashboard/patients/treatments/components/FicheTreatmentFilters';
import { PillIcon } from 'lucide-react';
import { CardTitle } from '@/components/shared/components/CardTitle';
import {
  CreateOrUpdateTreatmentForm
} from '@/components/dashboard/patients/treatments/forms/CreateOrUpdateTreatmentForm';
import { Card } from '@/components/ui/card';
import { Treatment } from '@/lib/types/patients/treatments';
import { TreatmentFullCard } from '@/components/dashboard/patients/treatments/components/TreatmentFullCard';

export const FichePatientTreatments = () => {
  const treatments = usePatientStore((state) => state.selectedPatientTreatments);
  const patient = usePatientStore((state) => state.selectedPatient);

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

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-2'>
        <CardTitle
          title={'Traitements'}
          icon={<PillIcon />}
          className={'mb-0'}
        />
        <CreateOrUpdateTreatmentForm type={'create'} patient={patient} isFiche={true}/>
      </div>
      <FicheTreatmentFilters
        status={selectedFilter}
        setStatus={setSelectedFilter}
        treatments={treatments}
      />
      <div className='mt-4 flex flex-col gap-y-2'>
        {
          filteredTreatments.map((treatment: Treatment) => (<TreatmentFullCard treatment={treatment} from={'fiche_patient'} key={treatment.id}/>))
        }
      </div>
    </Card>
  );
};