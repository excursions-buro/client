import { publicFetchClient } from '@/shared/api/instance';
import type { Order } from '@/shared/model/types';

export const orderService = {
  getOrder: (id: string) => {
    return publicFetchClient
      .get<Order>(`/api/orders/order/${id}`)
      .then((res) => res.data);
  },
};
