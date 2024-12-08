import React from 'react';

import { SizeProp } from '../../lib/types/props';
import { Calendar } from '../Calendar';

export interface DateRangePickerContextProps {
  from?: string;
  to?: string;
  minDate?: string;
  maxDate?: string;
  size?: SizeProp;
  onValueChange?: (from: string, to: string) => void;
  onFromValueChange?: (value: string) => void;
  onToValueChange?: (value: string) => void;
  periodStart?: string;
  periodEnd?: string;
  hoveredDay?: string | null;
  showCalendar?: boolean;
  currentFocus?: 'start' | 'end' | null;
  setPeriodStart?: (value: string | null) => void;
  setPeriodEnd?: (value: string | null) => void;
  setHoveredDay?: (value: string | null) => void;
  setShowCalendar?: (value: boolean) => void;
  setCurrentFocus?: (value: 'start' | 'end' | null) => void;
  fromRef?: React.RefObject<any>;
  toRef?: React.RefObject<any>;
  calendarRef?: React.RefObject<Calendar>;
}

export const DateRangePickerContext = React.createContext<DateRangePickerContextProps>({});

DateRangePickerContext.displayName = 'DateRangePickerContext';
