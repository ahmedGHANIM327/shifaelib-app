import Link from "next/link";
import { LockKeyhole, ShieldAlert } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="global bg-accent w-full h-screen flex flex-col justify-center items-center">
      <ShieldAlert size={70} className={'text-destructive'} />
      <h1 className={'text-destructive text-4xl font-semibold mt-3 mb-1'}>Page introuvable</h1>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className='text-primary opacity-75 text-center'>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link href={'/'}>
        <Button className='mt-4 px-10 py-4'>retourner au tableau de bord</Button>
      </Link>
    </div>
  );
}