import { Button } from '@/shared/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/collapsible';
import { Skeleton } from '@/shared/ui/skeleton';
import { useState } from 'react';
import { useExcursionTypes } from './model/use-excursion-types';
import { useExcursions } from './model/use-excursions-list';
import { useFilters } from './model/use-filter';
import { FiltersSidebar } from './ui/excursion-list-filter-sidebar';
import { ExcursionCard } from './ui/excursions-list-card';

export function ExcursionsListPage() {
  const { filters, updateFilter, resetFilters } = useFilters();
  const { data: excursions, isLoading, error } = useExcursions(filters);
  const { data: types, isLoading: typesLoading } = useExcursionTypes();
  const [isOpen, setIsOpen] = useState(false);

  if (error) {
    return (
      <div className='text-red-500 text-xl container mx-auto p-4'>
        Ошибка загрузки экскурсий
      </div>
    );
  }

  return (
    <main className='container mx-auto p-4 flex flex-col lg:flex-row gap-8'>
      {/* Мобильный фильтр — collapsible */}
      <div className='lg:hidden mb-4'>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant='outline' className='w-full'>
              {isOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-4'>
            <FiltersSidebar
              filters={filters}
              onFilterChange={updateFilter}
              onReset={resetFilters}
              types={types}
              isLoadingTypes={typesLoading}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop sidebar */}
      <div className='hidden lg:block'>
        <FiltersSidebar
          filters={filters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
          types={types}
          isLoadingTypes={typesLoading}
        />
      </div>

      {/* Cards list */}
      <div className='flex-1'>
        <h1 className='text-3xl font-bold mb-6'>Список экскурсий</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className='h-48 w-full' />)
          ) : excursions && excursions.length > 0 ? (
            excursions.map((excursion) => (
              <ExcursionCard key={excursion.id} excursion={excursion} />
            ))
          ) : (
            <div className='col-span-full text-center text-muted-foreground text-lg py-12'>
              Нет экскурсий
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export const Component = ExcursionsListPage;
