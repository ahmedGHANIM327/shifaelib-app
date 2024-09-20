import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
  }
  interface Session {
    user: User & {
      id: string;
      cabinetId: string;
    };
    token: {
      id: string;
      cabinetId: string;
    };
  }
}
