import type { Excursion } from '@/shared/model/types';

export function getPriceRange(excursion: Excursion) {
  if (!excursion.tickets || excursion.tickets.length === 0) {
    return null;
  }

  return excursion.tickets.reduce(
    (acc, ticket) => ({
      min: Math.min(acc.min, ticket.price),
      max: Math.max(acc.max, ticket.price),
    }),
    { min: Infinity, max: -Infinity }
  );
}
