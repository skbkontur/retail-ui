import React from 'react';

import type { SizeProp } from '../../lib/types/props';
import type { DateInput } from '../DateInput';

import { DateRangePickerFieldType } from './DateRangePickerField';

export interface DateRangePickerContextProps {
  startValue: string | null;
  startOptional?: boolean;
  startDisabled?: boolean;
  endValue: string | null;
  endOptional?: boolean;
  endDisabled?: boolean;
  minDate?: string;
  maxDate?: string;
  size?: SizeProp;
  setStartValue: (value: string) => void;
  setStartOptional: (value: boolean) => void;
  setStartDisabled: (value: boolean) => void;
  setEndValue: (value: string) => void;
  setEndOptional: (value: boolean) => void;
  setEndDisabled: (value: boolean) => void;
  setMinDate: (value: string) => void;
  setMaxDate: (value: string) => void;
  setFocusField: (value: DateRangePickerFieldType | null) => void;
  open: (type: DateRangePickerFieldType) => void;
  close: () => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  dateRangePickerRef: React.RefObject<HTMLDivElement>;
  startRef: React.RefObject<DateInput>;
  endRef: React.RefObject<DateInput>;
}

export const DateRangePickerContext = React.createContext({} as DateRangePickerContextProps);

DateRangePickerContext.displayName = 'DateRangePickerContext';
