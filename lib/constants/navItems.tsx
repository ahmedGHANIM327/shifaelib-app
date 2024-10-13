import { NavItem } from '@/lib/types';
import {
  Activity, CalendarCheck,
  CircleUser,
  HospitalIcon,
  LayoutDashboard, Pill, Stethoscope,
  Users
} from 'lucide-react';
import React from 'react';

export const navItems: NavItem[] = [
  {
    title: 'Tableau de bord',
    href: '/',
    icon: <LayoutDashboard size={20}/>,
    isOwnerItem: false,
  },
  {
    title: 'Cabinet',
    href: '/cabinet',
    icon: <HospitalIcon size={20}/>,
    isOwnerItem: true,
  },
  {
    title: 'Utilisateurs',
    href: '/cabinet/users',
    icon: <Users size={20}/>,
    isOwnerItem: true,
  },
  {
    title: 'Services',
    href: '/cabinet/services',
    icon: <Activity size={20}/>,
    isOwnerItem: true,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: <CircleUser size={20}/>,
    isOwnerItem: false,
  },
  {
    title: 'Patients',
    href:'/patients',
    icon: <Stethoscope />,
    isOwnerItem: false
  },
  {
    title: 'Traitements',
    href:'/patients/treatments',
    icon: <Pill />,
    isOwnerItem: false
  },
  {
    title: 'Agenda',
    href:'/agenda',
    icon: <CalendarCheck />,
    isOwnerItem: false
  },
];
