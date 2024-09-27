'use server';

import { ServerResponse } from '@/lib/types';
import { isOwner } from '@/server/services/common/middelwares';
import { zodValidationData } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { CreateServiceInput, Service } from '@/lib/types/services';
import { createServiceSchema } from '@/lib/schemas/services';

export const createService = async (
  data: CreateServiceInput,
): Promise<ServerResponse<Service>> => {
  try {
    const session = await isOwner();
    const cabinetId = session.user.cabinetId;

    const validData = (await zodValidationData(
      data,
      createServiceSchema,
    )) as CreateServiceInput;

    const serviceExists = await prisma.service.findUnique({
      where: {
        color: validData.color,
      },
    });
    if (serviceExists) {
      throw new Error('SERVICE_COLOR_ALREADY_EXISTS');
    }

    // @ts-ignore
    const createdService = (await prisma.service.create({
      data: {
        ...validData,
        cabinet: {
          connect: {
            id: cabinetId
          }
        }
      },

    })) as Service;

    return { ok: true, data: createdService };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};