import { useSession } from '@/shared/model/session';
import type { Order } from '@/shared/model/types';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { useUserOrders } from './model/use-user-orders';

function Spinner() {
  return (
    <div className='w-6 h-6 border-4 border-t-transparent border-primary rounded-full animate-spin' />
  );
}

function OrdersPage() {
  const { session } = useSession();
  const userId = session?.userId ?? '';

  const { data: orders, isLoading, isError } = useUserOrders(userId);

  if (!userId) return <p className='text-center py-10'>Вы не авторизованы</p>;

  if (isLoading)
    return (
      <div className='flex justify-center py-10'>
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <p className='text-center py-10 text-destructive'>
        Ошибка загрузки заказов
      </p>
    );

  if (!orders || orders.length === 0)
    return <p className='text-center py-10'>Заказы не найдены</p>;

  return (
    <Card className='max-w-3xl mx-auto mt-8'>
      <CardHeader>
        <CardTitle>Ваши заказы</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='max-h-[400px]'>
          {orders.map((order: Order) => (
            <div key={order.id} className='mb-6'>
              <div className='flex justify-between items-center mb-1'>
                <p className='font-semibold'>Заказ #{order.id}</p>
                <Badge variant='secondary'>{order.status}</Badge>
              </div>
              <p className='text-sm text-muted-foreground'>
                Дата: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <Separator className='my-4' />
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export const Component = OrdersPage;
