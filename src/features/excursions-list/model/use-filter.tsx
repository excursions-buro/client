// useFilters.ts
import { useCallback, useState } from 'react';
import type { ExcursionFilters } from '../../../shared/model/types';

export function useFilters(initialFilters: ExcursionFilters = {}) {
  const [filters, setFilters] = useState<ExcursionFilters>(initialFilters);
  const [dirty, setDirty] = useState(false);

  const updateFilter = useCallback(
    <K extends keyof ExcursionFilters>(key: K, value: ExcursionFilters[K]) => {
      setFilters((prev) => {
        const newValue = value;

        // Автоматическая коррекция числовых значений
        if (key === 'priceMin' || key === 'priceMax' || key === 'peopleCount') {
          if (typeof newValue === 'string' && newValue !== '') {
            const numValue = parseInt(newValue, 10);
            if (!isNaN(numValue)) {
              return { ...prev, [key]: Math.max(0, numValue) };
            }
          }
          if (newValue === '') return { ...prev, [key]: undefined };
        }

        // Сброс max если min > max
        if (
          key === 'priceMin' &&
          typeof newValue === 'number' &&
          typeof prev.priceMax === 'number' &&
          newValue > prev.priceMax
        ) {
          return { ...prev, [key]: newValue, priceMax: undefined };
        }

        return { ...prev, [key]: newValue };
      });

      setDirty(true);
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setDirty(false);
  }, [initialFilters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    dirty,
    hasActiveFilters: dirty || Object.keys(initialFilters).length > 0,
  };
}
