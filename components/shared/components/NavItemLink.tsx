'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/lib/types';

export const NavItemLink: FC<{ item: NavItem; type: 'full' | 'icon' }> = ({
  item,
  type,
}) => {
  const pathname = usePathname();
  const { href, icon, title } = item;
  console.log('pathname', pathname);
  const css_class = cn(
    'flex gap-x-2 w-full text-accent items-center text-[18px] font-medium p-2 hover:bg-background hover:text-primary rounded-sm mb-2',
    {
      'justify-center': type === 'icon',
      'bg-background text-primary':
        pathname === href || (href !== '/' && pathname.endsWith(href)),
    },
  );

  // @ts-ignore
  return (
    <Link key={href} href={href} className={css_class}>
      {icon}
      {type === 'full' && title}
    </Link>
  );
};
