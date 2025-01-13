import React from 'react';

import { SizeProp } from '../../lib/types/props';
import { Calendar } from '../Calendar';
import type { DateInput } from '../DateInput';

export interface DateRangePickerContextProps {
  value: string[];
  minDate?: string;
  maxDate?: string;
  size?: SizeProp;
  autoFocus?: boolean;
  onValueChange?: (value: string[]) => void;
  periodStart: string;
  periodEnd: string;
  hoveredDay: string | null;
  showCalendar: boolean;
  currentFocus: 'start' | 'end' | null;
  setPeriodStart: (value: string | null) => void;
  setPeriodEnd: (value: string | null) => void;
  setShowCalendar: (value: boolean) => void;
  setCurrentFocus: (value: 'start' | 'end' | null) => void;
  startRef: React.RefObject<DateInput>;
  endRef: React.RefObject<DateInput>;
  calendarRef: React.RefObject<Calendar>;
}

export const DateRangePickerContext = React.createContext({} as DateRangePickerContextProps);

DateRangePickerContext.displayName = 'DateRangePickerContext';
