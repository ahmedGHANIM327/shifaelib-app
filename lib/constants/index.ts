import { WeekOpeningHours } from '../types';

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

