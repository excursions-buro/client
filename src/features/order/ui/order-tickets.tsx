import type { OrderItem } from '@/shared/model/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function OrderTickets({ items }: { items: OrderItem[] }) {
  const allTickets = items.flatMap((item) =>
    Array.from({ length: item.quantity }, (_, i) => ({
      id: `${item.id}-${i}`,
      type: item.ticketCategory.name,
      price: item.price,
      status: 'Активен',
      visitor_name: 'Посетитель',
    }))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Билеты</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {allTickets.map((ticket) => (
            <div key={ticket.id} className='border rounded-lg p-4'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='font-medium'>
                    Билет #{ticket.id.slice(0, 6)}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {ticket.type} • {ticket.price} ₽
                  </p>
                </div>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  {ticket.status}
                </span>
              </div>

              <div className='mt-3'>
                <p className='text-sm'>
                  <span className='text-muted-foreground'>Посетитель:</span>{' '}
                  {ticket.visitor_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
