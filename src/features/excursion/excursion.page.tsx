import { useUserProfile } from '@/features/profile';
import { findNearestSlot } from '@/shared/lib/slot-utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { format, isAfter, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ArrowLeft, CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useExcursion } from './model/use-excursion';
import { BookingDialog } from './ui/booking-modal';

export function ExcursionPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { data: userProfile } = useUserProfile();
  const { excursionId } = useParams<{ excursionId: string }>();
  const { data: excursion, isLoading, error } = useExcursion(excursionId);

  useEffect(() => {
    if (error) {
      toast.error('Ошибка загрузки', {
        description: error.message || 'Не удалось загрузить данные экскурсии',
      });
    }
  }, [error]);

  // Находим ближайший доступный слот
  const nearestSlotInfo = excursion ? findNearestSlot(excursion) : null;

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const formatWeekDay = (weekDay: number) => {
    const days = {
      1: 'Понедельник',
      2: 'Вторник',
      3: 'Среда',
      4: 'Четверг',
      5: 'Пятница',
      6: 'Суббота',
      7: 'Воскресенье',
    };
    return days[weekDay as keyof typeof days] || 'День недели не указан';
  };

  if (!excursionId) {
    return (
      <div className='container max-w-6xl py-8 text-center'>
        <h1 className='text-2xl font-bold text-destructive'>
          ID экскурсии не указан
        </h1>
      </div>
    );
  }

  return (
    <>
      <main className='container mx-auto py-8 px-4 md:px-4'>
        {/* Кнопка возврата */}
        <Button variant='ghost' className='mb-8 -ml-4' asChild>
          <Link to='/excursions' className='flex items-center gap-2'>
            <ArrowLeft className='h-5 w-5' />
            <span className='text-lg'>Все экскурсии</span>
          </Link>
        </Button>

        {/* Скелетон загрузки */}
        {isLoading && <ExcursionSkeleton />}

        {/* Основной контент */}
        {excursion && (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Левая колонка */}
            <div className='lg:col-span-2 space-y-8'>
              {/* Заголовок */}
              <header className='space-y-4'>
                <Badge variant='secondary' className='text-lg px-4 py-2'>
                  {excursion.type.name}
                </Badge>
                <h1 className='text-4xl font-bold tracking-tight'>
                  {excursion.title}
                </h1>

                {/* Основное изображение */}
                {excursion.mainImage && (
                  <div className='aspect-video rounded-xl overflow-hidden border'>
                    <img
                      src={excursion.mainImage}
                      alt={excursion.title}
                      className='object-cover w-full h-full'
                    />
                  </div>
                )}
              </header>

              {/* Описание */}
              <section className='prose prose-lg max-w-none'>
                <h2 className='text-2xl font-semibold mb-4'>Описание</h2>
                <p className='text-muted-foreground leading-relaxed'>
                  {excursion.description || 'Описание отсутствует'}
                </p>
              </section>

              {/* Расписание */}
              {excursion.schedules.length > 0 && (
                <section className='space-y-6'>
                  <h2 className='text-2xl font-semibold'>Расписание</h2>
                  <div className='space-y-4'>
                    {excursion.schedules.map((schedule) => {
                      const startDate = new Date(schedule.startDate);
                      const endDate = new Date(schedule.endDate);
                      const isActive = isAfter(endDate, startOfDay(new Date()));

                      return (
                        <div
                          key={schedule.id}
                          className={`p-6 rounded-lg border ${
                            isActive ? 'bg-muted/10' : 'bg-muted/30 opacity-80'
                          }`}
                        >
                          <div className='flex flex-wrap items-center gap-4 mb-4'>
                            <div className='flex items-center gap-2'>
                              <CalendarDays className='h-6 w-6 text-primary' />
                              <span className='text-lg font-medium'>
                                {formatDate(startDate)} - {formatDate(endDate)}
                              </span>
                            </div>
                            <Badge variant={isActive ? 'default' : 'secondary'}>
                              {isActive ? 'Активно' : 'Завершено'}
                            </Badge>
                          </div>

                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {schedule.slots.map((slot) => {
                              const slotDate =
                                nearestSlotInfo?.slot?.id === slot.id
                                  ? nearestSlotInfo.date
                                  : null;

                              return (
                                <div
                                  key={slot.id}
                                  className='p-4 rounded-lg border bg-card'
                                >
                                  <div className='flex justify-between items-start'>
                                    <div>
                                      <h3 className='font-medium flex items-center gap-2'>
                                        <Clock className='h-5 w-5 text-muted-foreground' />
                                        {formatTime(slot.time)}
                                      </h3>
                                      <p className='text-sm text-muted-foreground mt-1'>
                                        {formatWeekDay(slot.weekDay)}
                                      </p>
                                    </div>
                                    <div className='text-sm text-right'>
                                      <div>до {slot.maxPeople} чел.</div>
                                    </div>
                                  </div>

                                  {slotDate && (
                                    <div className='mt-3 text-sm text-green-600 font-medium'>
                                      Ближайшая дата: {formatDate(slotDate)}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Правая колонка */}
            <aside className='space-y-8'>
              {/* Блок бронирования */}
              <div className='sticky top-8 space-y-6'>
                {/* Ближайшая дата */}
                <div className='p-6 bg-card rounded-xl border space-y-4'>
                  <h3 className='text-xl font-semibold flex items-center gap-2'>
                    <CalendarDays className='h-6 w-6' />
                    Ближайшая дата
                  </h3>

                  {nearestSlotInfo?.date && nearestSlotInfo.slot ? (
                    <div className='space-y-2'>
                      <div className='flex justify-between items-center'>
                        <span>Дата:</span>
                        <span className='text-lg font-bold'>
                          {formatDate(nearestSlotInfo.date)}
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Время:</span>
                        <span className='font-medium'>
                          {formatTime(nearestSlotInfo.slot.time)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className='text-muted-foreground italic'>
                      Ближайшие даты уточняются
                    </p>
                  )}
                </div>

                {/* Цены */}
                <div className='p-6 bg-card rounded-xl border space-y-4'>
                  <h3 className='text-xl font-semibold flex items-center gap-2'>
                    <Ticket className='h-6 w-6' />
                    Стоимость участия
                  </h3>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <span>Базовая цена</span>
                      <span className='text-2xl font-bold'>
                        {excursion.basePrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    {excursion.tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className='flex justify-between items-center'
                      >
                        <span>{ticket.name}</span>
                        <span className='font-medium'>
                          {ticket.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    size='lg'
                    className='w-full mt-4'
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Забронировать
                  </Button>
                </div>

                {/* Локация */}
                <div className='p-6 bg-card rounded-xl border space-y-4'>
                  <h3 className='text-xl font-semibold flex items-center gap-2'>
                    <MapPin className='h-6 w-6' />
                    Место проведения
                  </h3>
                  <div className='aspect-square bg-muted rounded-lg'>
                    {/* Здесь можно вставить карту */}
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Точное место встречи будет отправлено после бронирования
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
      {excursion && (
        <BookingDialog
          excursion={excursion}
          open={isBookingOpen}
          onOpenChange={setIsBookingOpen}
          userProfile={userProfile}
        />
      )}
    </>
  );
}

// Скелетон для состояния загрузки
function ExcursionSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Заголовок */}
      <div className='space-y-4'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='aspect-video w-full rounded-xl' />
      </div>

      {/* Контент */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-6'>
          <Skeleton className='h-24 w-full' />
          <div className='space-y-4'>
            <Skeleton className='h-16 w-full' />
            <div className='grid grid-cols-2 gap-4'>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className='h-24 w-full rounded-lg' />
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          <Skeleton className='h-48 w-full rounded-xl' />
          <Skeleton className='h-48 w-full rounded-xl' />
          <Skeleton className='h-48 w-full rounded-xl' />
        </div>
      </div>
    </div>
  );
}

export const Component = ExcursionPage;
