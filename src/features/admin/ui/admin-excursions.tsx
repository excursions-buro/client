import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { useState } from 'react';

// Определяем возможные статусы
type ExcursionStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

// Пример начальных данных для экскурсий
const initialExcursions = [
  {
    id: '1',
    title: 'Экскурсия по городу',
    description: 'Полная экскурсия по основным достопримечательностям города.',
    basePrice: 1500,
    status: 'ACTIVE' as ExcursionStatus,
  },
  {
    id: '2',
    title: 'Музей современного искусства',
    description: 'Экскурсия по музею современного искусства.',
    basePrice: 1000,
    status: 'COMPLETED' as ExcursionStatus,
  },
];

export function AdminExcursions() {
  const [excursions, setExcursions] = useState(initialExcursions);
  const [newExcursion, setNewExcursion] = useState({
    title: '',
    description: '',
    basePrice: '',
    status: 'ACTIVE' as ExcursionStatus,
  });

  const handleAddExcursion = () => {
    if (
      newExcursion.title &&
      newExcursion.description &&
      newExcursion.basePrice
    ) {
      setExcursions([
        ...excursions,
        {
          ...newExcursion,
          id: Date.now().toString(),
          basePrice: parseFloat(newExcursion.basePrice),
        },
      ]);
      setNewExcursion({
        title: '',
        description: '',
        basePrice: '',
        status: 'ACTIVE',
      });
    }
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <h2 className='text-xl font-bold mb-4'>Управление экскурсиями</h2>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Добавить новую экскурсию</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 grid-cols-4'>
            <Input
              placeholder='Название'
              value={newExcursion.title}
              onChange={(e) =>
                setNewExcursion({ ...newExcursion, title: e.target.value })
              }
            />
            <Input
              placeholder='Описание'
              value={newExcursion.description}
              onChange={(e) =>
                setNewExcursion({
                  ...newExcursion,
                  description: e.target.value,
                })
              }
            />
            <Input
              placeholder='Базовая цена'
              type='number'
              value={newExcursion.basePrice}
              onChange={(e) =>
                setNewExcursion({ ...newExcursion, basePrice: e.target.value })
              }
            />
            <Select
              value={newExcursion.status}
              onValueChange={(value: ExcursionStatus) =>
                setNewExcursion({ ...newExcursion, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Выберите статус' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ACTIVE'>Активна</SelectItem>
                <SelectItem value='COMPLETED'>Завершена</SelectItem>
                <SelectItem value='CANCELLED'>Отменена</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddExcursion}>Добавить экскурсию</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список экскурсий</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Базовая цена</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {excursions.map((excursion) => (
                <TableRow key={excursion.id}>
                  <TableCell>{excursion.title}</TableCell>
                  <TableCell>{excursion.description}</TableCell>
                  <TableCell>{excursion.basePrice} RUB</TableCell>
                  <TableCell>{excursion.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
