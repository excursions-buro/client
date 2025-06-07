import type { Order } from '@/shared/model/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о заказе</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <h3 className='font-medium text-muted-foreground'>Статус</h3>
          <p className='text-lg'>{order.status}</p>
        </div>

        <div>
          <h3 className='font-medium text-muted-foreground'>Дата создания</h3>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div>
          <h3 className='font-medium text-muted-foreground'>Сумма</h3>
          <p className='text-xl font-bold'>{order.totalPrice} ₽</p>
        </div>

        <div>
          <h3 className='font-medium text-muted-foreground'>
            Контактная информация
          </h3>
          <p>{order.contactName}</p>
          <p>{order.contactEmail}</p>
          {order.contactPhone && <p>{order.contactPhone}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
