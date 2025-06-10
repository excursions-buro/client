import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Checkbox } from '@/shared/ui/checkbox';
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

// Определяем тип для расписания
type ScheduleItem = {
  id: string;
  excursionTitle: string;
  days: string[];
  time: string;
  maxPeople: number;
};

// Пример начальных данных для расписания
const initialSchedule: ScheduleItem[] = [
  {
    id: '1',
    excursionTitle: 'Экскурсия по городу',
    days: ['Понедельник', 'Среда'],
    time: '10:00',
    maxPeople: 20,
  },
  {
    id: '2',
    excursionTitle: 'Музей современного искусства',
    days: ['Вторник', 'Четверг'],
    time: '14:00',
    maxPeople: 15,
  },
];

const daysOfWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

export function AdminSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);
  const [newSchedule, setNewSchedule] = useState<Omit<ScheduleItem, 'id'>>({
    excursionTitle: '',
    days: [],
    time: '',
    maxPeople: 0,
  });

  const handleDayToggle = (day: string) => {
    setNewSchedule((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleAddSchedule = () => {
    if (
      newSchedule.excursionTitle &&
      newSchedule.days.length > 0 &&
      newSchedule.time &&
      newSchedule.maxPeople
    ) {
      setSchedule([
        ...schedule,
        {
          ...newSchedule,
          id: Date.now().toString(),
        },
      ]);
      setNewSchedule({
        excursionTitle: '',
        days: [],
        time: '',
        maxPeople: 0,
      });
    }
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <h2 className='text-xl font-bold mb-4'>Управление расписанием</h2>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Добавить новое расписание</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <Input
              placeholder='Название экскурсии'
              value={newSchedule.excursionTitle}
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  excursionTitle: e.target.value,
                })
              }
            />
            <div className='flex flex-wrap gap-2'>
              {daysOfWeek.map((day) => (
                <div key={day} className='flex items-center space-x-2'>
                  <Checkbox
                    id={day}
                    checked={newSchedule.days.includes(day)}
                    onCheckedChange={() => handleDayToggle(day)}
                  />
                  <label htmlFor={day}>{day}</label>
                </div>
              ))}
            </div>
            <Input
              placeholder='Время (HH:MM)'
              value={newSchedule.time}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, time: e.target.value })
              }
            />
            <Input
              placeholder='Макс. количество человек'
              type='number'
              value={newSchedule.maxPeople}
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  maxPeople: parseInt(e.target.value) || 0,
                })
              }
            />
            <Button onClick={handleAddSchedule}>Добавить расписание</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список расписаний</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название экскурсии</TableHead>
                <TableHead>Дни недели</TableHead>
                <TableHead>Время</TableHead>
                <TableHead>Макс. количество человек</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.excursionTitle}</TableCell>
                  <TableCell>{item.days.join(', ')}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.maxPeople}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
