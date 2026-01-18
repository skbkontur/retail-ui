import type { CalendarDateShape } from '../../components/Calendar/CalendarDateShape.js';
import { getMonthInHumanFormat } from '../Calendar/CalendarUtils.js';

export function formatDate({ date, month, year }: CalendarDateShape): string {
  const [d, m, y] = [date, getMonthInHumanFormat(month), year].map((x) => x.toString());
  return `${d.padStart(2, '0')}.${m.padStart(2, '0')}.${y.padStart(4, '0')}`;
}
