import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Регистрация необходимых компонентов ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function AdminAnalytics() {
  // Пример данных для графика
  const data = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
    datasets: [
      {
        label: 'Продажи',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Аналитика продаж',
      },
    },
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <h2 className='text-xl font-bold mb-4'>Аналитика</h2>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Общие продажи</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>1250</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Новые пользователи</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>342</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Активные экскурсии</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>23</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Общая выручка</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>570000 RUB</p>
          </CardContent>
        </Card>
      </div>
      <div className='mt-6'>
        <Card>
          <CardContent>
            <Bar data={data} options={options} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
