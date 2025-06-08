import type { Order } from '@/shared/model/types';
import { useQuery } from '@tanstack/react-query';
import { ordersService } from '../api';

export function useUserOrders(userId: string) {
  return useQuery<Order[]>({
    queryKey: ['userOrders', userId],
    queryFn: () => ordersService.getOrdersByUser(userId),
    enabled: !!userId,
  });
}
