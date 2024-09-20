import { navItems } from '@/lib/constants/navItems';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { NavItemLink } from './NavItemLink';

export const FullSidebar = () => {
  return (
    <div className="flex flex-col items-center py-0">
      <div className="flex xl:justify-center justify-center items-center w-full mt-4">
        <Link href={'/'}>
          <Image
            src="/shifaelib-full-dashboard-logo.png"
            alt="shifaelib logo"
            width={120}
            height={120}
          />
        </Link>
      </div>
      <div className="w-full mt-16">
        {navItems.map((item) => (
          <NavItemLink item={item} type={'full'} />
        ))}
      </div>
    </div>
  );
};
