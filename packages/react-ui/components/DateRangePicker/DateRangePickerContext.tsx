import React from 'react';

import type { SizeProp } from '../../lib/types/props';

import { DateRangePickerInputType } from './DateRangePickerInput';

export interface DateRangePickerContextProps {
  startValue?: string;
  startOptional?: boolean;
  startDisabled?: boolean;
  endValue?: string;
  endOptional?: boolean;
  endDisabled?: boolean;
  minDate?: string;
  maxDate?: string;
  size?: SizeProp;
  focusInput?: DateRangePickerInputType | null;
  setStartValue: (value: string) => void;
  setStartOptional: (value: boolean) => void;
  setStartDisabled: (value: boolean) => void;
  setEndValue: (value: string) => void;
  setEndOptional: (value: boolean) => void;
  setEndDisabled: (value: boolean) => void;
  setMinDate: (value: string) => void;
  setMaxDate: (value: string) => void;
  setFocusInput: (value: DateRangePickerInputType | null) => void;
  open: (type: DateRangePickerInputType) => void;
  close: () => void;
  dateRangePickerRef: React.RefObject<HTMLDivElement>;
}

export const DateRangePickerContext = React.createContext({} as DateRangePickerContextProps);

DateRangePickerContext.displayName = 'DateRangePickerContext';
