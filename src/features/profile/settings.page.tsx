import { useSession } from '@/shared/model/session';
import type { User } from '@/shared/model/types';
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
import { Label } from '@/shared/ui/label';
import { Skeleton } from '@/shared/ui/skeleton';
import Switch from '@/shared/ui/switch';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUser } from './model/use-update-profile';
import { useUserProfile } from './model/use-user-profile';

interface ProfileFormValues {
  name: string;
  email: string;
}

function UserProfileDetails({
  user,
  onEdit,
}: {
  user: User;
  onEdit: () => void;
}) {
  return (
    <div className='space-y-4'>
      <div>
        <h2 className='font-semibold'>Email</h2>
        <p className='text-muted-foreground'>{user.email}</p>
      </div>
      <div>
        <h2 className='font-semibold'>Имя</h2>
        <p className='text-muted-foreground'>{user.name || 'Не указано'}</p>
      </div>
      <div>
        <h2 className='font-semibold'>Роль</h2>
        <p className='text-muted-foreground'>{user.role || '—'}</p>
      </div>
      <div>
        <h2 className='font-semibold'>Дата регистрации</h2>
        <p className='text-muted-foreground'>
          {user.createdAt
            ? new Date(user.createdAt).toLocaleString('ru-RU')
            : '—'}
        </p>
      </div>
      <Button type='button' onClick={onEdit}>
        Редактировать
      </Button>
    </div>
  );
}

function SettingsPage() {
  const { session } = useSession();
  const { data: user, isLoading, isError } = useUserProfile();
  const updateUserMutation = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Состояния для управления темой
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const form = useForm<ProfileFormValues>({
    defaultValues: { name: '', email: '' },
    mode: 'onBlur',
  });

  // Инициализация темы при монтировании
  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('theme') as
      | 'light'
      | 'dark'
      | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    setTheme(storedTheme || systemTheme);
  }, []);

  // Применение темы и сохранение в localStorage
  useEffect(() => {
    if (!isMounted) return;

    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme, isMounted]);

  useEffect(() => {
    if (user) {
      console.log('✅ Reset form with user:', user);
      form.reset({
        name: user.name ?? '',
        email: user.email ?? '',
      });
    }
  }, [user, form]);

  if (isLoading) return <Skeleton className='h-48' />;
  if (isError || !user) return <p>Не удалось загрузить данные</p>;
  if (!session) return <p>Вы не авторизованы</p>;

  const onSubmit = async (data: ProfileFormValues) => {
    setUpdateError(null);
    try {
      console.log('📤 Submitting update:', data);
      await updateUserMutation.mutateAsync({ name: data.name.trim() });
      setIsEditing(false);
      console.log('✅ Update success');
    } catch (error) {
      const message =
        (error as Error).message || 'Ошибка обновления пользователя';
      setUpdateError(message);
      console.error('❌ Update error:', message);
    }
  };

  return (
    <div className='max-w-xl mx-auto p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Настройки профиля</h1>

      {/* Секция переключения темы */}
      <div className='flex items-center justify-between p-4 border rounded-lg'>
        <div>
          <Label htmlFor='theme-switch'>Темная тема</Label>
          <p className='text-sm text-muted-foreground'>
            {theme === 'dark' ? 'Активна' : 'Неактивна'}
          </p>
        </div>
        <Switch
          id='theme-switch'
          checked={theme === 'dark'}
          onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
      </div>

      {!isEditing ? (
        <UserProfileDetails
          user={user}
          onEdit={() => {
            console.log('📝 Edit mode enabled');
            setIsEditing(true);
          }}
        />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label className='block font-semibold mb-1'>Email</label>
              <Input value={user.email} disabled />
            </div>

            <FormField
              control={form.control}
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
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            {updateError && (
              <p className='text-sm text-destructive'>{updateError}</p>
            )}

            <div className='flex gap-2'>
              <Button type='submit' disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? 'Сохраняем...' : 'Сохранить'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  console.log('❌ Cancel edit');
                  setIsEditing(false);
                  setUpdateError(null);
                  form.reset({
                    name: user.name ?? '',
                    email: user.email ?? '',
                  });
                }}
                disabled={updateUserMutation.isPending}
              >
                Отмена
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export const Component = SettingsPage;
