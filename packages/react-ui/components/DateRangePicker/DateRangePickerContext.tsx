import React from 'react';
import type { RefObject } from 'react';

import type { SizeProp } from '../../lib/types/props.js';
import type { DateInput } from '../DateInput/index.js';
import type { DateRangePickerInputType } from './DateRangePickerInput.js';

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
  dateRangePickerRef: RefObject<HTMLDivElement | null>;
  startRef: React.RefObject<DateInput | null>;
  endRef: React.RefObject<DateInput | null>;
}

export const DateRangePickerContext = React.createContext({} as DateRangePickerContextProps);

DateRangePickerContext.displayName = 'DateRangePickerContext';
