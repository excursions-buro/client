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
import type { ExcursionFilters, ExcursionType } from '../types';

type FiltersSidebarProps = {
  filters: ExcursionFilters;
  onFilterChange: <K extends keyof ExcursionFilters>(
    field: K,
    value: ExcursionFilters[K]
  ) => void;
  onReset: () => void;
  types?: ExcursionType[];
  isLoadingTypes: boolean;
};

export function FiltersSidebar({
  filters,
  onFilterChange,
  onReset,
  types,
  isLoadingTypes,
}: FiltersSidebarProps) {
  const handleInputChange =
    <K extends keyof ExcursionFilters>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange(key, e.target.value as ExcursionFilters[K]);
    };

  const handleNumberChange =
    <K extends keyof ExcursionFilters>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onFilterChange(
        key,
        value === '' ? undefined : (value as ExcursionFilters[K])
      );
    };

  const handleDateChange = (date: Date | undefined) => {
    onFilterChange('date', date);
  };

  return (
    <div className='w-full space-y-6'>
      <h2 className='text-xl font-semibold'>Фильтры</h2>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label>Поиск по названию</Label>
          <Input
            placeholder='Название экскурсии'
            value={filters.title || ''}
            onChange={handleInputChange('title')}
          />
        </div>

        <div className='space-y-2'>
          <Label>Тип экскурсии</Label>
          <Select
            value={filters.typeId || ''}
            onValueChange={(v) => onFilterChange('typeId', v as string)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Выберите тип' />
            </SelectTrigger>
            <SelectContent>
              {isLoadingTypes && (
                <SelectItem disabled value='loading'>
                  Загрузка...
                </SelectItem>
              )}
              {types?.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label>Цена</Label>
          <div className='flex gap-2'>
            <Input
              placeholder='От'
              type='number'
              value={filters.priceMin || ''}
              onChange={handleNumberChange('priceMin')}
            />
            <Input
              placeholder='До'
              type='number'
              value={filters.priceMax || ''}
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
            placeholder='Количество человек'
            value={filters.peopleCount || ''}
            onChange={handleNumberChange('peopleCount')}
          />
        </div>

        <Button variant='outline' onClick={onReset} className='w-full'>
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
}
