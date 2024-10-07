'use server';

import { ServerResponse } from '@/lib/types';
import { isAuth } from '@/server/services/common/middelwares';
import { zodValidationData } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { CreateOrUpdateTreatmentInput } from '@/lib/types/patients/treatments';
import { createOrUpdateTreatmentSchema } from '@/lib/schemas/patients/treatments';

export const createTreatment = async (
  data: CreateOrUpdateTreatmentInput,
): Promise<ServerResponse<any>> => {
  try {
    const session = await isAuth();
    const userId = session.user.id;

    const validData = (await zodValidationData(
      data,
      createOrUpdateTreatmentSchema,
    )) as CreateOrUpdateTreatmentInput;

    // @ts-ignore
    const createdTreatment = await prisma.treatment.create({
      data: {
        nbSessions: validData.nbSessions,
        data: validData.data,
        code: 'ABCD',
        service: {
          connect: {
            id: validData.service.id
          }
        },
        patient: {
          connect: {
            id: validData.patient.id
          }
        },
        responsible: {
          connect: {
            id: validData.praticien.id
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
      },
      include: {
        createdByUser: true,
        updatedByUser: true,
      }
    });

    console.log('createdTreatment', createdTreatment);
    return { ok: true };
  } catch (error: any) {
    console.log('error', error);
    return { ok: false, error: error.message as string };
  }
};