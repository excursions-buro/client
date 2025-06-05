import type { Excursion, ScheduleSlot } from '@/shared/model/types';

function isFutureDate(date: Date): boolean {
  const now = new Date();
  return date > now;
}

function createDateWithDayTime(
  baseDate: Date,
  targetDay: number,
  hours: number,
  minutes: number
): Date {
  const date = new Date(baseDate);

  const currentDay = date.getDay();
  let daysToAdd = (targetDay - currentDay + 7) % 7;

  if (daysToAdd === 0) {
    date.setHours(hours, minutes, 0, 0);
    if (date < baseDate) {
      daysToAdd = 7;
    }
  }

  date.setDate(date.getDate() + daysToAdd);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function findNearestSlot(excursion: Excursion): {
  date: Date | null;
  slot: ScheduleSlot | null;
} {
  const now = new Date();
  let nearestDate: Date | null = null;
  let nearestSlot: ScheduleSlot | null = null;

  for (const schedule of excursion.schedules) {
    const scheduleStart = new Date(schedule.startDate);
    const scheduleEnd = new Date(schedule.endDate);

    if (now > scheduleEnd) continue;

    for (const slot of schedule.slots) {
      const slotDay = slot.weekDay === 7 ? 0 : slot.weekDay;

      const [hours, minutes] = slot.time.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) continue;

      if (now >= scheduleStart && now <= scheduleEnd) {
        const slotDate = createDateWithDayTime(now, slotDay, hours, minutes);

        if (!isFutureDate(slotDate)) continue;

        if (slotDate >= scheduleStart && slotDate <= scheduleEnd) {
          if (!nearestDate || slotDate < nearestDate) {
            nearestDate = slotDate;
            nearestSlot = slot;
          }
        }
      } else if (now < scheduleStart) {
        const slotDate = createDateWithDayTime(
          scheduleStart,
          slotDay,
          hours,
          minutes
        );

        if (slotDate < scheduleStart) {
          slotDate.setDate(slotDate.getDate() + 7);
        }

        if (isFutureDate(slotDate) && slotDate <= scheduleEnd) {
          if (!nearestDate || slotDate < nearestDate) {
            nearestDate = slotDate;
            nearestSlot = slot;
          }
        }
      }
    }
  }

  return { date: nearestDate, slot: nearestSlot };
}
