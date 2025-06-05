// src/features/excursions/ui/ExcursionCard/ExcursionCard.tsx
import { formatDate } from '@/shared/lib/date';
import { getPriceRange } from '@/shared/lib/price-utils';
import { findNearestSlot } from '@/shared/lib/slot-utils';
import type { Excursion } from '@/shared/model/types';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Link } from 'react-router-dom';

export function ExcursionCard({ excursion }: { excursion: Excursion }) {
  // Находим ближайший доступный слот
  const { date: nearestDate, slot: nearestSlot } = findNearestSlot(excursion);

  // Вычисляем диапазон цен
  const priceRange = getPriceRange(excursion);

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
                {priceRange ? (
                  <span className='font-medium'>
                    {priceRange.min === priceRange.max
                      ? `${priceRange.min.toLocaleString()} ₽`
                      : `${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()} ₽`}
                  </span>
                ) : (
                  <span className='text-muted-foreground'>Цена не указана</span>
                )}
              </div>
            </div>
          </CardHeader>

          {/* Основной контент */}
          <CardContent className='p-0 space-y-4 flex-1'>
            {excursion.description && (
              <p className='text-sm text-muted-foreground line-clamp-3'>
                {excursion.description}
              </p>
            )}

            {nearestDate && nearestSlot ? (
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>Ближайшая дата:</span>
                  <span className='text-primary'>
                    {formatDate(nearestDate.toISOString())}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <span>Группа до {nearestSlot.maxPeople} чел.</span>
                </div>
              </div>
            ) : (
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>Ближайшая дата:</span>
                  <span className='text-muted-foreground italic'>
                    Расписание уточняется
                  </span>
                </div>
              </div>
            )}
          </CardContent>

          {/* Футер */}
          <CardFooter className='p-0 mt-auto flex justify-between items-center'>
            <Button variant='secondary' size='sm'>
              Подробнее
            </Button>
            <div className='text-xs text-muted-foreground'>
              Обновлено: {formatDate(excursion.updatedAt, 'dd.MM.yy')}
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
