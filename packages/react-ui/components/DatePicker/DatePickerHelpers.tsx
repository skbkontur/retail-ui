import { CalendarDateShape } from '../../components/Calendar/CalendarDateShape';
import { getMonthInHumanFormat } from '../Calendar/CalendarUtils';

export function formatDate({ date, month, year }: CalendarDateShape): string {
  const [d, m, y] = [date, getMonthInHumanFormat(month), year].map((x) => x.toString());
  return `${d.padStart(2, '0')}.${m.padStart(2, '0')}.${y.padStart(4, '0')}`;
}
