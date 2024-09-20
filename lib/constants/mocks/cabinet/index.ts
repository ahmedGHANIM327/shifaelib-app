import { UpdateCabinetInput } from '@/lib/types/cabinet';

export const createCabinetMock = {
  address: '123 Rue de la Santé',
  subscriptionEndDate: new Date().toISOString(),
  phone: '0123456789',
  email: 'cabinet@example.com',
  speciality: 'Physiothérapie',
  description: 'Un cabinet spécialisé en rééducation.',
  owner: {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    password: 'uxkQ7MFV@2810',
    confirmPassword: 'uxkQ7MFV@2810',
    phone: '0123456789',
    gender: 'M',
  },
};

export const updateCabinetMock: UpdateCabinetInput = {
  name: 'Cabinet Updated',
  address: '123 Rue de la Santé',
  phone: '0123456789',
  email: 'cabinet@example.com',
  speciality: 'Physiothérapie',
  description: 'Un cabinet spécialisé en rééducation.',
};

export const user1Mock = {
  firstName: 'Ahmed',
  lastName: 'GHANIM',
  email: 'ahmedghanim902@gmail.com',
  password: 'uxkQ7MFV@2810',
  confirmPassword: 'uxkQ7MFV@2810',
  phone: '0123456789',
  gender: 'M',
};
