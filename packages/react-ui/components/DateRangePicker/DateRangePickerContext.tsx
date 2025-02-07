import React from 'react';

import type { SizeProp } from '../../lib/types/props';
import type { DateInput } from '../DateInput';

import { DateRangePickerFieldType } from './DateRangePickerField';

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
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onValueChange?: (value: string[]) => void;
  setStart: (value: string) => void;
  setEnd: (value: string) => void;
  setFocusField: (value: DateRangePickerFieldType | null) => void;
  open: (type: DateRangePickerFieldType) => void;
  close: () => void;
  dateRangePickerRef: React.RefObject<HTMLDivElement>;
  startRef: React.RefObject<DateInput>;
  endRef: React.RefObject<DateInput>;
}

export const DateRangePickerContext = React.createContext({} as DateRangePickerContextProps);

DateRangePickerContext.displayName = 'DateRangePickerContext';
