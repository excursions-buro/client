import type { User } from '@/shared/model/types';
import { useQuery } from '@tanstack/react-query';
import { authService } from '../api';

export function useUserProfile() {
  return useQuery<User>({
    queryKey: ['userProfile'],
    queryFn: authService.getProfile,
  });
}
