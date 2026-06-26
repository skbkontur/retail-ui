import type { Nullable } from '../../../typings/utility-types.js';
import type { TimeFormat } from './TimePicker.shared.js';
import { getTimeDisplayValue, isTimeValueOutOfRange, normalizeTimeValue } from './TimePicker.value.js';

export interface TimePickerValidationOptions {
  format?: TimeFormat;
  minTime?: string;
  maxTime?: string;
}

export const validateTimePicker = (value: Nullable<string>, options: TimePickerValidationOptions = {}): boolean => {
  if (!value) {
    return false;
  }

  const { format = 'HH:mm', minTime, maxTime } = options;

  if (getTimeDisplayValue(value, format) !== value) {
    return false;
  }

  if (normalizeTimeValue(value, format) !== value) {
    return false;
  }

  return !isTimeValueOutOfRange(value, format, minTime, maxTime);
};
