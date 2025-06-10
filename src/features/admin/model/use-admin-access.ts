import { useUserProfile } from '@/features/profile';
import { useQuery } from '@tanstack/react-query';

export function useAdminAccess() {
  return useQuery({
    queryKey: ['admin-access'],
    queryFn: useUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
