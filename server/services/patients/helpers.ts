import { PatientListingFilters } from '@/lib/types/patients';

export const transformListingFilters = (filters: PatientListingFilters) => {
  const where = {
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
    where['gender'] = filters.gender;
  };

  if (filters.createdBy.length > 0) {
    where['createdBy'] = {in: filters.createdBy};
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