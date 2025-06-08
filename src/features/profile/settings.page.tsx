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
import { Skeleton } from '@/shared/ui/skeleton';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUser } from './model/use-update-profile';
import { useUserProfile } from './model/use-user-profile';

interface ProfileFormValues {
  name: string;
  email: string;
}

function SettingsPage() {
  const { session } = useSession();
  const { data: user, isLoading, isError } = useUserProfile();
  const updateUserMutation = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? '',
        email: user.email ?? '',
      });
    }
  }, [user, form]);

  if (isLoading) return <Skeleton className='h-48' />;
  if (isError || !user) return <p>Не удалось загрузить данные</p>;

  if (!session) {
    return <p>Вы не авторизованы</p>;
  }

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateUserMutation.mutateAsync({ name: data.name });
      setIsEditing(false);
    } catch (error) {
      // Здесь можно обработать ошибку, например показать уведомление
      console.error('Ошибка обновления пользователя:', error);
    }
  };

  return (
    <div className='max-w-xl mx-auto p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Настройки</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                {isEditing ? (
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                ) : (
                  <div className='text-muted-foreground'>{field.value}</div>
                )}
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                {isEditing ? (
                  <>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </>
                ) : (
                  <div className='text-muted-foreground'>
                    {field.value || 'Не указано'}
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Кнопки */}
          {isEditing ? (
            <div className='flex gap-2'>
              <Button type='submit' disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? 'Сохраняем...' : 'Сохранить'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsEditing(false)}
                disabled={updateUserMutation.isPending}
              >
                Отмена
              </Button>
            </div>
          ) : (
            <Button type='button' onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export const Component = SettingsPage;
