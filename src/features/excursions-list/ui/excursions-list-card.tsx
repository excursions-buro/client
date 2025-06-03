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
import type { Excursion, ScheduleSlot } from '../../../shared/model/types';

// Улучшенная функция для поиска ближайшего доступного слота
function findNearestSlot(excursion: Excursion): {
  date: Date | null;
  slot: ScheduleSlot | null;
} {
  const now = new Date();
  let nearestDate: Date | null = null;
  let nearestSlot: ScheduleSlot | null = null;

  // Перебираем все расписания экскурсии
  for (const schedule of excursion.schedules) {
    const startDate = new Date(schedule.startDate);
    const endDate = new Date(schedule.endDate);

    // Проверяем активность расписания
    if (now > endDate) continue; // Расписание уже закончилось
    if (now < startDate) {
      // Расписание еще не началось - берем первый день
      const firstDay = new Date(startDate);
      firstDay.setHours(0, 0, 0, 0);

      // Перебираем слоты первого дня
      for (const slot of schedule.slots) {
        const [hours, minutes] = slot.time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) continue;

        const slotDateTime = new Date(firstDay);
        slotDateTime.setHours(hours, minutes, 0, 0);

        // Проверяем день недели
        if (slotDateTime.getDay() !== slot.weekDay) {
          // Корректируем день недели
          const dayDiff = (slot.weekDay - slotDateTime.getDay() + 7) % 7;
          slotDateTime.setDate(slotDateTime.getDate() + dayDiff);
        }

        // Проверяем попадает ли в расписание
        if (slotDateTime < startDate || slotDateTime > endDate) continue;

        // Выбираем ближайший слот
        if (!nearestDate || slotDateTime < nearestDate) {
          nearestDate = slotDateTime;
          nearestSlot = slot;
        }
      }
      continue;
    }

    // Для активных расписаний
    for (const slot of schedule.slots) {
      // Вычисляем ближайшую дату для дня недели
      const currentDay = now.getDay();
      let daysToAdd = (slot.weekDay - currentDay + 7) % 7;
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + daysToAdd);

      // Парсим время слота
      const [hours, minutes] = slot.time.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) continue;

      // Создаем объект даты для слота
      const slotDateTime = new Date(nextDate);
      slotDateTime.setHours(hours, minutes, 0, 0);

      // Если слот сегодня и время уже прошло, берем следующий неделю
      if (daysToAdd === 0 && slotDateTime < now) {
        daysToAdd = 7;
        slotDateTime.setDate(slotDateTime.getDate() + 7);
      }

      // Проверяем входит ли дата в интервал расписания
      if (slotDateTime < startDate || slotDateTime > endDate) continue;

      // Выбираем ближайший слот
      if (!nearestDate || slotDateTime < nearestDate) {
        nearestDate = slotDateTime;
        nearestSlot = slot;
      }
    }
  }

  return { date: nearestDate, slot: nearestSlot };
}

export function ExcursionCard({ excursion }: { excursion: Excursion }) {
  // Находим ближайший доступный слот
  const { date: nearestDate, slot: nearestSlot } = findNearestSlot(excursion);

  // Вычисляем диапазон цен
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
                    {formatDate(nearestDate.toISOString())} в {nearestSlot.time}
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
              {formatDate(excursion.updatedAt, 'dd.MM.yy')}
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
