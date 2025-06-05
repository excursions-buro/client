// FiltersSidebar.tsx
import { Button } from '@/shared/ui/button';
import { DatePicker } from '@/shared/ui/date-picker';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import type {
  ExcursionFilters,
  ExcursionType,
} from '../../../shared/model/types';

type FiltersSidebarProps = {
  filters: ExcursionFilters;
  onFilterChange: <K extends keyof ExcursionFilters>(
    field: K,
    value: ExcursionFilters[K]
  ) => void;
  onReset: () => void;
  types?: ExcursionType[];
  isLoadingTypes: boolean;
  hasActiveFilters: boolean;
};

export function FiltersSidebar({
  filters,
  onFilterChange,
  onReset,
  types,
  isLoadingTypes,
  hasActiveFilters,
}: FiltersSidebarProps) {
  const handleInputChange =
    (key: keyof ExcursionFilters) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange(key, e.target.value);
    };

  const handleNumberChange =
    (key: 'priceMin' | 'priceMax' | 'peopleCount') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const parsed = raw === '' ? undefined : Number(raw);
      onFilterChange(key, isNaN(parsed as number) ? undefined : parsed);
    };

  const handleDateChange = (date?: Date) => {
    onFilterChange('date', date);
  };

  const handleSelectChange = (value: string) => {
    onFilterChange('typeId', value === 'all' ? undefined : value);
  };

  const selectValue = useMemo(() => filters.typeId || 'all', [filters.typeId]);

  return (
    <div className='w-full space-y-6 p-4 bg-background rounded-lg border shadow-sm'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Фильтры</h2>
        {hasActiveFilters && (
          <Button
            variant='ghost'
            size='sm'
            onClick={onReset}
            className='text-muted-foreground hover:text-foreground flex items-center gap-1 px-2'
          >
            <X size={16} />
            <span>Сбросить</span>
          </Button>
        )}
      </div>

      <div className='space-y-5'>
        <div className='space-y-2'>
          <Label>Поиск по названию</Label>
          <Input
            placeholder='Введите название экскурсии'
            value={filters.title || ''}
            onChange={handleInputChange('title')}
          />
        </div>

        <div className='space-y-2'>
          <Label>Тип экскурсии</Label>
          <Select value={selectValue} onValueChange={handleSelectChange}>
            <SelectTrigger className='bg-background'>
              <SelectValue placeholder='Все типы' />
            </SelectTrigger>
            <SelectContent>
              {!isLoadingTypes && <SelectItem value='all'>Все типы</SelectItem>}
              {isLoadingTypes ? (
                <SelectItem disabled value='loading'>
                  Загрузка...
                </SelectItem>
              ) : (
                types?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label>Цена, руб.</Label>
          <div className='grid grid-cols-2 gap-2'>
            <Input
              placeholder='От'
              type='number'
              min={0}
              value={filters.priceMin?.toString() || ''}
              onChange={handleNumberChange('priceMin')}
            />
            <Input
              placeholder='До'
              type='number'
              min={filters.priceMin ?? 0}
              value={filters.priceMax?.toString() || ''}
              onChange={handleNumberChange('priceMax')}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label>Дата проведения</Label>
          <DatePicker value={filters.date} onChange={handleDateChange} />
        </div>

        <div className='space-y-2'>
          <Label>Количество человек</Label>
          <Input
            type='number'
            min={1}
            placeholder='Укажите количество'
            value={filters.peopleCount?.toString() || ''}
            onChange={handleNumberChange('peopleCount')}
          />
        </div>

        <Button onClick={onReset} variant='outline' className='w-full mt-4'>
          Сбросить все фильтры
        </Button>
      </div>
    </div>
  );
}
