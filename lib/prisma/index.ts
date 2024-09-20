import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    omit: {
      user: {
        password: true,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
