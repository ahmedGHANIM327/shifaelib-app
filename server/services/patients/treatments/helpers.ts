import { Prisma } from '@prisma/client';
import { TreatmentListingFilters } from '@/lib/types/patients/treatments';

export const transformTreatmentListingFilters = (filters: TreatmentListingFilters) => {
  const where: Prisma.TreatmentWhereInput = {
    ...((filters.search !== '') && {
      OR: [
        {
          code: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          service: {
            name: {
              contains: filters.search,
              mode: 'insensitive',
            }
          },
        },
      ],
    }),
  };

  if (filters.status !== 'ALL') {
    where.status = filters.status;
  };

  if (filters.responsible.length > 0) {
    where.responsibleId = {in: filters.responsible};
  };

  if (filters.service.length > 0) {
    where.serviceId = {in: filters.service};
  };

  if (filters.patient.length > 0) {
    where.patientId = {in: filters.patient};
  };

  let orderBy: Prisma.TreatmentOrderByWithRelationInput;
  if (filters.sort === 'creation_date_desc') {
    orderBy = {
      createdAt: 'desc',
    };
  } else {
    orderBy = {
      createdAt: 'asc',
    };
  }

  return {
    where,
    orderBy
  }
}