import { differenceInMinutes, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useEffect, useState } from 'react';

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

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  excursion: Excursion;
  bookedSeatsMap?: Record<string, number>;
}

export const BookingDialog = ({
  open,
  onOpenChange,
  excursion,
  bookedSeatsMap = {},
}: BookingDialogProps) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<
    string | undefined
  >(undefined);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string | undefined>(
    undefined
  );

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

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), 'dd MMMM yyyy', { locale: ru });

  useEffect(() => {
    setSelectedSlotTime(undefined);
  }, [selectedScheduleId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Бронирование экскурсии</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <h2 className='text-lg font-semibold'>{excursion.title}</h2>

          {/* Выбор даты */}
          <div>
            <label className='block mb-1 font-medium'>Выберите дату</label>
            <Select
              value={selectedScheduleId}
              onValueChange={(value) =>
                setSelectedScheduleId(value || undefined)
              }
              defaultValue=''
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Выберите дату' />
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

          {/* Выбор времени */}
          {selectedSchedule && (
            <div>
              <label className='block mb-1 font-medium'>Выберите время</label>
              <Select
                value={selectedSlotTime}
                onValueChange={(value) =>
                  setSelectedSlotTime(value || undefined)
                }
                defaultValue=''
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Выберите время' />
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

          {/* Место встречи */}
          <p>
            <strong>Место встречи:</strong> {excursion.description}
          </p>

          {/* Длительность */}
          {selectedSchedule && (
            <p>
              <strong>Длительность:</strong> {Math.floor(durationMinutes / 60)}{' '}
              ч {durationMinutes % 60} мин
            </p>
          )}

          {/* Оставшиеся места */}
          {selectedSchedule && (
            <p>
              <strong>Осталось мест:</strong> {availableSeats}
            </p>
          )}

          {/* Фото */}
          {excursion.mainImage && (
            <img
              src={excursion.mainImage}
              alt={excursion.title}
              className='mt-4 w-full max-h-48 rounded-lg object-cover'
            />
          )}
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button
            disabled={
              !selectedScheduleId || !selectedSlotTime || availableSeats <= 0
            }
            onClick={() => alert('Переход к следующему этапу')}
          >
            Продолжить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
