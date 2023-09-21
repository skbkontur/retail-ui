import { createContext } from 'react';

import { CalendarDateShape } from './CalendarDateShape';
import { CalendarProps, CalendarState } from './Calendar';

export interface CalendarContextProps {
  hoveredDate: CalendarState['hoveredDate'];
  renderDay?: CalendarProps['renderDay'];
  value?: CalendarDateShape;
  periodStartDate?: CalendarDateShape;
  periodEndDate?: CalendarDateShape;
  minDate?: CalendarDateShape;
  maxDate?: CalendarDateShape;
  isHoliday?: CalendarProps['isHoliday'];
  today?: CalendarDateShape;
}

export const getDefaultizedCalendarContext = ({
  hoveredDate,
  ...props
}: Partial<CalendarContextProps>): CalendarContextProps => ({
  ...props,
  hoveredDate: hoveredDate || null,
});

export const CalendarContext = createContext<CalendarContextProps>(getDefaultizedCalendarContext({}));
