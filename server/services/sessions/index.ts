'use server';

import { CreateSessionInput, Session, SessionsListingFilters } from '@/lib/types/patients/sessions';
import { isAuth } from '@/server/services/common/middelwares';
import { prisma } from '@/lib/prisma';
import { ServerResponse } from '@/lib/types';
import { transformSessionListingFilters } from '@/server/services/sessions/helpers';
import { addMinutesToDate, zodValidationData } from '@/lib/utils';
import { createSessionSchema } from '@/lib/schemas/patients/sessions';
import { omit } from 'ramda';

export const getFilteredSessions = async (filters: SessionsListingFilters): Promise<ServerResponse<Session[]>> => {
  try {
    await isAuth();
    const {
      where
    } = transformSessionListingFilters(filters);

    // @ts-ignore
    const sessions = (await prisma.session.findMany({
      where,
      include: {
        treatment: {
          include: {
            service: true,
            patient: true,
            responsible: true
          }
        },
      }
    })) as Session[];

    return { ok: true, data: sessions };
  } catch (error: any) {
    console.log('error', error);
    return { ok: false, error: error.message as string };
  }
}

export const createSession = async (data: CreateSessionInput): Promise<ServerResponse<Session>> => {
  try {
    const session = await isAuth();
    const userId = session.user.id;

    const validData = (await zodValidationData(
      data,
      createSessionSchema,
    )) as CreateSessionInput;

    const dateStartTime = new Date(data.startTime);
    const dateEndTime = addMinutesToDate(dateStartTime, data.duration);

    // @ts-ignore
    const createdSession = (await prisma.session.create({
      data: {
        ...omit(['duration', 'treatmentId'],validData),
        startTime: dateStartTime,
        endTime: dateEndTime,
        treatment: {
          connect: {
            id: validData.treatmentId
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
        treatment: {
          include: {
            service: true,
            patient: true,
            responsible: true
          }
        },
      }
    })) as Session;

    return { ok: true, data: createdSession };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
}