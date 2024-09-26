'use server';

import { Resend } from 'resend';
import { ResetPassword } from '@/lib/email-templates/reset-password';
import jwt from 'jsonwebtoken';
import { NewUserAccount } from '@/lib/email-templates/new-user-account';
import { ServerResponse } from '@/lib/types';
import { ResetPasswordJwtPayload } from '@/lib/types/users';

export const sendRequestResetPasswordEmail = async (id:string, email: string) => {
  try {
    const secretKey = (process.env.JWT_SECRET_KEY || '') as string;
    const payload: ResetPasswordJwtPayload = {
      id,
    };
    const resendKey = (process.env.RESEND_API || '') as string;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}&email=${email}`;
    const resend = new Resend(resendKey);
    // @ts-ignore
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject:
        'Demande de réinitialisation de votre mot de passe sur Medical SaaS',
      html: `<a href="${resetLink}">Réinitialiser votre mot de passe sur Medical SaaS</a>`,
      react: ResetPassword({ email, url: resetLink }),
    });
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
}

export const sendNewUserAccountEmail = async (email: string, password: string, cabinet: string): Promise<ServerResponse> => {
  try {
    const url = process.env.APP_URL;
    const resendKey = (process.env.RESEND_API || '') as string;
    const resend = new Resend(resendKey);
    // @ts-ignore
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject:
        `Bienvenue chez shifaelib - ${cabinet}`,
      react: NewUserAccount({ cabinet, email, password, url }),
    });
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error.message as string };
  }
}

// Send email when creating new cabinet