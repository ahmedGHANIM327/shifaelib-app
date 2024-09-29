'use server';

import { ServerResponse } from '@/lib/types';
import { isOwner } from '@/server/services/common/middelwares';
import { isValidUUIDv4, zodValidationData } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { CreateOrUpdateServiceInput, Service } from '@/lib/types/services';
import { createServiceSchema } from '@/lib/schemas/services';

export const createService = async (
  data: CreateOrUpdateServiceInput,
): Promise<ServerResponse<Service>> => {
  try {
    const session = await isOwner();
    const cabinetId = session.user.cabinetId;

    const validData = (await zodValidationData(
      data,
      createServiceSchema,
    )) as CreateOrUpdateServiceInput;

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

export const deleteService = async (id: string): Promise<ServerResponse<Service>> => {
  try {
    isValidUUIDv4(id);
    await isOwner();

    const service = (await prisma.service.findUnique({
      where: {
        id,
      },
    })) as Service;

    if (!service) {
      throw new Error('SERVICE_NOT_FOUND');
    }

    await prisma.service.delete({
      where: {
        id,
      },
    });

    return { ok: true, data: service };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updateService = async (
  id: string,
  data: CreateOrUpdateServiceInput,
): Promise<ServerResponse<Service>> => {
  try {
    isValidUUIDv4(id);
    await isOwner();

    const validData = (await zodValidationData(
      data,
      createServiceSchema,
    )) as CreateOrUpdateServiceInput;

    // @ts-ignore
    const updatedService = (await prisma.service.update({
      where: {
        id,
      },
      data: validData,
    })) as Service;

    if (!updatedService) {
      throw new Error('SERVICE_NOT_FOUND');
    }

    return { ok: true, data: updatedService };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};