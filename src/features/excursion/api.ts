import { publicFetchClient } from '@/shared/api/instance';
import type { BookingData, Excursion, Order } from '@/shared/model/types';

export const excursionService = {
  getExcursionById: (id: string) =>
    publicFetchClient.get<Excursion>(`/api/excursions/${id}`, {
      params: {
        expand: ['type', 'images', 'schedules.slots', 'tickets'].join(','),
      },
    }),

  bookTicket: (excursionId: string, bookingData: BookingData) =>
    publicFetchClient.post<Order>(
      `/api/bookings/${excursionId}/book`,
      bookingData
    ),

  getBookedSeats: (scheduleId: string, slotTime: string) =>
    publicFetchClient.get<number>(`/api/bookings/seats`, {
      params: { scheduleId, slotTime },
    }),
};
