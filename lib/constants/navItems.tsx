import { NavItem } from '@/lib/types';
import {
  CircleUser,
  HospitalIcon,
  LayoutDashboard
} from 'lucide-react';
import React from 'react';

export const navItems: NavItem[] = [
  {
    title: 'Tableau de bord',
    href: '/',
    icon: <LayoutDashboard />,
  },
  {
    title: 'Cabinet',
    href: '/cabinet',
    icon: <HospitalIcon />,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: <CircleUser />,
  }
];
