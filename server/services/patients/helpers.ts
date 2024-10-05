import { PatientListingFilters } from '@/lib/types/patients';

interface WhereFilter {
  OR?: Array<{
    firstName?: { contains: string; mode: string };
    lastName?: { contains: string; mode: string };
  }>;
  gender?: string;
  createdBy?: { in: string[] };
}

export const transformListingFilters = (filters: PatientListingFilters) => {
  const where: Partial<WhereFilter> = {
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

  let orderBy;
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