"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from '@/lib/types/users';
import { getFullName, getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { UserAccountStatus } from '@/components/dashboard/user/components/UserAccountStatus';
import { UserStatus } from '@/lib/types';
import { DeleteUser } from '@/components/dashboard/user/components/DeleteUser';
import { UpdateUserForm } from '@/components/dashboard/user/forms/UpdateUserForm';

export const UsersColumns: ColumnDef<User>[] = [
  {
    id: "avatar",
    cell: ({ row }) => {
      return (<Avatar className="cursor-pointer">
        <AvatarImage src={row?.original.photo || ''} alt="profile-photo" />
        <AvatarFallback className="bg-green-800 text-white">
          {getInitials(row?.original as User)}
        </AvatarFallback>
      </Avatar>)
    },
  },
  {
    accessorKey: "fullName",
    header: "Nom et Prénom",
    cell: ({ row }) => {
      return getFullName(row?.original as User);
    },
  },
  {
    accessorKey: "gender",
    header: "Genre",
    cell: ({ row }) => {
      return row?.original.gender === 'M' ? 'Homme' : 'Femme';
    },
  },
  {
    accessorKey: "email",
    header: "E-mail"
  },
  {
    accessorKey: "phone",
    header: "Téléphone"
  },
  {
    accessorKey: "status",
    header: "Compte statut",
    cell: ({ row }) => {
      return (<UserAccountStatus status={row?.original.status as UserStatus} />)
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      if(!row.original.isOwner) {
        return (<div className="gap-x-2 flex justify-center ">
          <UpdateUserForm
            user={row.original}
          />
          <DeleteUser
            user={row.original}
          />
        </div>)
      }
    },
  },
]