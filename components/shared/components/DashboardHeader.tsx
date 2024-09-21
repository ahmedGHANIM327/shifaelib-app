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
        <UpdatePasswordUserForm type={'dialog'}/>
        <div className="flex items-stretch xl:gap-x-2 gap-x-0">
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
