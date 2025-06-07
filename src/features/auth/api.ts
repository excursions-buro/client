import { publicFetchClient } from '@/shared/api/instance';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  verificationCode: string;
}

interface SendCodePayload {
  email: string;
}

interface VerifyCodePayload {
  email: string;
  code: string;
}

export const authService = {
  login: (data: LoginPayload) =>
    publicFetchClient.post('/api/auth/login', data).then((res) => res.data),
  register: (data: RegisterPayload) =>
    publicFetchClient.post('/api/auth/register', data).then((res) => res.data),
  sendCode: (data: SendCodePayload) =>
    publicFetchClient.post('/api/auth/send-code', data).then((res) => res.data),
  verifyCode: (data: VerifyCodePayload) =>
    publicFetchClient
      .post('/api/auth/verify-code', data)
      .then((res) => res.data),
};
