import { Prisma } from '@prisma/client';
import { SessionsListingFilters } from '@/lib/types/patients/sessions';

export const transformSessionListingFilters = (filters: SessionsListingFilters) => {
  const where: Prisma.SessionWhereInput = {
    startTime: {
      gte: filters.from as Date
    },
    endTime: {
      lte: filters.to as Date
    }
  };

  if (filters.responsible.length > 0) {
    where.treatment = {
      responsibleId: {
        in: filters.responsible
      }
    }
  };

  return {
    where
  }
}