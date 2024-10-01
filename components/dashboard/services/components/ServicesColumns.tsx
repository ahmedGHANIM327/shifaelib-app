"use client"

import { ColumnDef } from "@tanstack/react-table";
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import { COLORS } from '@/lib/constants';
import { cn, convertDurationToLabel, stringifyDateFormat } from '@/lib/utils';
import React from 'react';
import { DeleteService } from '@/components/dashboard/services/components/DeleteService';
import { CreateOrUpdateServiceForm } from '@/components/dashboard/services/forms/CreateOrUpdateServiceForm';
import {
  AdditionalQuestionsFicheModal
} from '@/components/dashboard/services/components/AdditionalQuestionsFicheModal';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const ServicesColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "color",
    header: "Couleur",
    cell: ({ row }) => {
      const bgColor = COLORS.find(c => c.color === row.original.color)?.bgColor;
      return (
        <span className={cn('w-4 h-4 block rounded-full', bgColor)}></span>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Nom du sérvice"
  },
  {
    accessorKey: "tarif",
    header: "Tarif de la séance"
  },
  {
    accessorKey: "duration",
    header: "Durée moyenne de la séance",
    cell: ({ row }) => {
      return convertDurationToLabel(row.original.duration);
    },
  },
  {
    accessorKey: "config",
    header: "Questions supplémentaires",
    cell: ({ row }) => {
      return (row.original.config as AdditionalQuestionType[]).length > 0 ? <AdditionalQuestionsFicheModal service={row.original}/> : '-';
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date de création",
    cell: ({ row }) => {
      return row.original.createdAt ? format(new Date(row.original.createdAt), "dd LLL y - HH:mm", { locale: fr }) : '-';
    }
  },
  {
    accessorKey: "updatedAt",
    header: "Date de dernière modification",
    cell: ({ row }) => {
      return row.original.updatedAt ? format(new Date(row.original.updatedAt), "dd LLL y - HH:mm", { locale: fr }) : '-';
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (<div className="gap-x-2 flex justify-center ">
        <CreateOrUpdateServiceForm type={'update'} service={row.original}/>
        <DeleteService service={row.original}/>
      </div>)
    },
  },
]