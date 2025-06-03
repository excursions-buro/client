import { publicFetchClient } from '@/shared/api/instance';
import type { Excursion, ExcursionType } from '../../shared/model/types';

export const excursionService = {
  getExcursions: (params?: Record<string, unknown>) => {
    return publicFetchClient
      .get<Excursion[]>('/api/excursions', {
        params: {
          ...params,
          expand: ['type', 'images', 'schedules.slots', 'tickets'].join(','),
        },
      })
      .then((res) => {
        return res;
      });
  },

  getExcursionTypes: () =>
    publicFetchClient
      .get<ExcursionType[]>(`/api/excursions/types`)
      .then((res) => {
        return res;
      }),
};
