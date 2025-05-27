import { publicFetchClient } from '@/shared/api/instance';
import type { Excursion } from '@/shared/model/types';

export const excursionService = {
  getExcursionById: (id: string) =>
    publicFetchClient.get<Excursion>(`/api/excursions/${id}`, {
      params: {
        expand: ['type', 'images', 'schedules.slots', 'tickets'].join(','),
      },
    }),
};
