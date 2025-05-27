import { publicFetchClient } from '@/shared/api/instance';
import type { Excursion, ExcursionType } from './types';

export const excursionService = {
  getExcursions: (params?: Record<string, unknown>) =>
    publicFetchClient.get<Excursion[]>('/api/excursions', {
      params: {
        ...params,
        expand: ['type', 'images', 'schedules.slots', 'tickets'].join(','),
      },
    }),

  getExcursionById: (id: string) =>
    publicFetchClient.get<Excursion>(`/api/excursions/${id}`, {
      params: {
        expand: ['type', 'images', 'schedules.slots', 'tickets'].join(','),
      },
    }),

  getExcursionTypes: () =>
    publicFetchClient.get<ExcursionType[]>(`/api/excursions/types`),
};
