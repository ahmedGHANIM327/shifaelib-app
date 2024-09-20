'use server';

import bcrypt from 'bcryptjs';
import { isValidUUIDv4, zodValidationData } from '@/lib/utils';
import {
  createUserSchema,
  loginUserSchema,
  requestResetPasswordSchema,
  resetPasswordUserSchema,
  updatePasswordUserSchema,
  updateUserSchema,
} from '@/lib/schemas/users';
import {
  CreateUserInput,
  LoginUserType,
  RequestResetPasswordUserInput,
  ResetPasswordUserInput,
  UpdatePasswordUserInput,
  UpdateUserInput,
  User,
} from '@/lib/types/users';
import { prisma } from '@/lib/prisma';
import { omit } from 'ramda';
import { checkLoginStatus } from '@/server/services/users/helpers';
import { signIn, signOut } from '@/auth';
import { ServerResponse } from '@/lib/types';
import { validateAuthSession } from '@/server/services/common/helpers';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import { ResetPassword } from '@/lib/email-templates/reset-password';

export const loginUser = async (data: LoginUserType) => {
  try {
    const { email, password } = (await zodValidationData(
      data,
      loginUserSchema,
    )) as LoginUserType;

    const user: User = (await prisma.user.findUnique({
      where: {
        email: email,
      },
      omit: {
        password: false,
      },
      include: {
        cabinet: {
          include: {
            services: true,
          },
        },
      },
    })) as User;

    if (!user) return { ok: false, error: 'INVALID_CREDENTIALS' };

    const comparPasswords = await bcrypt.compare(password, user.password!);
    if (!comparPasswords) return { ok: false, error: 'INVALID_CREDENTIALS' };

    // check user status
    checkLoginStatus(user);

    await signIn('credentials', { email, password, redirect: false });

    return { ok: true, data: omit(['password'], user) };
  } catch (error) {
    return { ok: false, error: error.message };
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
        cabinet: {
          include: {
            services: true,
          },
        },
      },
    })) as User;

    if (!user) throw new Error('USER_NOT_FOUND');

    return { ok: true, data: user };
  } catch (error) {
    return { ok: false, error: error.message };
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

    const resendKey = (process.env.RESEND_API || '') as string;
    const secretKey = (process.env.JWT_SECRET_KEY || '') as string;
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}&email=${email}`;
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject:
        'Demande de réinitialisation de votre mot de passe sur Medical SaaS',
      html: `<a href="${resetLink}">Réinitialiser votre mot de passe sur Medical SaaS</a>`,
      react: ResetPassword({ email, url: resetLink }),
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const resetPasswordUser = async (
  data: ResetPasswordUserInput,
  token: string,
): Promise<ServerResponse> => {
  try {
    const secretKey = (process.env.JWT_SECRET_KEY || '') as string;
    const res = jwt.verify(token, secretKey);
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
  } catch (error) {
    if (error && error.message.includes('jwt')) {
      return { ok: false, error: 'INVALID_TOKEN' };
    }
    return { ok: false, error: error.message };
  }
};

export const getCurrentUser = async (): Promise<ServerResponse<User>> => {
  try {
    const session = await validateAuthSession();
    const id = session?.user.id!;
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
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getCabinetUsers = async (): Promise<ServerResponse<User[]>> => {
  try {
    await validateAuthSession();

    const users = (await prisma.user.findMany()) as User[];

    return { ok: true, data: users };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getUserById = async (
  id: string,
): Promise<ServerResponse<User>> => {
  try {
    isValidUUIDv4(id);

    await validateAuthSession();

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
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const createUser = async (
  data: CreateUserInput,
): Promise<ServerResponse<User>> => {
  try {
    const session = await validateAuthSession();
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
      return { ok: false, error: 'USER_EMAIL_ALREADY_EXISTS' };
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    // @ts-ignore
    const createdUser = await prisma.user.create({
      data: {
        ...omit(['confirmPassword'], validData),
        password: hashedPassword,
        cabinet: {
          connect: {
            id: cabinetId,
          },
        },
      },
    });

    return { ok: true, data: JSON.parse(JSON.stringify(createdUser)) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const deleteUser = async (id: string): Promise<ServerResponse<User>> => {
  try {
    isValidUUIDv4(id);
    await validateAuthSession();

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
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const updateUser = async (
  id: string,
  data: UpdateUserInput,
): Promise<ServerResponse<User>> => {
  try {
    isValidUUIDv4(id);
    await validateAuthSession();

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
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const updateCurrentUser = async (
  data: UpdateUserInput,
): Promise<ServerResponse<User>> => {
  try {
    const session = await validateAuthSession();
    const id = session.user.id;

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
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const updatePasswordUser = async (
  id: string,
  data: UpdatePasswordUserInput,
): Promise<ServerResponse<User>> => {
  try {
    await validateAuthSession();
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
      user.password,
    );
    if (!comparPasswords) throw new Error('INCORRECT_PASSWORD');

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
        isTemporaryPassword: false,
      },
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const updateCurrentPasswordUser = async (
  data: UpdatePasswordUserInput,
): Promise<ServerResponse<User>> => {
  try {
    const session = await validateAuthSession();
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
      user.password,
    );
    if (!comparPasswords) throw new Error('INCORRECT_PASSWORD');

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
