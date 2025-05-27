import { useQuery } from '@tanstack/react-query';
import { excursionService } from '../api';

export function useExcursion(excursionId?: string) {
  return useQuery({
    queryKey: ['excursions', excursionId],
    queryFn: async () => {
      if (!excursionId) throw new Error('ID экскурсии не указан');
      const { data } = await excursionService.getExcursionById(excursionId);
      return data;
    },
    enabled: !!excursionId,
  });
}
