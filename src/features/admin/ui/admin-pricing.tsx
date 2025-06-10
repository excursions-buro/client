import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { useState } from 'react';

// Пример начальных данных для цен
const initialPricing = [
  {
    id: '1',
    excursionTitle: 'Экскурсия по городу',
    category: 'Взрослый',
    price: 1500,
  },
  {
    id: '2',
    excursionTitle: 'Экскурсия по городу',
    category: 'Детский',
    price: 750,
  },
  {
    id: '3',
    excursionTitle: 'Музей современного искусства',
    category: 'Взрослый',
    price: 1000,
  },
  {
    id: '4',
    excursionTitle: 'Музей современного искусства',
    category: 'Студент',
    price: 500,
  },
];

export function AdminPricing() {
  const [pricing, setPricing] = useState(initialPricing);
  const [newPrice, setNewPrice] = useState({
    excursionTitle: '',
    category: '',
    price: '',
  });

  const handleAddPrice = () => {
    if (newPrice.excursionTitle && newPrice.category && newPrice.price) {
      setPricing([
        ...pricing,
        {
          ...newPrice,
          id: Date.now().toString(),
          price: parseFloat(newPrice.price),
        },
      ]);
      setNewPrice({ excursionTitle: '', category: '', price: '' });
    }
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <h2 className='text-xl font-bold mb-4'>Управление ценами</h2>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Добавить новую ценовую категорию</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 grid-cols-3'>
            <Input
              placeholder='Название экскурсии'
              value={newPrice.excursionTitle}
              onChange={(e) =>
                setNewPrice({ ...newPrice, excursionTitle: e.target.value })
              }
            />
            <Input
              placeholder='Категория билета'
              value={newPrice.category}
              onChange={(e) =>
                setNewPrice({ ...newPrice, category: e.target.value })
              }
            />
            <Input
              placeholder='Цена'
              type='number'
              value={newPrice.price}
              onChange={(e) =>
                setNewPrice({ ...newPrice, price: e.target.value })
              }
            />
            <Button onClick={handleAddPrice}>Добавить ценовую категорию</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список цен</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название экскурсии</TableHead>
                <TableHead>Категория билета</TableHead>
                <TableHead>Цена</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricing.map((price) => (
                <TableRow key={price.id}>
                  <TableCell>{price.excursionTitle}</TableCell>
                  <TableCell>{price.category}</TableCell>
                  <TableCell>{price.price} RUB</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
