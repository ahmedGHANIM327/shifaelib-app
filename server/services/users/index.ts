'use server';

import bcrypt from 'bcryptjs';
import { isValidUUIDv4, zodValidationData } from '@/lib/utils';
import {
  createUserSchema,
  loginUserSchema,
  requestResetPasswordSchema,
  resetPasswordUserSchema, updateCurrentUserSchema,
  updatePasswordUserSchema,
  updateUserSchema
} from '@/lib/schemas/users';
import {
  CreateUserInput,
  LoginUserType,
  RequestResetPasswordUserInput, ResetPasswordJwtPayload,
  ResetPasswordUserInput, UpdateCurrentUserInput,
  UpdatePasswordUserInput,
  UpdateUserInput,
  User
} from '@/lib/types/users';
import { prisma } from '@/lib/prisma';
import { omit } from 'ramda';
import { checkLoginStatus } from '@/server/services/users/helpers';
import { signIn } from '@/auth';
import { ServerResponse } from '@/lib/types';
import jwt from 'jsonwebtoken';
import { sendNewUserAccountEmail, sendRequestResetPasswordEmail } from '@/server/services/emails';
import { isAuth, isOwner } from '@/server/services/common/middelwares';

export const loginUser = async (data: LoginUserType) => {
  try {
    const { email, password } = (await zodValidationData(
      data,
      loginUserSchema,
    )) as LoginUserType;

    const user: User = (await prisma.user.findUnique({
      where: {
        email: email
      },
      omit: {
        password: false,
      },
      include: {
        cabinet: {
          include: {
            users: true,
            services: true
          }
        }
      },
    })) as User;

    if (!user) return { ok: false, error: 'INVALID_CREDENTIALS' };

    const comparPasswords = await bcrypt.compare(password, user.password!);
    if (!comparPasswords) return { ok: false, error: 'INVALID_CREDENTIALS' };

    // check user status
    checkLoginStatus(user);

    await signIn('credentials', { email, password, redirect: false });

    return { ok: true, data: omit(['password'], user) };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const getUserByEmail = async (
  email: string,
): Promise<ServerResponse<User>> => {
  try {
    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        cabinet: true
      },
    })) as User;

    if (!user) throw new Error('USER_NOT_FOUND');

    return { ok: true, data: user };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const requestResetPassword = async (
  data: RequestResetPasswordUserInput,
): Promise<ServerResponse> => {
  try {
    const { email } = (await zodValidationData(
      data,
      requestResetPasswordSchema,
    )) as RequestResetPasswordUserInput;

    const user = (await prisma.user.findUnique({
      where: {
        email: email,
      },
    })) as User;

    if (!user) return { ok: true };

    await sendRequestResetPasswordEmail(user.id, email);
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const resetPasswordUser = async (
  data: ResetPasswordUserInput,
  token: string,
): Promise<ServerResponse> => {
  try {
    const secretKey = (process.env.JWT_SECRET_KEY || '') as string;
    const res: ResetPasswordJwtPayload = jwt.verify(token, secretKey) as ResetPasswordJwtPayload;
    if (!res?.id) {
      throw new Error('INVALID_TOKEN');
    }
    const id = res.id as string;

    const validData = (await zodValidationData(
      data,
      resetPasswordUserSchema,
    )) as ResetPasswordUserInput;

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (!updatedUser) {
      throw new Error('USER_NOT_FOUND');
    }

    return { ok: true };
  } catch (error: any) {
    if (error && error.message.includes('jwt') as string) {
      return { ok: false, error: 'INVALID_TOKEN' };
    }
    return { ok: false, error: error.message as string };
  }
};

export const getCurrentUser = async (): Promise<ServerResponse<User>> => {
  try {
    const session = await isAuth();
    const id = session?.user.id!;
    const user = (await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        cabinet: {
          include: {
            users: true,
            services: true
          }
        }
      },
    })) as User;

    if (!user) throw new Error('USER_NOT_FOUND');

    return { ok: true, data: user };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const getCabinetUsers = async (): Promise<ServerResponse<User[]>> => {
  try {
    await isAuth();

    const users = (await prisma.user.findMany()) as User[];

    return { ok: true, data: users };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const getUserById = async (
  id: string,
): Promise<ServerResponse<User>> => {
  try {
    isValidUUIDv4(id);

    await isAuth();

    const user = (await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        cabinet: {
          include: {
            services: true,
          },
        },
      },
    })) as User;

    if (!user) throw new Error('USER_NOT_FOUND');

    return { ok: true, data: user };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const createUser = async (
  data: CreateUserInput,
): Promise<ServerResponse<User>> => {
  try {
    const session = await isOwner();
    const cabinetId = session.user.cabinetId;

    const validData = (await zodValidationData(
      data,
      createUserSchema,
    )) as CreateUserInput;

    const userExists = await prisma.user.findUnique({
      where: {
        email: validData.email,
      },
    });
    if (userExists) {
      throw new Error('USER_EMAIL_ALREADY_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    // @ts-ignore
    const createdUser = (await prisma.user.create({
      data: {
        ...omit(['confirmPassword'], validData),
        password: hashedPassword,
        cabinet: {
          connect: {
            id: cabinetId,
          },
        },
      },
    })) as User;

    await sendNewUserAccountEmail(validData.email, validData.password, createdUser?.cabinet?.name as string);

    return { ok: true, data: createdUser };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const deleteUser = async (id: string): Promise<ServerResponse<User>> => {
  try {
    isValidUUIDv4(id);
    await isOwner();

    const user = (await prisma.user.findUnique({
      where: {
        id,
      },
    })) as User;

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return { ok: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updateUser = async (
  id: string,
  data: UpdateUserInput,
): Promise<ServerResponse<User>> => {
  try {
    isValidUUIDv4(id);
    await isOwner();

    const validData = (await zodValidationData(
      data,
      updateUserSchema,
    )) as UpdateUserInput;

    // @ts-ignore
    const updatedUser = (await prisma.user.update({
      where: {
        id,
      },
      data: validData,
    })) as User;

    if (!updatedUser) {
      throw new Error('USER_NOT_FOUND');
    }

    return { ok: true, data: updatedUser };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updateCurrentUser = async (
  data: UpdateCurrentUserInput,
): Promise<ServerResponse<User>> => {
  try {
    const session = await isAuth();
    const id = session.user.id;

    const validData = (await zodValidationData(
      data,
      updateCurrentUserSchema,
    )) as UpdateCurrentUserInput;

    // @ts-ignore
    const updatedUser = (await prisma.user.update({
      where: {
        id,
      },
      data: validData,
      include: {
        cabinet: true
      },
    })) as User;

    if (!updatedUser) {
      throw new Error('USER_NOT_FOUND');
    }

    return { ok: true, data: updatedUser };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updatePasswordUser = async (
  id: string,
  data: UpdatePasswordUserInput,
): Promise<ServerResponse<User>> => {
  try {
    await isOwner();
    isValidUUIDv4(id);

    const validData = (await zodValidationData(
      data,
      updatePasswordUserSchema,
    )) as UpdatePasswordUserInput;

    const user = (await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: false,
      },
    })) as User;

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    // compar old password
    const comparPasswords = await bcrypt.compare(
      validData.currentPassword,
      user.password! as string,
    );
    if (!comparPasswords) throw new Error('INCORRECT_PASSWORD');

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const updatedUser = (await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
        isTemporaryPassword: false,
      },
      include: {
        cabinet: {
          include: {
            services: true,
          },
        },
      },
    })) as User;

    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};

export const updateCurrentPasswordUser = async (
  data: UpdatePasswordUserInput,
): Promise<ServerResponse<User>> => {
  try {
    const session = await isAuth();
    const id = session.user.id;

    const validData = (await zodValidationData(
      data,
      updatePasswordUserSchema,
    )) as UpdatePasswordUserInput;

    const user = (await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: false,
      },
    })) as User;

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    // compar old password
    const comparPasswords = await bcrypt.compare(
      validData.currentPassword,
      user.password! as string,
    );
    if (!comparPasswords) throw new Error('INCORRECT_PASSWORD');

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const updatedUser = (await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
        isTemporaryPassword: false,
      }
    })) as User;

    return { ok: true, data: updatedUser };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
};
