import { useSession } from '@/shared/model/session';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegister, useSendCode } from '../model/use-auth';

interface Step1Values {
  email: string;
}

interface Step2Values {
  email: string;
  name: string;
  password: string;
  verificationCode: string;
}

export function RegisterForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const sendCodeMutation = useSendCode();
  const registerMutation = useRegister();

  const step1Form = useForm<Step1Values>({
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  const step2Form = useForm<Step2Values>({
    defaultValues: { email: '', name: '', password: '', verificationCode: '' },
    mode: 'onChange',
  });

  const onSendCode = (data: Step1Values) => {
    sendCodeMutation.mutate(data, {
      onSuccess: () => {
        step2Form.reset({ email: data.email });
        setStep(2);
      },
    });
  };

  const onRegister = (data: Step2Values) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        // Редирект после успешной регистрации
        useSession.getState().login(response.accessToken);
        navigate('/');
      },
    });
  };

  return (
    <div className='space-y-6'>
      {step === 1 && (
        <Form {...step1Form}>
          <form
            onSubmit={step1Form.handleSubmit(onSendCode)}
            noValidate
            className='space-y-4'
          >
            <FormField
              control={step1Form.control}
              name='email'
              rules={{
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email',
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input
                      id='email'
                      type='email'
                      placeholder='example@mail.com'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full'
              disabled={sendCodeMutation.isPending}
            >
              {sendCodeMutation.isPending
                ? 'Отправляем код...'
                : 'Отправить код'}
            </Button>

            {sendCodeMutation.isError && (
              <p className='mt-2 text-sm text-destructive'>
                {(sendCodeMutation.error as Error)?.message ||
                  'Произошла ошибка при отправке кода'}
              </p>
            )}
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...step2Form}>
          <form
            onSubmit={step2Form.handleSubmit(onRegister)}
            noValidate
            className='space-y-4'
          >
            <FormField
              control={step2Form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className='flex items-center p-2 border rounded-md bg-muted'>
                    <span className='text-sm'>{field.value}</span>
                  </div>
                  <input type='hidden' {...field} />
                </FormItem>
              )}
            />

            <FormField
              control={step2Form.control}
              name='name'
              rules={{
                required: 'Имя обязательно',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать минимум 2 символа',
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor='name'>Имя</FormLabel>
                  <FormControl>
                    <Input
                      id='name'
                      type='text'
                      placeholder='Ваше имя'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={step2Form.control}
              name='password'
              rules={{
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символов',
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor='password'>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      id='password'
                      type='password'
                      placeholder='••••••••'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={step2Form.control}
              name='verificationCode'
              rules={{
                required: 'Код подтверждения обязателен',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Код должен состоять из 6 цифр',
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor='verificationCode'>
                    Код подтверждения
                  </FormLabel>
                  <FormControl>
                    <Input
                      id='verificationCode'
                      type='text'
                      placeholder='Введите код из письма'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className='flex gap-2'>
              <Button
                type='button'
                variant='outline'
                className='flex-1'
                onClick={() => setStep(1)}
                disabled={registerMutation.isPending}
              >
                Назад
              </Button>
              <Button
                type='submit'
                className='flex-1'
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending
                  ? 'Регистрируем...'
                  : 'Зарегистрироваться'}
              </Button>
            </div>

            {registerMutation.isError && (
              <p className='mt-2 text-sm text-destructive'>
                {(registerMutation.error as Error)?.message ||
                  'Произошла ошибка при регистрации'}
              </p>
            )}
          </form>
        </Form>
      )}
    </div>
  );
}
