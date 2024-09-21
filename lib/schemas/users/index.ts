import { z } from 'zod';

export const createUserSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'Le prénom est requis',
        invalid_type_error: 'Le type du prénom est invalid',
      })
      .min(1, 'Le prénom est requis'),
    lastName: z
      .string({
        required_error: 'Le nom est requis',
        invalid_type_error: 'Le type du nom est invalid',
      })
      .min(1, 'Le nom est requis'),
    email: z
      .string({
        required_error: 'L adresse e-mail est requise',
        invalid_type_error: 'Adresse e-mail invalide',
      })
      .email('Adresse e-mail invalide'),
    password: z
      .string({
        required_error: 'Le mot de passe est requis',
        invalid_type_error: 'Le mot de passe est invalid',
      })
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
      .refine(
        (value) => {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return regex.test(value);
        },
        {
          message: 'Mot de passe invalide.',
        },
      ),
    confirmPassword: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
    phone: z.string().optional(),
    gender: z.enum(['M', 'F'], {
      required_error: 'Le genre est requis',
      invalid_type_error: 'Le genre doit être M ou F',
      message: 'Le genre doit être M ou F',
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
      });
    }
  });

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: 'L adresse e-mail est requise',
      invalid_type_error: 'Adresse e-mail invalide',
    })
    .email('Adresse e-mail invalide'),
  password: z
    .string({
      required_error: 'Le mot de passe est requis',
      invalid_type_error: 'Le mot de passe est invalid',
    })
    .min(1, 'Le mot de passe est requis.'),
});

export const updateCurrentUserSchema = z.object({
  firstName: z
    .string({
      required_error: 'Le prénom est requis',
      invalid_type_error: 'Le type du prénom est invalid',
    })
    .min(1, 'Le prénom est requis'),
  lastName: z
    .string({
      required_error: 'Le nom est requis',
      invalid_type_error: 'Le type du nom est invalid',
    })
    .min(1, 'Le nom est requis'),
  email: z
    .string({
      required_error: 'L adresse e-mail est requise',
      invalid_type_error: 'Adresse e-mail invalide',
    })
    .email('Adresse e-mail invalide'),
  phone: z.string().optional(),
  gender: z.enum(['M', 'F'], {
    required_error: 'Le genre est requis',
    invalid_type_error: 'Le genre doit être M ou F',
    message: 'Le genre doit être M ou F',
  }),
});

export const updateUserSchema = z.object({
  firstName: z
    .string({
      required_error: 'Le prénom est requis',
      invalid_type_error: 'Le type du prénom est invalid',
    })
    .min(1, 'Le prénom est requis'),
  lastName: z
    .string({
      required_error: 'Le nom est requis',
      invalid_type_error: 'Le type du nom est invalid',
    })
    .min(1, 'Le nom est requis'),
  email: z
    .string({
      required_error: 'L adresse e-mail est requise',
      invalid_type_error: 'Adresse e-mail invalide',
    })
    .email('Adresse e-mail invalide'),
  phone: z.string().optional(),
  status: z.enum(['ACTIF', 'BLOCKED'], {
    required_error: 'Le status est requis',
    invalid_type_error: 'Le status doit être ACTIF ou BLOCKED',
    message: 'Le status doit être ACTIF ou ACTIF',
  }),
  gender: z.enum(['M', 'F'], {
    required_error: 'Le genre est requis',
    invalid_type_error: 'Le genre doit être M ou F',
    message: 'Le genre doit être M ou F',
  }),
});

export const resetPasswordUserSchema = z
  .object({
    password: z
      .string({
        required_error: 'Le mot de passe est requis',
        invalid_type_error: 'Le mot de passe est invalid',
      })
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
      .refine(
        (value) => {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return regex.test(value);
        },
        {
          message: 'Mot de passe invalide.',
        },
      ),
    confirmPassword: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
      });
    }
  });

export const requestResetPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'L adresse e-mail est requise',
      invalid_type_error: 'Adresse e-mail invalide',
    })
    .email('Adresse e-mail invalide'),
});

export const updatePasswordUserSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Le mot de passe est requis.'),
    password: z
      .string({
        required_error: 'Le mot de passe est requis',
        invalid_type_error: 'Le mot de passe est invalid',
      })
      .min(8, 'Le mot de passe est requis.')
      .refine(
        (value) => {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return regex.test(value);
        },
        {
          message: 'Mot de passe invalide.',
        },
      ),
    confirmPassword: z
      .string()
      .min(8, 'Le mot de passe est requis.'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
      });
    }
  });
