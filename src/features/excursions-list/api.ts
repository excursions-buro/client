import { publicFetchClient } from '@/shared/api/instance';
import type { Excursion } from './types';

export const excursionService = {
  getExcursions: () =>
    publicFetchClient.get<Excursion[]>('/api/excursions', {
      params: {
        expand: ['type', 'images', 'schedules.slots', 'tickets'].join(','),
      },
    }),

  getExcursionById: (id: string) =>
    publicFetchClient.get<Excursion>(`/api/excursions/${id}`, {
      params: {
        expand: ['type', 'images', 'schedules.slots', 'tickets'].join(','),
      },
    }),
};
