"use client"

import { ColumnDef } from "@tanstack/react-table";
import React from 'react';
import { CreateOrUpdatePatientForm } from '@/components/dashboard/patients/forms/CreateOrUpdatePatientForm';
import { DeletePatient } from '@/components/dashboard/patients/components/DeletePatient';
import { User } from '@/lib/types/users';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { EyeIcon } from 'lucide-react';
import { Treatment } from '@/lib/types/patients/treatments';
import { getFullName } from '@/lib/utils';
import { PatientHoverCard } from '@/components/dashboard/patients/components/PatientHoverCard';
import { Patient } from '@/lib/types/patients';
import { TreatmentStatusComponent } from '@/components/dashboard/patients/treatments/components/TreatmentStatus';
import { ServiceHoverCard } from '@/components/dashboard/services/components/ServiceHoverCard';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import {
  AdditionalQuestionsFicheModal
} from '@/components/dashboard/services/components/AdditionalQuestionsFicheModal';
import { TreatmentAdditionalData } from '@/components/dashboard/patients/treatments/components/TreatmentAdditionalData';

export const TreatmentColumns: ColumnDef<Treatment>[] = [
  {
    accessorKey: 'code',
    header: "Code"
  },
  {
    accessorKey: 'nbSessions',
    header: "Nombre de séances"
  },
  {
    header: "Statut",
    cell: ({ row }) => {
      return <TreatmentStatusComponent status={row.original.status} />;
    }
  },
  {
    header: 'Données supp.',
    cell: ({ row }) => {
      return <TreatmentAdditionalData data={row.original.data as AdditionalQuestionType[]} />
    }
  },
  {
    header: "Service",
    cell: ({ row }) => {
      return <ServiceHoverCard service={row.original.service as Service}/>;
    }
  },
  {
    header: "Patient",
    cell: ({ row }) => {
      return <PatientHoverCard patient={row.original.patient as Patient}/>;
    }
  },
  {
    header: "Praticien",
    cell: ({ row }) => {
      return <UserHoverCard user={row.original.responsible as User}/>;
    }
  },
  {
    accessorKey: "createdAt",
    header: "Crée le",
    cell: ({ row }) => {
      return row.original.createdAt ? format(new Date(row.original.createdAt), "dd LLL y - HH:mm", { locale: fr }) : '-';
    }
  },
  {
    header: "Crée par",
    cell: ({ row }) => {
      return <UserHoverCard user={row.original.createdByUser as User}/>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Mis à jour le",
    cell: ({ row }) => {
      return row.original.updatedAt ? format(new Date(row.original.updatedAt), "dd LLL y - HH:mm", { locale: fr }) : '-';
    }
  },
  {
    header: "Mis à jour par",
    cell: ({ row }) => {
      return <UserHoverCard user={row.original.updatedByUser as User}/>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (<div className="gap-x-2 flex justify-end items-center">
        <Link href={`/patients/${row.original.id}`}>
          <EyeIcon size={15}/>
        </Link>
        <CreateOrUpdatePatientForm type={'update'} patient={row.original}/>
        <DeletePatient patient={row.original}/>
      </div>)
    },
  },
]