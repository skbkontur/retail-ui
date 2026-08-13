import type { TimeFormat, TimeSegment } from './TimePicker.shared.js';

export const TimePickerDataTids = {
  root: 'TimePicker__root',
  input: 'TimePicker__input',
  mobileInput: 'TimePicker__mobileInput',
  nativeInput: 'TimePicker__nativeInput',
  popup: 'TimePicker__popup',
  mobilePopup: 'TimePicker__mobilePopup',
  item: 'TimePicker__item',
  loading: 'TimePicker__loading',
  failed: 'TimePicker__failed',
  inputLoading: 'TimePicker__inputLoading',
} as const;

/** Больше двух десятков часов не бывает: такая первая цифра сразу завершает сегмент. */
export const HOURS_FIRST_DIGIT_MAX = 2;
export const TIME_PLACEHOLDER_CHAR = '\u2212';
export const TIME_SEPARATOR = ':';
export const TIME_SEGMENT_LENGTH = 2;
export const HOURS_MAX_VALUE = 23;
export const MINUTES_AND_SECONDS_MAX_VALUE = 59;
export const ZERO_PAD_CHAR = '0';
export const EMPTY_VALUE = '';
export const DIGIT_REGEXP = /\d/;
export const NON_DIGIT_REGEXP = /\D/g;
export const EMPTY_SEGMENT = TIME_PLACEHOLDER_CHAR.repeat(TIME_SEGMENT_LENGTH);

export const MAX_TIME_SEGMENTS_COUNT = 3;
/** Сегменты времени через любой разделитель: `12:30`, `9:5`, `1:23:45`, `12.30`. */
export const TIME_LIKE_SEGMENTS_REGEXP = new RegExp(`^\\d{1,2}(?:\\D{1,3}\\d{1,2}){0,${MAX_TIME_SEGMENTS_COUNT - 1}}$`);
/** Время без разделителей: `1`, `12`, `1230`, `123045`. */
export const TIME_LIKE_DIGITS_REGEXP = new RegExp(`^\\d{1,${MAX_TIME_SEGMENTS_COUNT * TIME_SEGMENT_LENGTH}}$`);

export const TIME_SEGMENTS_BY_FORMAT: Record<TimeFormat, TimeSegment[]> = {
  'HH:mm': ['hours', 'minutes'],
  'HH:mm:ss': ['hours', 'minutes', 'seconds'],
};
