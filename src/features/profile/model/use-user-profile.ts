import type { User } from '@/shared/model/types';
import { useQuery } from '@tanstack/react-query';
import { authService } from '../api';

export function useUserProfile() {
  return useQuery<User>({
    queryKey: ['userProfile'],
    queryFn: async () => {
      try {
        const data = await authService.getProfile();
        return data;
      } catch (error) {
        console.error('❌ useUserProfile: fetch error', error);
        throw error;
      }
    },
  });
}
