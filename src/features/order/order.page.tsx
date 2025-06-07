import { Skeleton } from '@/shared/ui/skeleton';
import { useParams } from 'react-router-dom';
import { useOrder } from './model/use-order';
import { OrderCard } from './ui/order-card';
import { OrderTickets } from './ui/order-tickets';

export function OrderPage() {
  const { orderId } = useParams();
  const { data: order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <Skeleton className='h-8 w-1/3 mb-6' />
        <div className='space-y-4'>
          <Skeleton className='h-20 w-full' />
          <Skeleton className='h-32 w-full' />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto p-4 text-red-500 text-center'>
        <h1 className='text-xl font-bold mb-2'>Ошибка загрузки заказа</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='container mx-auto p-4 text-center'>
        <h1 className='text-xl font-bold'>Заказ не найден</h1>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <h1 className='text-2xl font-bold mb-6'>
        Детали заказа #{order.id.slice(0, 8)}
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <OrderCard order={order} />
        </div>

        <div className='lg:col-span-1'>
          <OrderTickets items={order.items} />
        </div>
      </div>
    </div>
  );
}

export const Component = OrderPage;
