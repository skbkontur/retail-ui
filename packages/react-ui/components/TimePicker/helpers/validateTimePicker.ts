import type { Nullable } from '../../../typings/utility-types.js';
import { EMPTY_VALUE } from './TimePicker.constants.js';
import type { TimeFormat } from './TimePicker.shared.js';
import { isTimeValueOutOfRange, normalizeTimeValue } from './TimePicker.value.js';

export interface TimePickerValidationOptions {
  format?: TimeFormat;
  minTime?: string;
  maxTime?: string;
}

export const validateTimePicker = (value: Nullable<string>, options: TimePickerValidationOptions = {}): boolean => {
  const timeValue = value ?? EMPTY_VALUE;

  if (!timeValue) {
    return false;
  }

  const { format = 'HH:mm', minTime, maxTime } = options;

  // Нормализованное значение уже канонично, поэтому отдельная проверка display-формы не нужна.
  if (normalizeTimeValue(timeValue, format) !== timeValue) {
    return false;
  }

  return !isTimeValueOutOfRange(timeValue, format, minTime, maxTime);
};
