'use server';

import { Session, SessionsListingFilters } from '@/lib/types/patients/sessions';
import { isAuth } from '@/server/services/common/middelwares';
import { prisma } from '@/lib/prisma';
import { ServerResponse } from '@/lib/types';
import { transformSessionListingFilters } from '@/server/services/sessions/helpers';

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
    return { ok: false, error: error.message as string };
  }
}