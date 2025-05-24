import { formatDate } from '@/shared/lib/date';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Link } from 'react-router-dom';
import type { Excursion } from '../types';

export function ExcursionCard({ excursion }: { excursion: Excursion }) {
  const nearestSchedule = excursion.schedules[0];
  const priceRange = excursion.tickets.reduce(
    (acc, ticket) => ({
      min: Math.min(acc.min, ticket.price),
      max: Math.max(acc.max, ticket.price),
    }),
    { min: Infinity, max: -Infinity }
  );

  return (
    <Link
      to={`/excursions/${excursion.id}`}
      className='block h-full group focus-visible:outline-none'
    >
      <Card className='bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow h-full'>
        <div className='flex flex-col gap-4 h-full'>
          {/* Заголовок и изображение */}
          <CardHeader className='p-0 space-y-4'>
            {excursion.mainImage && (
              <div className='relative aspect-video overflow-hidden rounded-lg'>
                <img
                  src={excursion.mainImage}
                  alt={excursion.title}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
            )}
            <div className='space-y-2'>
              <CardTitle className='text-xl font-semibold'>
                {excursion.title}
              </CardTitle>
              <div className='flex items-center gap-3 text-sm'>
                <span className='rounded-full bg-accent px-3 py-1 text-accent-foreground'>
                  {excursion.type.name}
                </span>
                {excursion.tickets.length > 0 && (
                  <span className='font-medium'>
                    {priceRange.min === priceRange.max
                      ? `${priceRange.min.toLocaleString()} ₽`
                      : `${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()} ₽`}
                  </span>
                )}
              </div>
            </div>
          </CardHeader>

          {/* Основной контент с автоматическим отступом */}
          <CardContent className='p-0 space-y-4 flex-1'>
            {excursion.description && (
              <p className='text-sm text-muted-foreground line-clamp-3'>
                {excursion.description}
              </p>
            )}

            {nearestSchedule && (
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>Ближайшая дата:</span>
                  <span className='text-primary'>
                    {formatDate(nearestSchedule.startDate)}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <span>Группа до {nearestSchedule.maxPeople} чел.</span>
                </div>
              </div>
            )}
          </CardContent>

          {/* Футер прижат к низу */}
          <CardFooter className='p-0 mt-auto flex justify-between items-center'>
            <Button variant='secondary' size='sm'>
              Подробнее
            </Button>
            <div className='text-xs text-muted-foreground'>
              {formatDate(excursion.updatedAt, 'dd.MM.yy')}
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
