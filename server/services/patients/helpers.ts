import { PatientListingFilters } from '@/lib/types/patients';
import { Prisma } from '@prisma/client';

export const transformListingFilters = (filters: PatientListingFilters) => {
  const where: Prisma.PatientWhereInput = {
    ...((filters.search !== '') && {
      OR: [
        {
          firstName: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
      ],
    }),
  };

  if (filters.gender !== 'ALL') {
    where.gender = filters.gender;
  };

  if (filters.createdBy.length > 0) {
    where.createdBy = {in: filters.createdBy};
  };

  let orderBy: Prisma.PatientOrderByWithRelationInput;
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