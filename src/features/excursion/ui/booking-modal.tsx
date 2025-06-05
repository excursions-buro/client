'use client';

import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import type { Excursion } from '@/shared/model/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip';
import { differenceInMinutes, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Info } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  excursion: Excursion;
  bookedSeatsMap?: Record<string, number>;
  userProfile?: {
    name?: string;
    email?: string;
    phone?: string;
    isAuthorized?: boolean;
  };
}

export const BookingDialog = ({
  open,
  onOpenChange,
  excursion,
  bookedSeatsMap = {},
  userProfile,
}: BookingDialogProps) => {
  const [step, setStep] = useState(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>();
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>();
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const maxTickets = 5;

  const selectedSchedule = excursion.schedules.find(
    (s) => s.id === selectedScheduleId
  );
  const availableSlots = selectedSchedule?.slots ?? [];

  const durationMinutes = selectedSchedule
    ? differenceInMinutes(
        new Date(selectedSchedule.endDate),
        new Date(selectedSchedule.startDate)
      )
    : 0;

  const availableSeats = useMemo(() => {
    const total =
      selectedSchedule?.slots.find((slot) => slot.time === selectedSlotTime)
        ?.maxPeople || 0;
    const booked = bookedSeatsMap[selectedScheduleId ?? ''] || 0;
    return total - booked;
  }, [selectedSchedule, selectedSlotTime, bookedSeatsMap, selectedScheduleId]);

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), 'dd MMMM yyyy', { locale: ru });

  useEffect(() => {
    setSelectedSlotTime(undefined);
  }, [selectedScheduleId]);

  const totalTickets = Object.values(ticketCounts).reduce((a, b) => a + b, 0);
  const totalPrice = excursion.tickets.reduce((acc, ticket) => {
    return acc + (ticketCounts[ticket.id] || 0) * ticket.price;
  }, 0);

  const freeTicketsExist = excursion.tickets.some(
    (ticket) => ticket.price === 0 && (ticketCounts[ticket.id] || 0) > 0
  );

  const handleChangeTicket = (ticketId: string, delta: number) => {
    setTicketCounts((prev) => {
      const next = { ...prev, [ticketId]: (prev[ticketId] || 0) + delta };
      if (next[ticketId] <= 0) delete next[ticketId];
      const sum = Object.values(next).reduce((a, b) => a + b, 0);
      if (sum > maxTickets) return prev; // не больше maxTickets
      return next;
    });
  };

  const handleBooking = () => {
    if (!email.trim()) {
      toast.error('Email обязателен для отправки билета');
      return;
    }

    // Имитация отправки брони
    toast.success(
      'Бронирование прошло успешно. Билет будет отправлен на почту.'
    );

    onOpenChange(false);
    setStep(1);
    setSelectedScheduleId(undefined);
    setSelectedSlotTime(undefined);
    setTicketCounts({});
    setName(userProfile?.name || '');
    setEmail(userProfile?.email || '');
    setPhone(userProfile?.phone || '');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Бронирование экскурсии</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          {step === 1 && (
            <>
              <h2 className='text-lg font-semibold'>{excursion.title}</h2>

              {/* Дата */}
              <div>
                <label className='block mb-1 font-medium'>Выберите дату</label>
                <Select
                  value={selectedScheduleId}
                  onValueChange={(value) => setSelectedScheduleId(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Дата' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {excursion.schedules.map((schedule) => (
                        <SelectItem key={schedule.id} value={schedule.id}>
                          {formatDate(schedule.startDate)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Время */}
              {selectedSchedule && (
                <div>
                  <label className='block mb-1 font-medium'>
                    Выберите время
                  </label>
                  <Select
                    value={selectedSlotTime}
                    onValueChange={(value) => setSelectedSlotTime(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Время' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {availableSlots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.time}>
                            {slot.time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Длительность */}
              {selectedSchedule && (
                <p>
                  <strong>Длительность:</strong>{' '}
                  {Math.floor(durationMinutes / 60)} ч {durationMinutes % 60}{' '}
                  мин
                </p>
              )}

              {/* Оставшиеся места */}
              {selectedSchedule && selectedSlotTime && (
                <p>
                  <strong>Осталось мест:</strong> {availableSeats}
                </p>
              )}

              {/* Фото */}
              {excursion.mainImage && (
                <img
                  src={excursion.mainImage}
                  alt={excursion.title}
                  className='mt-4 w-full max-h-48 object-cover rounded-lg'
                />
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className='text-lg font-semibold'>Выбор билетов</h2>

              <div className='space-y-3'>
                {excursion.tickets.map((ticket) => {
                  const count = ticketCounts[ticket.id] || 0;
                  return (
                    <div
                      key={ticket.id}
                      className='flex justify-between items-center'
                    >
                      <span>
                        {ticket.name} — {ticket.price} ₽{' '}
                        {ticket.name.includes('Дети') && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className='inline w-4 h-4 ml-1 text-muted-foreground' />
                              </TooltipTrigger>
                              <TooltipContent>
                                У вас скидка на 2 билета
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </span>

                      <div className='flex items-center gap-2'>
                        <Button
                          variant='outline'
                          size='icon'
                          onClick={() => handleChangeTicket(ticket.id, -1)}
                          disabled={count <= 0}
                        >
                          -
                        </Button>
                        <span>{count}</span>
                        <Button
                          variant='outline'
                          size='icon'
                          onClick={() => handleChangeTicket(ticket.id, 1)}
                          disabled={totalTickets >= maxTickets}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className='text-lg font-bold pt-4'>
                Итого: {totalPrice.toLocaleString()} ₽
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className='text-lg font-semibold'>Контактные данные</h2>

              {!userProfile?.isAuthorized && (
                <div className='mb-4 p-3 bg-yellow-100 rounded border border-yellow-300 text-yellow-900'>
                  Вы можете{' '}
                  <a href='/login' className='underline'>
                    авторизироваться
                  </a>{' '}
                  для удобства, но это не обязательно.
                </div>
              )}

              {freeTicketsExist && (
                <div className='mb-4 p-3 bg-blue-100 rounded border border-blue-300 text-blue-900'>
                  Не забудьте взять документы для подтверждения льгот!
                </div>
              )}

              <div className='space-y-4'>
                <div>
                  <label className='block mb-1 font-medium' htmlFor='name'>
                    Имя
                  </label>
                  <input
                    id='name'
                    type='text'
                    className='w-full rounded border px-3 py-2'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className='block mb-1 font-medium' htmlFor='email'>
                    Email *
                  </label>
                  <input
                    id='email'
                    type='email'
                    className='w-full rounded border px-3 py-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className='block mb-1 font-medium' htmlFor='phone'>
                    Телефон
                  </label>
                  <input
                    id='phone'
                    type='tel'
                    className='w-full rounded border px-3 py-2'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className='mt-6 flex justify-between'>
          {step > 1 && (
            <Button
              variant='outline'
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
            >
              Назад
            </Button>
          )}

          {step < 3 && (
            <Button
              onClick={() => {
                if (step === 1 && (!selectedScheduleId || !selectedSlotTime)) {
                  toast.error('Пожалуйста, выберите дату и время');
                  return;
                }
                if (step === 2 && totalTickets === 0) {
                  toast.error('Выберите хотя бы один билет');
                  return;
                }
                setStep((s) => s + 1);
              }}
            >
              Далее
            </Button>
          )}

          {step === 3 && (
            <Button onClick={handleBooking} disabled={!email.trim()}>
              Забронировать
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
