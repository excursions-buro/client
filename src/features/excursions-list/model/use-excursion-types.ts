import { useQuery } from '@tanstack/react-query';
import type { ExcursionType } from '../../../shared/model/types';
import { excursionService } from '../api';

export function useExcursionTypes() {
  return useQuery<ExcursionType[]>({
    queryKey: ['excursion-types'],
    queryFn: () => excursionService.getExcursionTypes().then((res) => res.data),
    staleTime: Infinity,
  });
}
