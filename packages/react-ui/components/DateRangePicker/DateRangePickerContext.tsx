import React from 'react';

import type { SizeProp } from '../../lib/types/props';
import type { DateInput } from '../DateInput';

import type { DateRangeFieldType } from './DateRangePicker';

export interface DateRangePickerContextProps {
  start: string | null;
  end: string | null;
  setActiveField?: boolean;
  minDate?: string;
  maxDate?: string;
  size?: SizeProp;
  disabled?: boolean[];
  autoFocus?: boolean;
  warning?: boolean[];
  error?: boolean[];
  onBlur?: () => void;
  onFocus?: () => void;
  onValueChange?: (value: string[]) => void;
  setStart: (value: string) => void;
  setEnd: (value: string) => void;
  open: (Props: DateRangeFieldType) => void;
  close: () => void;
  dateRangePickerRef: React.RefObject<HTMLDivElement>;
  startRef: React.RefObject<DateInput>;
  endRef: React.RefObject<DateInput>;
}

export const DateRangePickerContext = React.createContext({} as DateRangePickerContextProps);

DateRangePickerContext.displayName = 'DateRangePickerContext';
