import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    cabinetId: string;
    isOwner: boolean;
  }
  interface Session {
    user: User & {
      id: string;
      cabinetId: string;
      isOwner: boolean;
    };
    token: {
      id: string;
      cabinetId: string;
      isOwner: boolean;
    };
  }
}
