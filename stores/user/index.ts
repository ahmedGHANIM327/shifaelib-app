import { create } from 'zustand';
import { UpdatePasswordUserInput, User } from '@/lib/types/users';
import { getCurrentUser } from '@/server/services/users';
import { signOut } from 'next-auth/react';

interface UserState {
  currentUser: User;
  isCurrentUserLoading: boolean;
  getCurrentUser: () => Promise<void>;
  setCurrentUser: (newUser: User) => void;
}

const useUserStore = create<UserState>((set) => ({
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
    set({ currentUser: newUser });
  },
  currentUser: {} as User,
  isCurrentUserLoading: false,
}));

export default useUserStore;
