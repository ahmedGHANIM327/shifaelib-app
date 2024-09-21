"use client";

import React, { FC, useState, useTransition } from 'react';
import {Button} from "@/components/ui/button";
import {PencilIcon} from "lucide-react";
import {SingleImageDropzone} from "@/components/shared/components/SingleImageDropzone";
import {LoadingSpinner} from "@/components/shared/components/LoadingSpinner";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { toast } from 'react-toastify';
import { useEdgeStore } from '@/lib/edgestore';
import { updateCabinetLogo } from '@/server/services/cabinet';
import useCabinetStore from '@/stores/cabinet';
import { Cabinet } from '@/lib/types/cabinet';

type UpdateCabinetLogoFormProps = {
  logo?: string;
};

export const UpdateCabinetLogoForm:FC<UpdateCabinetLogoFormProps> = ({ logo }) => {

  const setCurrentCabinet = useCabinetStore((state) => state.setCurrentCabinet);
  const { edgestore } = useEdgeStore();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>();
  const [ isPending, startTransition ] = useTransition();

  const handleUpdate = () => {
    if(file){
      startTransition(async () => {
        try {
          const oldFileUrl = logo;
          // @ts-ignore
          const res = await edgestore.publicFiles.upload({
            file,
            options: oldFileUrl ? {
              replaceTargetUrl: oldFileUrl,
            }: {},
          });
          const url = res.url;
          const response = await updateCabinetLogo(url);
          if(response.ok) {
            setCurrentCabinet(response.data as Cabinet);
            setOpen(false);
            setFile(null);
          } else {
            // @ts-ignore
            toast.error('Une erreur est servenue. Veuillez réessayer.');
          }
        } catch (error: any) {
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      });
    }
  }

  const handleCancel = () => {
    setOpen(false);
    setFile(null);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full bg-primary h-7 w-7 p-0 absolute right-2 bottom-2 border-primary">
          <PencilIcon size={15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='p-0 md:w-[650px]'>
        <DialogFormTitle
          title={'Mettre à jour le logo de votre cabinet'}
        />
        <div className='flex justify-center items-center w-full'>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file as File}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
        <DialogFormActions>
          <Button variant={'secondary'} onClick={handleCancel}
                  className='md:w-fit md:px-16 w-full border-0'>
            Annuler
          </Button>
          <Button
            onClick={handleUpdate}
            className='md:px-16 md:w-fit w-[100%] gap-x-2'
            disabled={isPending || !file}
          >
            Mettre à jour
            {(isPending || false) && <LoadingSpinner size={18}/>}
          </Button>
        </DialogFormActions>
      </AlertDialogContent>
    </AlertDialog>
  );
};