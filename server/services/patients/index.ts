'use server';

import { PaginatedServerData, ServerResponse } from '@/lib/types';
import { isAuth } from '@/server/services/common/middelwares';
import { isValidUUIDv4, zodValidationData } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import {
  CreateOrUpdatePatientInput,
  Patient,
  PatientListingFilters,
  PatientListingPagination
} from '@/lib/types/patients';
import { createOrUpdatePatientSchema } from '@/lib/schemas/patients';
import { transformListingFilters } from '@/server/services/patients/helpers';

export const createPatient = async (
  data: CreateOrUpdatePatientInput,
): Promise<ServerResponse<Patient>> => {
  try {
    const session = await isAuth();
    const userId = session.user.id;

    const validData = (await zodValidationData(
      data,
      createOrUpdatePatientSchema,
    )) as CreateOrUpdatePatientInput;

    // @ts-ignore
    const createdPatient = (await prisma.patient.create({
      data: {
        ...validData,
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

    })) as Patient;

    return { ok: true, data: createdPatient };
  } catch (error: any) {
    console.log('error', error);
    return { ok: false, error: error.message as string };
  }
};

export const updatePatient = async (
  id: string,
  data: CreateOrUpdatePatientInput,
): Promise<ServerResponse<Patient>> => {
  try {
    const session = await isAuth();
    const userId = session.user.id;

    isValidUUIDv4(id);

    const validData = (await zodValidationData(
      data,
      createOrUpdatePatientSchema,
    )) as CreateOrUpdatePatientInput;

    // @ts-ignore
    const updatedPatient = (await prisma.patient.update({
      where: {
        id,
      },
      data: {
        ...validData,
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
    })) as Patient;

    return { ok: true, data: updatedPatient };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const deletePatient = async (id: string): Promise<ServerResponse<Patient>> => {
  try {
    isValidUUIDv4(id);
    await isAuth();

    const patient = (await prisma.patient.delete({
      where: {
        id,
      },
    })) as Patient;

    if (!patient) {
      throw new Error('PATIENT_NOT_FOUND');
    }

    return { ok: true, data: patient };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const getFilteredPatients = async (
  filters: PatientListingFilters,
  pagination: PatientListingPagination
): Promise<ServerResponse<PaginatedServerData<Patient[]>>> => {
  try {
    await isAuth();
    const {
      where,
      orderBy
    } = transformListingFilters(filters);
    const skip = (pagination.page - 1) * pagination.nbItemPerPage;
    const take = pagination.nbItemPerPage;
    const patients = (await prisma.patient.findMany({
      take,
      skip,
      where,
      orderBy,
      include: {
        createdByUser: true,
        updatedByUser: true,
      }
    })) as Patient[];

    const count = await prisma.patient.count({
      where
    });
    const nbPages = Math.ceil(count / pagination.nbItemPerPage);

    const response = {
      data: patients,
      nbPages
    };

    return { ok: true, data: response };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
}