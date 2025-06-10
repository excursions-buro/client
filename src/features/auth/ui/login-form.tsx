import { ROUTES } from '@/shared/model/routes';
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
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../model/use-auth';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        // Редирект после успешного входа
        useSession.getState().login(response.accessToken);
        navigate(ROUTES.HOME);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className='space-y-4'
      >
        <FormField
          control={form.control}
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

        <FormField
          control={form.control}
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

        <Button
          type='submit'
          className='w-full'
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Вход...' : 'Войти'}
        </Button>

        {loginMutation.isError && (
          <p className='mt-2 text-sm text-destructive'>
            {(loginMutation.error as Error)?.message ||
              'Произошла ошибка при входе'}
          </p>
        )}
      </form>
      <Button asChild variant='link' className='pt-2'>
        <Link to={ROUTES.REGISTER}>Еще не зарегистрированы?</Link>
      </Button>
    </Form>
  );
}
