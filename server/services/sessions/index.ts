'use server';

import { CreateSessionInput, Session, SessionsListingFilters, UpdateSessionInput } from '@/lib/types/patients/sessions';
import { isAuth } from '@/server/services/common/middelwares';
import { prisma } from '@/lib/prisma';
import { ServerResponse } from '@/lib/types';
import { transformSessionListingFilters } from '@/server/services/sessions/helpers';
import { addMinutesToDate, zodValidationData } from '@/lib/utils';
import { createSessionSchema, updateSessionSchema } from '@/lib/schemas/patients/sessions';
import { omit } from 'ramda';
import { UpdateSession } from 'next-auth/react';

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
            patient: {
              include: {
                treatments: {
                  include: {
                    service: true
                  }
                }
              }
            },
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
        ...omit(['treatmentId'],validData),
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
            patient: {
              include: {
                treatments: {
                  include: {
                    service: true
                  }
                }
              }
            },
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

export const updateSession = async (id: string, data: UpdateSessionInput): Promise<ServerResponse<Session>> => {
  try {
    const session = await isAuth();
    const userId = session.user.id;

    const validData = (await zodValidationData(
      data,
      updateSessionSchema,
    )) as UpdateSessionInput;

    const dateStartTime = new Date(data.startTime);
    const dateEndTime = addMinutesToDate(dateStartTime, data.duration);

    // @ts-ignore
    const updatedSession = (await prisma.session.update({
      where: {
        id
      },
      data: {
        ...omit(['treatmentId'],validData),
        startTime: dateStartTime,
        endTime: dateEndTime,
        treatment: {
          connect: {
            id: validData.treatmentId
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
            patient: {
              include: {
                treatments: {
                  include: {
                    service: true
                  }
                }
              }
            },
            responsible: true
          }
        },
      }
    })) as Session;

    return { ok: true, data: updatedSession };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
}