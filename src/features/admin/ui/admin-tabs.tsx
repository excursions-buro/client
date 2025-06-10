import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

const tabs = [
  { id: 'schedule', label: 'Расписание' },
  { id: 'pricing', label: 'Цены' },
  { id: 'excursions', label: 'Экскурсии' },
  { id: 'analytics', label: 'Аналитика' },
];

interface Props {
  current: string;
  onChange: (tab: string) => void;
}

export function AdminTabs({ current, onChange }: Props) {
  return (
    <Tabs value={current} onValueChange={onChange}>
      <TabsList className='grid w-full grid-cols-4'>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
