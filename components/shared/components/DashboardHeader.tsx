'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import { MobileNavbar } from '@/components/shared/components/MobileNavbar';
import { HeaderProfileMenu } from '@/components/shared/components/HeaderProfileMenu';
import { UpdatePasswordUserForm } from '@/components/dashboard/user/forms/UpdatePasswordUserForm';

export const DashboardHeader = () => {
  const [fullScreen, setFullScreen] = React.useState(false);
  const toggle = () => {
    if (!window.document.fullscreenElement) {
      window.document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else if (window.document.exitFullscreen) {
      window.document.exitFullscreen();
      setFullScreen(false);
    }
  };

  return (
    <header className="bg-background w-full border-b-2 backdrop-blur z-20 xl:pr-8">
      <nav className="h-[70px] flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="xl:hidden">
            <MobileNavbar />
          </div>
        </div>
        <UpdatePasswordUserForm type={'dialog'} />
        <div className="flex items-stretch xl:gap-x-2 gap-x-0">
          <div className='h-0 w-0 overflow-hidden'>
            <div className='bg-green-50 border border-green-600 text-green-600 px-6 py-2 rounded-md'>
              Green
            </div>
            <div className='bg-green-600 border border-green-600 text-green-50 px-6 py-2 rounded-md'>
              Green
            </div>
            <div className='bg-lime-50 border border-lime-600 text-lime-600 px-6 py-2 rounded-md'>
              lime
            </div>
            <div className='bg-lime-600 border border-lime-600 text-lime-50 px-6 py-2 rounded-md'>
              lime
            </div>
            <div className='bg-emerald-50 border border-emerald-800 text-emerald-800 px-6 py-2 rounded-md'>
              Emerald
            </div>
            <div className='bg-emerald-700 border border-emerald-700 text-emerald-50 px-6 py-2 rounded-md'>
              Emerald
            </div>
            <div className='bg-teal-50 border border-teal-600 text-teal-600 px-6 py-2 rounded-md'>
              teal
            </div>
            <div className='bg-teal-600 border border-teal-600 text-teal-50 px-6 py-2 rounded-md'>
              teal
            </div>
            <div className='bg-red-50 border border-red-600 text-red-600 px-6 py-2 rounded-md'>
              Red
            </div>
            <div className='bg-red-600 border border-red-600 text-red-50 px-6 py-2 rounded-md'>
              Red
            </div>
            <div className='bg-pink-100 border border-pink-700 text-pink-700 px-6 py-2 rounded-md'>
              pink
            </div>
            <div className='bg-pink-700 border border-pink-700 text-pink-100 px-6 py-2 rounded-md'>
              pink
            </div>
            <div className='bg-blue-50 border border-blue-500 text-blue-500 px-6 py-2 rounded-md'>
              Blue
            </div>
            <div className='bg-blue-500 border border-blue-500 text-blue-50 px-6 py-2 rounded-md'>
              Blue
            </div>
            <div className='bg-sky-50 border border-sky-700 text-sky-700 px-6 py-2 rounded-md'>
              sky
            </div>
            <div className='bg-sky-700 border border-sky-700 text-sky-50 px-6 py-2 rounded-md'>
              sky
            </div>
            <div className='bg-cyan-50 border border-cyan-600 text-cyan-600 px-6 py-2 rounded-md'>
              Cyan
            </div>
            <div className='bg-cyan-600 border border-cyan-600 text-cyan-50 px-6 py-2 rounded-md'>
              Cyan
            </div>
            <div className='bg-indigo-50 border border-indigo-700 text-indigo-700 px-6 py-2 rounded-md'>
              indigo
            </div>
            <div className='bg-indigo-700 border border-indigo-700 text-indigo-50 px-6 py-2 rounded-md'>
              indigo
            </div>
            <div className='bg-violet-50 border border-violet-500 text-violet-500 px-6 py-2 rounded-md'>
              Violet
            </div>
            <div className='bg-violet-500 border border-violet-500 text-violet-50 px-6 py-2 rounded-md'>
              Violet
            </div>
            <div className='bg-purple-50 border border-purple-700 text-purple-700 px-6 py-2 rounded-md'>
              purple
            </div>
            <div className='bg-purple-700 border border-purple-700 text-purple-50 px-6 py-2 rounded-md'>
              purple
            </div>
            <div className='bg-fuchsia-50 border border-fuchsia-600 text-fuchsia-600 px-6 py-2 rounded-md'>
              fuchsia
            </div>
            <div className='bg-fuchsia-600 border border-fuchsia-600 text-fuchsia-50 px-6 py-2 rounded-md'>
              fuchsia
            </div>
            <div className='bg-gray-50 border border-gray-500 text-gray-500 px-6 py-2 rounded-md'>
              Gray
            </div>
            <div className='bg-gray-500 border border-gray-500 text-gray-50 px-6 py-2 rounded-md'>
              Gray
            </div>
            <div className='bg-stone-50 border border-stone-500 text-stone-500 px-6 py-2 rounded-md'>
              stone
            </div>
            <div className='bg-stone-500 border border-stone-500 text-stone-50 px-6 py-2 rounded-md'>
              stone
            </div>
            <div className='bg-slate-50 border border-slate-500 text-slate-500 px-6 py-2 rounded-md'>
              slate
            </div>
            <div className='bg-slate-500 border border-slate-500 text-slate-50 px-6 py-2 rounded-md'>
              slate
            </div>

            <div className='bg-neutral-50 border border-neutral-800 text-neutral-800 px-6 py-2 rounded-md'>
              neutral
            </div>
            <div className='bg-neutral-800 border border-neutral-800 text-neutral-50 px-6 py-2 rounded-md'>
              neutral
            </div>
            <div className='bg-orange-50 border border-orange-500 text-orange-500 px-6 py-2 rounded-md'>
              Orange
            </div>
            <div className='bg-orange-500 border border-orange-500 text-orange-50 px-6 py-2 rounded-md'>
              Orange
            </div>
            <div className='bg-amber-50 border border-amber-700 text-amber-700 px-6 py-2 rounded-md'>
              Amber
            </div>
            <div className='bg-amber-700 border border-amber-700 text-amber-50 px-6 py-2 rounded-md'>
              Amber
            </div>
            <div className='bg-yellow-50 border border-yellow-500 text-yellow-500 px-6 py-2 rounded-md'>
              Yellow
            </div>
            <div className='bg-yellow-500 border border-yellow-500 text-yellow-50 px-6 py-2 rounded-md'>
              Yellow
            </div>
          </div>
          <Button
            onClick={toggle}
            variant="ghost"
            className="md:flex hidden mr-2"
          >
            {fullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </Button>
          <HeaderProfileMenu />
        </div>
      </nav>
    </header>
  );
};
