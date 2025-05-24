import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatDate(
  dateString: string,
  formatStr = 'dd MMM yyyy, HH:mm'
): string {
  return format(parseISO(dateString), formatStr, { locale: ru });
}
