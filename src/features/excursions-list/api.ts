import { publicFetchClient } from '@/shared/api/instance';

export type Excursion = {
  id: string;
  title: string;
  basePrice: number;
  typeId: string;
  schedules: Array<{
    startDate: string;
    endDate: string;
    maxPeople: number;
  }>;
  mainImage: string;
  images: Array<{ url: string }>;
};

export const excursionService = {
  getExcursions: () => publicFetchClient.get<Excursion[]>('/api/excursions'),
};
