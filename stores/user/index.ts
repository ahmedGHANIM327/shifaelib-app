import { create } from 'zustand';
import { User } from '@/lib/types/users';
import { getCabinetUsers, getCurrentUser } from '@/server/services/users';
import { signOut } from 'next-auth/react';
import { transformCurrentUser } from '@/lib/helpers/users';
import { Cabinet } from '@/lib/types/cabinet';
import { Service } from '@/lib/types/services';

interface UserState {
  currentUser: User;
  isCurrentUserLoading: boolean;
  getCurrentUser: () => Promise<void>;
  setCurrentUser: (newUser: User, withMetaData: boolean) => void;
  // cabinet users
  cabinetUsers: User[];
  setCabinetUsers: (users: User[]) => void;
  addCabinetUser: (newUser: User) => void;
  updateCabinetUser: (newUser: User) => void;
  deleteCabinetUser: (id: string) => void;
  // Cabinet
  currentCabinet: Cabinet;
  setCurrentCabinet: (cabinet: Cabinet) => void;
  // services
  cabinetServices: Service[];
  setCabinetServices: (services: Service[]) => void;
  addCabinetService: (newService: Service) => void;
  updateCabinetService: (updatedService: Service) => void;
  deleteCabinetService: (id: string) => void;
}

const useUserStore = create<UserState>((set, get) => ({
  getCurrentUser: async () => {
    const currentUserData = window.localStorage.getItem('currentUser');
    if (!currentUserData) {
      const response = await getCurrentUser();
      if (response.ok) {
        const {
          user,
          cabinet,
          services,
          users
        } = transformCurrentUser(response.data as User);
        window.localStorage.setItem(
          'currentUser',
          JSON.stringify({
            user,
            cabinet,
            services,
            users
          }),
        );
        set({ currentUser: user });
        set({ cabinetUsers: users });
        set({ currentCabinet: cabinet });
        set({ cabinetServices: services });
      } else {
        await signOut();
      }
    } else {
      const {
        user,
        cabinet,
        services,
        users
      } = JSON.parse(currentUserData);
      set({ currentUser: user });
      set({ cabinetUsers: users });
      set({ currentCabinet: cabinet });
      set({ cabinetServices: services });
    }
    set({ isCurrentUserLoading: false });
  },
  setCurrentUser: (newUser: User, withMetaData: boolean) => {
    if(withMetaData) {
      const {
        user,
        cabinet,
        services,
        users
      } = transformCurrentUser(newUser);
      window.localStorage.setItem(
        'currentUser',
        JSON.stringify({
          user,
          cabinet,
          services,
          users
        }),
      );
      set({ currentUser: user });
      set({ cabinetUsers: users });
      set({ currentCabinet: cabinet });
      set({ cabinetServices: services });
    } else {
      window.localStorage.setItem(
        'currentUser',
        JSON.stringify({
          user: newUser,
          cabinet: get().currentCabinet,
          services: get().cabinetServices,
          users: get().cabinetUsers
        }),
      );
      set({ currentUser: newUser });
    }

  },
  currentUser: {} as User,
  isCurrentUserLoading: true,
  // cabinet users
  cabinetUsers: [] as User[],
  setCabinetUsers: (users: User[]) => {
    window.localStorage.setItem(
      'currentUser',
      JSON.stringify({
        user: get().currentUser,
        cabinet: get().currentCabinet,
        services: get().cabinetServices,
        users
      }),
    );
    set({ cabinetUsers: users });
  },
  addCabinetUser: (newUser: User) => {
    const users: User[] = [...get().cabinetUsers, newUser];
    get().setCabinetUsers(users);
  },
  updateCabinetUser: (updatedUser: User) => {
    const users = get().cabinetUsers.filter((user) => user.id !== updatedUser.id);
    get().setCabinetUsers([...users, updatedUser]);
  },
  deleteCabinetUser: (id: string) => {
    const users = get().cabinetUsers.filter((user) => user.id !== id);
    get().setCabinetUsers(users);
  },
  // Cabinet
  currentCabinet: {} as Cabinet,
  setCurrentCabinet: (cabinet: Cabinet) => {
    window.localStorage.setItem(
      'currentUser',
      JSON.stringify({
        user: get().currentUser,
        cabinet: cabinet,
        services: get().cabinetServices,
        users: get().cabinetUsers
      }),
    );
    set({ currentCabinet: cabinet });
  },
  // services
  cabinetServices: [] as Service[],
  setCabinetServices: (services: Service[]) => {
    window.localStorage.setItem(
      'currentUser',
      JSON.stringify({
        user: get().currentUser,
        cabinet: get().currentCabinet,
        services: services,
        users: get().cabinetUsers
      }),
    );
    set({ cabinetServices: services });
  },
  addCabinetService: (newService: Service) => {
    const services: Service[] = [...get().cabinetServices, newService];
    get().setCabinetServices(services);
  },
  updateCabinetService: (updatedService: Service) => {
    const services = get().cabinetServices.filter((service) => service.id !== updatedService.id);
    get().setCabinetServices([...services, updatedService]);
  },
  deleteCabinetService: (id: string) => {
    const services = get().cabinetServices.filter((service) => service.id !== id);
    get().setCabinetServices(services);
  },
}));

export default useUserStore;
