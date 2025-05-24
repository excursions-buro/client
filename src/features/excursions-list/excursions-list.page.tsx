import { Skeleton } from '@/shared/ui/skeleton';
import { useExcursions } from './model/use-excursions-list';
import { ExcursionCard } from './ui/excursions-list-card';

export function ExcursionsListPage() {
  const { data: excursions, isLoading, error } = useExcursions();

  if (error) {
    return (
      <div className='text-red-500 text-xl container mx-auto p-4'>
        Ошибка загрузки экскурсий
      </div>
    );
  }

  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Список экскурсий</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className='h-48 w-full' />)
          : excursions?.map((excursion) => (
              <ExcursionCard key={excursion.id} excursion={excursion} />
            ))}
      </div>
    </main>
  );
}

export const Component = ExcursionsListPage;
