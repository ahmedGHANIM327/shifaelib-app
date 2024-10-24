'use server';

import { PaginatedServerData, ServerResponse } from '@/lib/types';
import { isAuth } from '@/server/services/common/middelwares';
import { isValidUUIDv4, removeDuplicationById, zodValidationData } from '@/lib/utils';
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
    // @ts-ignore
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

    // @ts-ignore
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

export const searchPatientsV2 = async (
  search: string,
  take: number,
  id?: string,
): Promise<ServerResponse<Patient[]>> => {
  try {
    await isAuth();

    let patients: Patient[] = []
    if(search !== '') {
      if(id && id !== '') {
        const selectedPatient = (await prisma.patient.findUnique({
          where: {
            id
          },
          include: {
            createdByUser: true,
            updatedByUser: true,
            treatments: {
              include: {
                service: true
              }
            }
          }
        })) as Patient;
        patients = (await prisma.patient.findMany({
          take,
          where: {
            OR: [
              {
                firstName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          },
          include: {
            createdByUser: true,
            updatedByUser: true,
            treatments: {
              include: {
                service: true
              }
            }
          }
        })) as Patient[];
        patients = removeDuplicationById([selectedPatient, ...patients]);
      } else {
        patients = (await prisma.patient.findMany({
          take,
          where: {
            OR: [
              {
                firstName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          },
          include: {
            createdByUser: true,
            updatedByUser: true,
            treatments: {
              include: {
                service: true
              }
            }
          }
        })) as Patient[];
      }
    } else {
      patients = (await prisma.patient.findMany({
        take,
        include: {
          createdByUser: true,
          updatedByUser: true,
          treatments: {
            include: {
              service: true
            }
          }
        }
      })) as Patient[];
    }
    return { ok: true, data: patients };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
}

export const getPatientById = async (id: string): Promise<ServerResponse<Patient>> => {
  try {
    await isAuth();
    isValidUUIDv4(id);

    const patient = (await prisma.patient.findUnique({
      where: {
        id,
      },
      include: {
        createdByUser: true,
        updatedByUser: true,
        treatments: {
          include: {
            sessions: {
              include: {
                payments: true,
                treatment: {
                  include: {
                    service: true,
                    patient: true,
                    responsible: true
                  }
                },
              }
            },
            payments: {
              include: {
                createdByUser: true
              }
            },
            service: true,
            responsible: true,
            createdByUser: true,
            updatedByUser: true,
          }
        },
      }
    })) as Patient;

    if (!patient) {
      throw new Error('PATIENT_NOT_FOUND');
    }

    return { ok: true, data: patient };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};