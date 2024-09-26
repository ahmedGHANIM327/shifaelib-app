'use server';

import { prisma } from '@/lib/prisma';
import {
  createCabinetSchema,
  updateCabinetSchema,
  weekOpeningHoursSchema,
} from '@/lib/schemas/cabinet';
import bcrypt from 'bcryptjs';
import { omit } from 'next/dist/shared/lib/router/utils/omit';
import { zodValidationData } from '@/lib/utils';
import { ServerResponse } from '@/lib/types';
import {
  Cabinet,
  CreateCabinetInput,
  UpdateCabinetInput,
  WeekOpeningHoursInput,
} from '@/lib/types/cabinet';
import { isAuth, isOwner } from '@/server/services/common/middelwares';

export const createCabinet = async (
  data: CreateCabinetInput,
): Promise<ServerResponse<Cabinet>> => {
  try {
    const cabinetExists = await prisma.cabinet.findFirst();
    if (cabinetExists) {
      return { ok: false, error: 'CABINET_ALREADY_CREATED' };
    }

    const { owner, ...cabinetData } = (await zodValidationData(
      data,
      createCabinetSchema,
    )) as CreateCabinetInput;

    const hashedPassword = await bcrypt.hash(owner.password, 10);

    // @ts-ignore
    const createdCabinet = await prisma.cabinet.create({
      data: {
        ...cabinetData,
        users: {
          create: {
            ...omit(owner, ['confirmPassword']),
            password: hashedPassword,
            isOwner: true,
          },
        },
      },
      include: {
        users: true,
      },
    });

    return { ok: true, data: JSON.parse(JSON.stringify(createdCabinet)) };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const getCabinet = async (): Promise<ServerResponse<Cabinet>> => {
  try {
    const cabinet = await prisma.cabinet.findFirst({
      include: {
        users: true,
        services: true,
      },
    });

    if (!cabinet) {
      return { ok: false, error: 'NO_CABINET_FOUNDED' };
    }

    return { ok: true, data: JSON.parse(JSON.stringify(cabinet)) };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const getCurrentCabinet = async (): Promise<ServerResponse<Cabinet>> => {
  try {
    await isAuth();

    const cabinet = (await prisma.cabinet.findFirst({
      include: {
        users: true,
        services: true,
      },
    })) as Cabinet;

    if (!cabinet) {
      return { ok: false, error: 'NO_CABINET_FOUNDED' };
    }

    return { ok: true, data: cabinet };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const deleteCabinet = async (): Promise<ServerResponse<Cabinet>> => {
  try {
    const cabinet = (await prisma.cabinet.findFirst()) as Cabinet;

    if (!cabinet) {
      return { ok: false, error: 'NO_CABINET_FOUNDED' };
    }

    await prisma.cabinet.delete({
      where: {
        id: cabinet.id,
      },
    });

    return { ok: true, data: JSON.parse(JSON.stringify(cabinet)) };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updateCabinet = async (
  data: UpdateCabinetInput,
): Promise<ServerResponse<Cabinet>> => {
  try {
    const session = await isOwner();
    const cabinetId = session.user.cabinetId;

    const validData = (await zodValidationData(
      data,
      updateCabinetSchema,
    )) as UpdateCabinetInput;

    // @ts-ignore
    const updatedCabinet = (await prisma.cabinet.update({
      where: {
        id: cabinetId,
      },
      data: validData,
      include: {
        services: true,
        users: true,
      },
    })) as Cabinet;

    return { ok: true, data: JSON.parse(JSON.stringify(updatedCabinet)) };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updateCabinetLogo = async (
  logo: string,
): Promise<ServerResponse<Cabinet>> => {
  try {
    const session = await isOwner();
    const cabinetId = session.user.cabinetId;

    // @ts-ignore
    const updatedCabinet = (await prisma.cabinet.update({
      where: {
        id: cabinetId,
      },
      data: {
        logo
      },
      include: {
        services: true,
        users: true,
      },
    })) as Cabinet;

    return { ok: true, data: updatedCabinet };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updateOpeningHoursCabinet = async (
  data: WeekOpeningHoursInput,
): Promise<ServerResponse<Cabinet>> => {
  try {
    const session = await isOwner();
    const cabinetId = session.user.cabinetId;

    const validData = (await zodValidationData(
      data,
      weekOpeningHoursSchema,
    )) as WeekOpeningHoursInput;

    // @ts-ignore
    const updatedCabinet = (await prisma.cabinet.update({
      where: {
        id: cabinetId,
      },
      data: {
        openingHours: validData,
      },
      include: {
        services: true,
        users: true,
      },
    })) as Cabinet;

    return { ok: true, data: updatedCabinet };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};
