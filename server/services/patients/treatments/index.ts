'use server';

import { ListingPagination, PaginatedServerData, ServerResponse } from '@/lib/types';
import { isAuth } from '@/server/services/common/middelwares';
import { generateCode, isValidUUIDv4, zodValidationData } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { CreateOrUpdateTreatmentInput, Treatment, TreatmentListingFilters } from '@/lib/types/patients/treatments';
import { createOrUpdateTreatmentSchema } from '@/lib/schemas/patients/treatments';
import { transformTreatmentListingFilters } from '@/server/services/patients/treatments/helpers';
import { CreateOrUpdatePatientInput, Patient } from '@/lib/types/patients';
import { createOrUpdatePatientSchema } from '@/lib/schemas/patients';

export const createTreatment = async (
  data: CreateOrUpdateTreatmentInput,
): Promise<ServerResponse<Treatment>> => {
  try {
    const session = await isAuth();
    const userId = session.user.id;

    const validData = (await zodValidationData(
      data,
      createOrUpdateTreatmentSchema,
    )) as CreateOrUpdateTreatmentInput;

    // @ts-ignore
    const createdTreatment = (await prisma.treatment.create({
      data: {
        nbSessions: validData.nbSessions,
        data: validData.data,
        code: generateCode(),
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
        responsible: true,
        patient: true,
        service: true,
        createdByUser: true,
        updatedByUser: true,
      }
    })) as Treatment;

    return { ok: true, data: createdTreatment };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updateTreatment = async (
  id: string,
  data: CreateOrUpdateTreatmentInput,
): Promise<ServerResponse<Treatment>> => {
  try {
    const session = await isAuth();
    const userId = session.user.id;

    isValidUUIDv4(id);

    const validData = (await zodValidationData(
      data,
      createOrUpdateTreatmentSchema,
    )) as CreateOrUpdateTreatmentInput;

    // @ts-ignore
    const updatedTreatment = (await prisma.treatment.update({
      where: {
        id,
      },
      data: {
        nbSessions: validData.nbSessions,
        status: validData.status,
        data: validData.data,
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
    })) as Treatment;

    return { ok: true, data: updatedTreatment };
  } catch (error: any) {
    console.log('error', error);
    return { ok: false, error: error.message as string };
  }
};

export const getFilteredTreatments = async (
  filters: TreatmentListingFilters,
  pagination: ListingPagination
): Promise<ServerResponse<PaginatedServerData<Treatment[]>>> => {
  try {
    await isAuth();
    const {
      where,
      orderBy
    } = transformTreatmentListingFilters(filters);
    const skip = (pagination.page - 1) * pagination.nbItemPerPage;
    const take = pagination.nbItemPerPage;
    // @ts-ignore
    const treatments = (await prisma.treatment.findMany({
      take,
      skip,
      where,
      orderBy,
      include: {
        patient: true,
        service: true,
        responsible: true,
        createdByUser: true,
        updatedByUser: true,
      }
    })) as Treatment[];

    // @ts-ignore
    const count = await prisma.treatment.count({
      where
    });
    const nbPages = Math.ceil(count / pagination.nbItemPerPage);

    const response = {
      data: treatments,
      nbPages
    };

    return { ok: true, data: response };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
}