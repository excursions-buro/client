import type { Order } from '@/shared/model/types';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '../api';

export function useOrder(orderId: string | undefined) {
  return useQuery<Order>({
    queryKey: ['order', orderId],
    queryFn: () => {
      if (!orderId) throw new Error('Order ID is required');
      return orderService.getOrder(orderId);
    },
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
  });
}
