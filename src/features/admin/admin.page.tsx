import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminAnalytics } from './ui/admin-analytics';
import { AdminExcursions } from './ui/admin-excursions';
import { AdminLayout } from './ui/admin-layout';
import { AdminPricing } from './ui/admin-pricing';
import { AdminSchedule } from './ui/admin-schedule';
import { AdminTabs } from './ui/admin-tabs';

const tabs = [
  { id: 'schedule', label: 'Расписание' },
  { id: 'pricing', label: 'Цены' },
  { id: 'excursions', label: 'Экскурсии' },
  { id: 'analytics', label: 'Аналитика' },
];

function AdminPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || tabs[0].id;

  // Проверка валидности текущей вкладки
  useEffect(() => {
    if (!tabs.some((tab) => tab.id === currentTab)) {
      setSearchParams({ tab: tabs[0].id }, { replace: true });
    }
  }, [currentTab, setSearchParams]);

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'schedule':
        return <AdminSchedule />;
      case 'pricing':
        return <AdminPricing />;
      case 'excursions':
        return <AdminExcursions />;
      case 'analytics':
        return <AdminAnalytics />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className='container mx-auto p-4'>
        <AdminTabs current={currentTab} onChange={handleTabChange} />
        <div className='mt-4'>{renderContent()}</div>
      </div>
    </AdminLayout>
  );
}

export const Component = AdminPage;
