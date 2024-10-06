"use client"

import { ColumnDef } from "@tanstack/react-table";
import { convertGender, getFullName } from '@/lib/utils';
import React from 'react';
import { Patient } from '@/lib/types/patients';
import { CreateOrUpdatePatientForm } from '@/components/dashboard/patients/forms/CreateOrUpdatePatientForm';
import { DeletePatient } from '@/components/dashboard/patients/components/DeletePatient';
import { User } from '@/lib/types/users';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { EyeIcon } from 'lucide-react';

export const PatientColumns: ColumnDef<Patient>[] = [
  {
    header: "Nom et Prénom",
    cell: ({ row }) => {
      return getFullName(row.original);
    },
  },
  {
    accessorKey: "gender",
    header: "Genre",
    cell: ({ row }) => {
      return convertGender(row.original.gender);
    },
  },
  {
    accessorKey: "birthDate",
    header: "Date de naissance",
    cell: ({ row }) => {
      return row?.original.birthDate;
    },
  },
  {
    accessorKey: "address",
    header: "Adresse",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
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