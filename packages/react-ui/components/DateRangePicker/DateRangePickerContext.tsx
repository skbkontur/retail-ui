import React from 'react';

import { SizeProp } from '../../lib/types/props';
import { Calendar } from '../Calendar';
import type { DateInput } from '../DateInput';

export interface DateRangePickerContextProps {
  start: string | null;
  end: string | null;
  minDate?: string;
  maxDate?: string;
  size?: SizeProp;
  autoFocus?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onValueChange?: (value: string[]) => void;
  hoveredDay: string | null;
  showCalendar: boolean;
  currentFocus: 'start' | 'end' | null;
  setStart: (value: string) => void;
  setEnd: (value: string) => void;
  setShowCalendar: (value: boolean) => void;
  setCurrentFocus: (value: 'start' | 'end' | null) => void;
  startRef: React.RefObject<DateInput>;
  endRef: React.RefObject<DateInput>;
  calendarRef: React.RefObject<Calendar>;
}

export const DateRangePickerContext = React.createContext({} as DateRangePickerContextProps);

DateRangePickerContext.displayName = 'DateRangePickerContext';
