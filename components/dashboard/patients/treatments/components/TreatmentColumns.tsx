"use client"

import { ColumnDef } from "@tanstack/react-table";
import React from 'react';
import { User } from '@/lib/types/users';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { EyeIcon } from 'lucide-react';
import { Treatment } from '@/lib/types/patients/treatments';
import { PatientHoverCard } from '@/components/dashboard/patients/components/PatientHoverCard';
import { Patient } from '@/lib/types/patients';
import { TreatmentStatusComponent } from '@/components/dashboard/patients/treatments/components/TreatmentStatus';
import { ServiceHoverCard } from '@/components/dashboard/services/components/ServiceHoverCard';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import { TreatmentAdditionalData } from '@/components/dashboard/patients/treatments/components/TreatmentAdditionalData';
import {
  CreateOrUpdateTreatmentForm
} from '@/components/dashboard/patients/treatments/forms/CreateOrUpdateTreatmentForm';
import { DeletePatient } from '@/components/dashboard/patients/components/DeletePatient';
import { DeleteTreatment } from '@/components/dashboard/patients/treatments/components/DeleteTreatment';

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
        <CreateOrUpdateTreatmentForm type={'update'} treatment={row.original}/>
        <DeleteTreatment treatment={row.original}/>
      </div>)
    },
  },
]