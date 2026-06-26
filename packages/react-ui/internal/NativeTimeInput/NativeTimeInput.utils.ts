import type { TimeFormat } from '../../components/TimePicker/index.js';
import type { Nullable } from '../../typings/utility-types.js';

const DEFAULT_NATIVE_MIN_TIME = '00:00:00';
const DEFAULT_NATIVE_MAX_TIME = '23:59:59';

const padTimePart = (value: string | undefined): string => (value ?? '00').padStart(2, '0');

const normalizeNativeTime = (value: string, format: TimeFormat): string => {
  const [hours, minutes, seconds] = value.split(':');

  const normalizedTime = `${padTimePart(hours)}:${padTimePart(minutes)}:${padTimePart(seconds)}`;

  return format === 'HH:mm' ? normalizedTime.slice(0, 5) : normalizedTime;
};

export const getTimeForNative = (componentTime: Nullable<string>, format: TimeFormat): string | undefined => {
  if (!componentTime) {
    return undefined;
  }

  return normalizeNativeTime(componentTime, format);
};

export const getTimeForComponent = (nativeTime: Nullable<string>, format: TimeFormat): string => {
  if (!nativeTime) {
    return '';
  }

  return normalizeNativeTime(nativeTime, format);
};

export const getDefaultMinTime = (format: TimeFormat): string =>
  format === 'HH:mm' ? DEFAULT_NATIVE_MIN_TIME.slice(0, 5) : DEFAULT_NATIVE_MIN_TIME;

export const getDefaultMaxTime = (format: TimeFormat): string =>
  format === 'HH:mm' ? DEFAULT_NATIVE_MAX_TIME.slice(0, 5) : DEFAULT_NATIVE_MAX_TIME;

export const getNativeTimeStep = (format: TimeFormat): number => (format === 'HH:mm' ? 60 : 1);
