import { publicFetchClient } from '@/shared/api/instance';
import type { User } from '@/shared/model/types';

export const authService = {
  getProfile: (): Promise<User> =>
    publicFetchClient.get('/api/me').then((res) => res.data),

  updateProfile: (data: { name: string }): Promise<User> =>
    publicFetchClient.patch('/api/me', data).then((res) => res.data),
};
