'use client';

import type { Excursion } from '@/shared/model/types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip';
import { differenceInMinutes, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Info, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { excursionService } from '../api';
import { useBookTicket } from '../model/use-book-ticket';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  excursion: Excursion;
  userProfile?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
}

export const BookingDialog = ({
  open,
  onOpenChange,
  excursion,
  userProfile,
}: BookingDialogProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [selectedScheduleId, setSelectedScheduleId] = useState<string>();
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>();
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const { bookTicket, isLoading: isBooking } = useBookTicket();
  const [bookedSeats, setBookedSeats] = useState(0);
  const maxTickets = 5;

  const selectedSchedule = excursion.schedules.find(
    (s) => s.id === selectedScheduleId
  );

  const availableSlots = selectedSchedule?.slots ?? [];

  const slot = useMemo(() => {
    if (!selectedSlotTime || !selectedSchedule) return null;
    return selectedSchedule.slots.find((s) => s.time === selectedSlotTime);
  }, [selectedSlotTime, selectedSchedule]);

  useEffect(() => {
    if (!selectedScheduleId || !selectedSlotTime) return;

    const fetchBookedSeats = async () => {
      try {
        const response = await excursionService.getBookedSeats(
          selectedScheduleId,
          selectedSlotTime
        );
        setBookedSeats(response.data);
      } catch (error) {
        console.error('Ошибка при получении занятых мест:', error);
        toast.error('Не удалось получить данные о свободных местах');
      }
    };

    fetchBookedSeats();
  }, [selectedScheduleId, selectedSlotTime]);

  const availableSeats = useMemo(() => {
    return slot ? slot.maxPeople - bookedSeats : 0;
  }, [slot, bookedSeats]);

  const durationMinutes = selectedSchedule
    ? differenceInMinutes(
        new Date(selectedSchedule.endDate),
        new Date(selectedSchedule.startDate)
      )
    : 0;

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), 'dd MMMM yyyy', { locale: ru });

  useEffect(() => {
    if (!open) {
      // Сброс состояния при закрытии
      setTimeout(() => {
        setStep(1);
        setSelectedScheduleId(undefined);
        setSelectedSlotTime(undefined);
        setTicketCounts({});
        setName(userProfile?.name || '');
        setEmail(userProfile?.email || '');
        setPhone(userProfile?.phone || '');
      }, 300);
    }
  }, [open, userProfile]);

  useEffect(() => {
    setSelectedSlotTime(undefined);
    setBookedSeats(0);
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
      if (sum > maxTickets) return prev;
      return next;
    });
  };

  const handleBooking = async () => {
    if (!email.trim()) {
      toast.error('Email обязателен для отправки билета');
      return;
    }

    if (!name.trim()) {
      toast.error('Пожалуйста, укажите ваше имя');
      return;
    }

    if (!selectedScheduleId || !selectedSlotTime) {
      toast.error('Пожалуйста, выберите дату и время');
      return;
    }

    if (totalTickets === 0) {
      toast.error('Выберите хотя бы один билет');
      return;
    }

    if (availableSeats < totalTickets) {
      toast.error('Недостаточно свободных мест');
      return;
    }

    try {
      const bookingData = {
        scheduleId: selectedScheduleId,
        slotTime: selectedSlotTime,
        tickets: Object.entries(ticketCounts).map(([id, count]) => ({
          id,
          count,
        })),
        contact: { name, email, phone },
        userId: userProfile?.id,
      };

      const order = await bookTicket(excursion.id, bookingData);

      navigate(`/orders/order/${order.id}`);

      onOpenChange(false);
    } catch (error) {
      console.error('Ошибка бронирования:', error);
    }
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
                  onValueChange={setSelectedScheduleId}
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
                    onValueChange={setSelectedSlotTime}
                    disabled={!selectedScheduleId}
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

              {/* Информация о слоте */}
              {selectedSchedule && selectedSlotTime && (
                <div className='grid grid-cols-2 gap-4 mt-2'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Длительность
                    </p>
                    <p className='font-medium'>
                      {Math.floor(durationMinutes / 60)} ч{' '}
                      {durationMinutes % 60} мин
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Свободно мест
                    </p>
                    <div className='flex items-center'>
                      <Badge
                        variant={availableSeats > 3 ? 'default' : 'destructive'}
                        className='mr-2'
                      >
                        {availableSeats}
                      </Badge>
                      {availableSeats < 5 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className='w-4 h-4 text-muted-foreground' />
                            </TooltipTrigger>
                            <TooltipContent>
                              Осталось мало мест, бронируйте скорее!
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className='text-lg font-semibold'>Выбор билетов</h2>
              <p className='text-sm text-muted-foreground'>
                Максимальное количество билетов: {maxTickets}
              </p>

              <div className='space-y-3'>
                {excursion.tickets.map((ticket) => {
                  const count = ticketCounts[ticket.id] || 0;
                  return (
                    <div
                      key={ticket.id}
                      className='flex justify-between items-center p-3 border rounded-lg'
                    >
                      <div>
                        <span className='font-medium'>{ticket.name}</span>
                        <p className='text-muted-foreground text-sm'>
                          {ticket.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>

                      <div className='flex items-center gap-2'>
                        <Button
                          variant='outline'
                          size='icon'
                          onClick={() => handleChangeTicket(ticket.id, -1)}
                          disabled={count <= 0}
                        >
                          -
                        </Button>
                        <span className='w-6 text-center'>{count}</span>
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

              <div className='pt-4 border-t'>
                <div className='flex justify-between items-center'>
                  <span className='font-medium'>Итого:</span>
                  <span className='text-lg font-bold'>
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <p className='text-sm text-muted-foreground mt-1'>
                  {totalTickets} билет{totalTickets === 1 ? '' : 'а'}
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className='text-lg font-semibold'>Контактные данные</h2>

              {!userProfile?.id && (
                <div className='mb-4 p-3 bg-yellow-100 rounded border border-yellow-300 text-yellow-900'>
                  Вы можете{' '}
                  <a href='/login' className='underline'>
                    авторизироваться
                  </a>{' '}
                  для сохранения данных
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
                    Имя *
                  </label>
                  <Input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className='block mb-1 font-medium' htmlFor='email'>
                    Email *
                  </label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className='block mb-1 font-medium' htmlFor='phone'>
                    Телефон
                  </label>
                  <Input
                    id='phone'
                    type='tel'
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
              onClick={() => setStep(step - 1)}
              disabled={isBooking}
            >
              Назад
            </Button>
          )}

          {step < 3 ? (
            <Button
              onClick={() => {
                if (step === 1 && (!selectedScheduleId || !selectedSlotTime)) {
                  toast.error('Пожалуйста, выберите дату и время');
                  return;
                }
                setStep(step + 1);
              }}
              disabled={
                (step === 1 && (!selectedScheduleId || !selectedSlotTime)) ||
                isBooking
              }
            >
              Далее
            </Button>
          ) : (
            <Button
              onClick={handleBooking}
              disabled={!name || !email || isBooking}
            >
              {isBooking ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Обработка...
                </>
              ) : (
                'Забронировать'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
