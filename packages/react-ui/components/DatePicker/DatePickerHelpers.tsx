import { CalendarDateShape } from '../../internal/Calendar';

export function formatDate({ date, month, year }: CalendarDateShape): string {
  const [d, m, y] = [date, month + 1, year].map((x) => x.toString());
  return `${d.padStart(2, '0')}.${m.padStart(2, '0')}.${y.padStart(4, '0')}`;
}
