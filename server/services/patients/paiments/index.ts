'use server';

import { CreateOrUpdatePaymentInput, Payment } from '@/lib/types/patients/paiments';
import { ServerResponse } from '@/lib/types';
import { isAuth } from '@/server/services/common/middelwares';
import { isValidUUIDv4 } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

export const createPayment = async (data: CreateOrUpdatePaymentInput): Promise<ServerResponse<Payment>> => {
  try {
    const session = await isAuth();
    const userId = session.user.id;

    // @ts-ignore
    const createdPayment = (await prisma.payment.create({
      data: {
        amount: data.amount,
        date: new Date(data.date),
        ...(data.sessionId && {
          session: {
            connect: {
              id: data.sessionId
            }
          }
        }),
        treatment: {
          connect: {
            id: data.treatmentId
          }
        },
        createdByUser: {
          connect: {
            id: userId
          }
        },
        updatedByUser: {
          connect: {
            id: userId
          }
        }
      }
    })) as Payment;

    return { ok: true, data: createdPayment };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
}

export const deletePayment = async (id: string): Promise<ServerResponse<Payment>> => {
  try {
    isValidUUIDv4(id);
    await isAuth();

    const deletedPayment = (await prisma.payment.delete({
      where: {
        id,
      },
    })) as Payment;

    return { ok: true, data: deletedPayment };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};