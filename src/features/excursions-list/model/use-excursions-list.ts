import { useDebouncedValue } from '@/shared/lib/useDebouncedValue';
import type { Excursion, ExcursionFilters } from '@/shared/model/types';
import { useQuery } from '@tanstack/react-query';
import { excursionService } from '../api';

function serializeFilters(filters: ExcursionFilters) {
  return {
    ...filters,
    date: filters.date?.toISOString(),
  };
}

export function useExcursions(filters: ExcursionFilters) {
  const debouncedFilters = useDebouncedValue(filters, 300);
  const queryParams = serializeFilters(debouncedFilters);

  return useQuery<Excursion[]>({
    queryKey: ['excursions', queryParams],
    queryFn: () =>
      excursionService.getExcursions(queryParams).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}
