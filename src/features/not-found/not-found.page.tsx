import { Button } from '@/shared/ui/button';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <img
        src='https://http.cat/404'
        alt='404 Not Found'
        className='w-1/3 mb-4'
      />
      <h1 className='text-4xl font-bold mb-4'>Ой, кажется, вы заблудились!</h1>
      <p className='text-lg mb-8'>
        Страница, которую вы ищете, исчезла или была похищена инопланетянами.
      </p>
      <Button asChild variant='ghost'>
        <Link
          to='/'
          className='px-4 py-2 bg-white rounded hover:bg-gray-200 transition'
        >
          Вернуться на главную
        </Link>
      </Button>
    </div>
  );
}

export const Component = NotFoundPage;
