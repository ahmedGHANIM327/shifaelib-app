import { create } from 'zustand';
import { Service } from '@/lib/types/services';
import { getCabinetServices } from '@/server/services/services';

interface ServiceState {
  services: Service[];
  isServicesLoading: boolean;
  getServices: () => Promise<void>;
  addService: (newService: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
}

const useServiceStore = create<ServiceState>((set, get) => ({
  services: [] as Service[],
  isServicesLoading: false,
  getServices: async () => {
    set({ isServicesLoading: true });
    const services = get().services as Service[];
    if (services.length === 0) {
      const response = await getCabinetServices();
      if (response.ok) {
        set({ services: response.data });
      } else {
        set({ services: [] as Service[] });
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    }
    set({ isServicesLoading: false });
  },
  addService: (newService: Service) => {
    set({ services: [...get().services, newService] });
  },
  updateService: (service: Service) => {
    const filteredServices = get().services.filter((s) => s.id !== service.id);
    console.log('filteredServices', filteredServices);
    set({ services: [...filteredServices, service] });
  },
  deleteService: (id: string) => {
    const services = get().services.filter((service) => service.id !== id);
    set({ services: services });
  }
}));

export default useServiceStore;