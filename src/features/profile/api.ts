import { publicFetchClient } from '@/shared/api/instance';
import type { User } from '@/shared/model/types';

export const authService = {
  getProfile: (): Promise<User> =>
    publicFetchClient.get('/api/me').then((res) => res.data.user),

  updateProfile: (data: { name: string }): Promise<User> =>
    publicFetchClient.patch('/api/me', data).then((res) => res.data),
};

export const ordersService = {
  getOrdersByUser: (userId: string) =>
    publicFetchClient.get(`/api/orders/${userId}`).then((res) => res.data),
};
