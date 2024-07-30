import { createContext } from 'react';

import { CalendarDateShape } from './CalendarDateShape';
import { CalendarProps } from './Calendar';

export interface CalendarContextProps {
  renderDay?: CalendarProps['renderDay'];
  value?: CalendarDateShape;
  minDate?: CalendarDateShape;
  maxDate?: CalendarDateShape;
  isHoliday?: CalendarProps['isHoliday'];
  today?: CalendarDateShape;
  onDateClick?: (date: CalendarDateShape) => void;
}

export const CalendarContext = createContext<CalendarContextProps>({});
