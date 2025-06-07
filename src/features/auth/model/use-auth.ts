import { useMutation } from '@tanstack/react-query';
import { authService } from '../api';

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authService.register,
  });
}

export function useSendCode() {
  return useMutation({
    mutationFn: authService.sendCode,
  });
}

export function useVerifyCode() {
  return useMutation({
    mutationFn: authService.verifyCode,
  });
}
