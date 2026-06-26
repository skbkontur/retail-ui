import type { TimeFormat, TimeSegment } from './TimePicker.shared.js';

export const TimePickerDataTids = {
  root: 'TimePicker__root',
  input: 'TimePicker__input',
  mobileInput: 'TimePicker__mobileInput',
  nativeInput: 'TimePicker__nativeInput',
  popup: 'TimePicker__popup',
  mobilePopup: 'TimePicker__mobilePopup',
  item: 'TimePicker__item',
} as const;

const HOURS_FIRST_DIGIT_MAX = 2;
const MINUTES_AND_SECONDS_FIRST_DIGIT_MAX = 5;
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

export const TIME_SEGMENTS_BY_FORMAT: Record<TimeFormat, TimeSegment[]> = {
  'HH:mm': ['hours', 'minutes'],
  'HH:mm:ss': ['hours', 'minutes', 'seconds'],
};

export const FIRST_DIGIT_MAX_BY_SEGMENT: Record<TimeSegment, number> = {
  hours: HOURS_FIRST_DIGIT_MAX,
  minutes: MINUTES_AND_SECONDS_FIRST_DIGIT_MAX,
  seconds: MINUTES_AND_SECONDS_FIRST_DIGIT_MAX,
};
