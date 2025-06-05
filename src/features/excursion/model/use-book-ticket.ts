import type { BookingData, Order } from '@/shared/model/types';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import { excursionService } from '../api';

export const useBookTicket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const bookTicket = async (excursionId: string, bookingData: BookingData) => {
    setIsLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response = await excursionService.bookTicket(
        excursionId,
        bookingData
      );

      const orderData = response.data;
      setOrder(orderData);

      // Добавляем описание с номером заказа
      toast.success('Бронирование успешно создано!', {
        description: `Номер вашего заказа: ${orderData.id}`,
      });

      return orderData;
    } catch (err) {
      let errorMessage =
        'Произошла ошибка при бронировании. Пожалуйста, попробуйте позже.';

      if (isAxiosError(err)) {
        errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setError(errorMessage);
      toast.error('Ошибка бронирования', {
        description: errorMessage,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bookTicket,
    isLoading,
    error,
    order,
    reset: () => {
      setError(null);
      setOrder(null);
    },
  };
};
