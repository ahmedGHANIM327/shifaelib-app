'use client';

import React, { FC } from 'react';
import Image from "next/image";
import { Cabinet } from '@/lib/types/cabinet';
import { UpdateCabinetLogoForm } from '@/components/dashboard/cabinet/forms/UpdateCabinetLogoForm';

type FicheCabinetHeaderProps = {
  logo?: string;
};
export const FicheCabinetHeader:FC<FicheCabinetHeaderProps> = ({
  logo
                                                               }) => {
  return (
    <div className='relative h-[225px] mb-4'>
      <div className='w-full h-[150px] bg-red-200 rounded-t-md bg-cover bg-center'
           style={{ backgroundImage: "url('/cabinetFicheCoverPhoto.png')" }}>
      </div>
      <div
        className='w-fit h-fit bg-green-300 rounded-full border-2 border-primary absolute top-[50%] -translate-y-[25%] left-[25px]'>
        <Image src={logo || '/cabinetLogo.jpg'} alt='logo-dark' width={150} height={150} className='rounded-full' />
        <UpdateCabinetLogoForm />
      </div>
    </div>
  );
};