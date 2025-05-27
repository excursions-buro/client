import { useQuery } from '@tanstack/react-query';
import { excursionService } from '../api';
import type { ExcursionType } from '../types';

export function useExcursionTypes() {
  return useQuery<ExcursionType[]>({
    queryKey: ['excursion-types'],
    queryFn: () => excursionService.getExcursionTypes().then((res) => res.data),
    staleTime: Infinity,
  });
}
