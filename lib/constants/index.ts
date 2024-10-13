import { WeekOpeningHours } from '../types';
import { Service } from '@/lib/types/services';

export const DefaultOpeningHours: WeekOpeningHours = {
  monday: {
    from: '09:00',
    to: '18:00',
    isClosed: false,
  },
  tuesday: {
    from: '09:00',
    to: '18:00',
    isClosed: false,
  },
  wednesday: {
    from: '09:00',
    to: '18:00',
    isClosed: false,
  },
  thursday: {
    from: '09:00',
    to: '18:00',
    isClosed: false,
  },
  friday: {
    from: '09:00',
    to: '18:00',
    isClosed: false,
  },
  saturday: {
    from: '09:00',
    to: '13:00',
    isClosed: false,
  },
  sunday: {
    isClosed: true,
  },
};

export const MedicalCabinetTypes: string[] = [
  "Cabinet de médecine générale",
  "Cabinet de pédiatrie",
  "Cabinet de gynécologie",
  "Cabinet de dermatologie",
  "Cabinet de cardiologie",
  "Cabinet de psychiatrie",
  "Cabinet de rhumatologie",
  "Cabinet d'ophtalmologie",
  "Cabinet d'oto-rhino-laryngologie (ORL)",
  "Cabinet de dentisterie",
  "Cabinet de kinésithérapie",
  "Cabinet d'orthopédie",
  "Cabinet de neurologie",
  "Cabinet de gastro-entérologie",
  "Cabinet d'endocrinologie"
];

export const HoursAndMinutesList: string[] = [
  "00:00", "00:15", "00:30", "00:45",
  "01:00", "01:15", "01:30", "01:45",
  "02:00", "02:15", "02:30", "02:45",
  "03:00", "03:15", "03:30", "03:45",
  "04:00", "04:15", "04:30", "04:45",
  "05:00", "05:15", "05:30", "05:45",
  "06:00", "06:15", "06:30", "06:45",
  "07:00", "07:15", "07:30", "07:45",
  "08:00", "08:15", "08:30", "08:45",
  "09:00", "09:15", "09:30", "09:45",
  "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15", "11:30", "11:45",
  "12:00", "12:15", "12:30", "12:45",
  "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15", "14:30", "14:45",
  "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45",
  "17:00", "17:15", "17:30", "17:45",
  "18:00", "18:15", "18:30", "18:45",
  "19:00", "19:15", "19:30", "19:45",
  "20:00", "20:15", "20:30", "20:45",
  "21:00", "21:15", "21:30", "21:45",
  "22:00", "22:15", "22:30", "22:45",
  "23:00", "23:15", "23:30", "23:45"
];

export const translateDays = {
  'monday': 'Lundi',
  'tuesday': 'Mardi',
  'wednesday': 'Mercredi',
  'thursday': 'Jeudi',
  'friday': 'Vendredi',
  'saturday': 'Samedi',
  'sunday': 'Dimanche'
}

export const COLORS = [
  {
    color: 'green',
    bgColor: 'bg-green-600',
    bgLightColor: 'bg-green-50',
    textColor: 'text-green-600',
    textLightColor: 'text-green-50',
    borderColor: 'border-green-600',
    borderLightColor: 'border-green-50'
  },
  {
    color: 'lime',
    bgColor: 'bg-lime-600',
    bgLightColor: 'bg-lime-50',
    textColor: 'text-lime-600',
    textLightColor: 'text-lime-50',
    borderColor: 'border-lime-600',
    borderLightColor: 'border-lime-50'
  },
  {
    color: 'teal',
    bgColor: 'bg-teal-600',
    bgLightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    textLightColor: 'text-teal-50',
    borderColor: 'border-teal-600',
    borderLightColor: 'border-teal-50'
  },
  {
    color: 'red',
    bgColor: 'bg-red-600',
    bgLightColor: 'bg-red-50',
    textColor: 'text-red-600',
    textLightColor: 'text-red-50',
    borderColor: 'border-red-600',
    borderLightColor: 'border-red-50'
  },
  {
    color: 'pink',
    bgColor: 'bg-pink-700',
    bgLightColor: 'bg-pink-100',
    textColor: 'text-pink-700',
    textLightColor: 'text-pink-100',
    borderColor: 'border-pink-700',
    borderLightColor: 'border-pink-100'
  },
  {
    color: 'blue',
    bgColor: 'bg-blue-500',
    bgLightColor: 'bg-blue-50',
    textColor: 'text-blue-500',
    textLightColor: 'text-blue-50',
    borderColor: 'border-blue-500',
    borderLightColor: 'border-blue-50'
  },
  {
    color: 'sky',
    bgColor: 'bg-sky-700',
    bgLightColor: 'bg-sky-50',
    textColor: 'text-sky-700',
    textLightColor: 'text-sky-50',
    borderColor: 'border-sky-700',
    borderLightColor: 'border-sky-50'
  },
  {
    color: 'cyan',
    bgColor: 'bg-cyan-600',
    bgLightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    textLightColor: 'text-cyan-50',
    borderColor: 'border-cyan-600',
    borderLightColor: 'border-cyan-50'
  },
  {
    color: 'indigo',
    bgColor: 'bg-indigo-700',
    bgLightColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    textLightColor: 'text-indigo-50',
    borderColor: 'border-indigo-700',
    borderLightColor: 'border-indigo-50'
  },
  {
    color: 'violet',
    bgColor: 'bg-violet-500',
    bgLightColor: 'bg-violet-50',
    textColor: 'text-violet-500',
    textLightColor: 'text-violet-50',
    borderColor: 'border-violet-500',
    borderLightColor: 'border-violet-50'
  },
  {
    color: 'purple',
    bgColor: 'bg-purple-700',
    bgLightColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    textLightColor: 'text-purple-50',
    borderColor: 'border-purple-700',
    borderLightColor: 'border-purple-50'
  },
  {
    color: 'fuchsia',
    bgColor: 'bg-fuchsia-600',
    bgLightColor: 'bg-fuchsia-50',
    textColor: 'text-fuchsia-600',
    textLightColor: 'text-fuchsia-50',
    borderColor: 'border-fuchsia-600',
    borderLightColor: 'border-fuchsia-50'
  },
  {
    color: 'stone',
    bgColor: 'bg-stone-500',
    bgLightColor: 'bg-stone-50',
    textColor: 'text-stone-500',
    textLightColor: 'text-stone-50',
    borderColor: 'border-stone-500',
    borderLightColor: 'border-stone-50'
  },
  {
    color: 'slate',
    bgColor: 'bg-slate-500',
    bgLightColor: 'bg-slate-50',
    textColor: 'text-slate-500',
    textLightColor: 'text-slate-50',
    borderColor: 'border-slate-500',
    borderLightColor: 'border-slate-50'
  },
  {
    color: 'orange',
    bgColor: 'bg-orange-500',
    bgLightColor: 'bg-orange-50',
    textColor: 'text-orange-500',
    textLightColor: 'text-orange-50',
    borderColor: 'border-orange-500',
    borderLightColor: 'border-orange-50'
  },
  {
    color: 'amber',
    bgColor: 'bg-amber-700',
    bgLightColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    textLightColor: 'text-amber-50',
    borderColor: 'border-amber-700',
    borderLightColor: 'border-amber-50'
  },
  {
    color: 'yellow',
    bgColor: 'bg-yellow-500',
    bgLightColor: 'bg-yellow-50',
    textColor: 'text-yellow-500',
    textLightColor: 'text-yellow-50',
    borderColor: 'border-yellow-500',
    borderLightColor: 'border-yellow-50'
  }
];

export const SessionDurations: any[] = [
  {
    label:"15 minutes",
    value: "15"
  },
  {
    label:"30 minutes",
    value: "30"
  },
  {
    label:"45 minutes",
    value: "45"
  },
  {
    label:"1 heure",
    value: "60"
  },
  {
    label:"1 heure 15 minutes",
    value: "75"
  },
  {
    label:"1 heure 30 minutes",
    value: "90"
  },
  {
    label:"1 heure 45 minutes",
    value: "105"
  },
  {
    label:"2 heures",
    value: "120"
  }
];

export const NON_SPECIFIED_SERVICE: Service = {
  id: 'xxxxx-xxxxx-xxxxx-xxxxx',
  name: 'Non Spécifié',
  color: 'stone',
  duration: '',
  tarif: '',
  createdAt: new Date()
}

