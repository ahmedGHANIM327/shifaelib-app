"use client";

import React, {useState, useTransition} from 'react';
import {Button} from "@/components/ui/button";
import {PencilIcon} from "lucide-react";
import {SingleImageDropzone} from "@/components/shared/components/SingleImageDropzone";
import {LoadingSpinner} from "@/components/shared/components/LoadingSpinner";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';

export const UpdateCabinetLogoForm = () => {

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>();
  const [ isPending, startTransition ] = useTransition();

  const handleUpdate = () => {
    if(file){
      startTransition(async () => {
        console.log('file', file);
        setOpen(false);
        setFile(null);
      });
    }
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
          <Button variant={'secondary'} onClick={() => setOpen(false)}
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