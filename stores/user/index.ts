import { create } from 'zustand';
import { User } from '@/lib/types/users';
import { getCabinetUsers, getCurrentUser } from '@/server/services/users';
import { signOut } from 'next-auth/react';

interface UserState {
  currentUser: User;
  isCurrentUserLoading: boolean;
  getCurrentUser: () => Promise<void>;
  setCurrentUser: (newUser: User) => void;
  cabinetUsers: User[];
  isCabinetUsersLoading: boolean;
  addCabinetUser: (newUser: User) => void;
  updateCabinetUser: (newUser: User) => void;
  deleteCabinetUser: (id: string) => void;
  getCabinetUsers: () => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
  getCurrentUser: async () => {
    set({ isCurrentUserLoading: true });
    const currentUser = window.localStorage.getItem('currentUser');
    if (!currentUser) {
      const response = await getCurrentUser();
      if (response.ok) {
        window.localStorage.setItem(
          'currentUser',
          JSON.stringify(response.data),
        );
        set({ currentUser: response.data });
      } else {
        await signOut();
        set({ currentUser: {} as User });
      }
    } else {
      set({ currentUser: JSON.parse(currentUser) });
    }
    set({ isCurrentUserLoading: false });
  },
  setCurrentUser: (newUser: User) => {
    window.localStorage.setItem('currentUser', JSON.stringify(newUser));
    set({ currentUser: newUser });
  },
  currentUser: {} as User,
  isCurrentUserLoading: false,
  cabinetUsers: [] as User[],
  isCabinetUsersLoading: false,
  addCabinetUser: (newUser: User) => {
    set({ cabinetUsers: [...get().cabinetUsers, newUser] });
  },
  updateCabinetUser: (updatedUser: User) => {
    const users = get().cabinetUsers.filter((user) => user.id !== updatedUser.id);
    set({ cabinetUsers: [...users, updatedUser] });
  },
  deleteCabinetUser: (id: string) => {
    const users = get().cabinetUsers.filter((user) => user.id !== id);
    set({ cabinetUsers: users });
  },
  getCabinetUsers: async () => {
    set({ isCabinetUsersLoading: true });
    const cabinetUsers = get().cabinetUsers as User[];
    if (cabinetUsers.length === 0) {
      const response = await getCabinetUsers();
      if (response.ok) {
        set({ cabinetUsers: response.data });
      } else {
        set({ cabinetUsers: [] as User[] });
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    }
    set({ isCabinetUsersLoading: false });
  },
}));

export default useUserStore;
