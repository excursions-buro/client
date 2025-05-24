import { useQuery } from '@tanstack/react-query';
import { excursionService } from '../api';

export function useExcursions() {
  return useQuery({
    queryKey: ['excursions'],
    queryFn: async () => {
      const { data } = await excursionService.getExcursions();
      return data;
    },
  });
}
