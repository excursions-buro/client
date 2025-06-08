import type { User } from '@/shared/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { name: string }>({
    mutationFn: (data) => authService.updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['userProfile'], updatedUser);
    },
  });
}
