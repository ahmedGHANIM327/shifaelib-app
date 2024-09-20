'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleUser, Hospital, Power } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useTransition } from 'react';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import useUserStore from '@/stores/user';
import { LoadingAvatar } from '@/components/shared/components/LoadingAvatar';
import { getFullName, getInitials } from '@/lib/utils';

export const HeaderProfileMenu = () => {
  const router = useRouter();

  const currentUser = useUserStore((state) => state.currentUser);
  const isCurrentUserLoading = useUserStore(
    (state) => state.isCurrentUserLoading,
  );
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const [isPending, startTransition] = useTransition();

  const logoutUser = async () => {
    startTransition(async () => {
      try {
        await signOut();
        localStorage.clear();
      } catch (error) {
        console.error(error);
      }
    });
  };

  if (isCurrentUserLoading) {
    return <LoadingAvatar />;
  }

  return (
    <>
      <AlertDialog open={isPending}>
        <AlertDialogContent
          className={
            'flex items-center justify-center flex-col min-w-[600px] py-12 text-primary'
          }
        >
          <LoadingSpinner size={50} />
          <p className="text-xl">Déconnexion ....</p>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={currentUser.photo || ''} alt="profile-photo" />
            <AvatarFallback className="bg-primary text-white">
              {getInitials(currentUser.firstName, currentUser.lastName)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 py-3 mt-2" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {getFullName(currentUser)}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="gap-x-4 cursor-pointer"
              onClick={() => router.push('/profile')}
            >
              <CircleUser />
              Gérer vos données
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-x-4 cursor-pointer"
              onClick={() => router.push('/cabinet')}
            >
              <Hospital />
              Gérer votre cabinet
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 gap-x-2 cursor-pointer"
            onClick={logoutUser}
          >
            <Power size={16} />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
