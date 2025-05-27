import { useState } from 'react';
import type { ExcursionFilters } from '../types';

export function useFilters(initialFilters: ExcursionFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = <K extends keyof ExcursionFilters>(
    key: K,
    value: ExcursionFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(initialFilters);

  return { filters, updateFilter, resetFilters };
}
