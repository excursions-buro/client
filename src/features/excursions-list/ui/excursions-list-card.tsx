import type { Excursion } from '../api';

export function ExcursionCard({ excursion }: { excursion: Excursion }) {
  return (
    <div className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'>
      <h3 className='text-xl font-semibold mb-2'>{excursion.title}</h3>
      <div className='space-y-1'>
        <p className='text-gray-600'>
          Цена: {excursion.basePrice.toLocaleString()} ₽
        </p>
        {excursion.images[0] && (
          <img
            src={excursion.mainImage}
            alt={excursion.title}
            className='w-full h-48 object-cover rounded'
          />
        )}
      </div>
    </div>
  );
}
