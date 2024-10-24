import React, { FC } from 'react';
import { Payment } from '@/lib/types/patients/paiments';
import { DeletePayment } from '@/components/dashboard/patients/paiments/components/DeletePayment';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import useUserStore from '@/stores/user';

export const FichePaymentComponent:FC<{ payment: Payment }> = ({ payment }) => {
  const cabinetUsers = useUserStore((state) => state.cabinetUsers);
  const createdByUser = payment.createdByUser || cabinetUsers.find(u => u.id === payment.createdBy) || null;
  return (
    <div className='bg-accent flex justify-between items-center px-2 py-1'>
      <p className='font-mono text-green-700 font-semibold'>{payment.amount} MAD</p>
      <p className='font-mono'>par <UserHoverCard user={createdByUser} /></p>
      <p className='font-mono'>le {format(payment.createdAt, "dd LLL y - HH:mm", { locale: fr })}</p>
      <DeletePayment id={payment.id} />
    </div>
  );
};