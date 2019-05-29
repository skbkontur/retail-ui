import { InternalDateFirstDayWeek, InternalDateOrder, InternalDateSeparator } from './types';

export const MIN_YEAR = 1900;
export const MAX_YEAR = 2099;
export const MIN_MONTH = 1;
export const MAX_MONTH = 12;
export const MIN_DATE = 1;
export const MAX_DATE = 31;
export const LENGTH_YEAR = 4;
export const LENGTH_MONTH = 2;
export const LENGTH_DATE = 2;
export const LENGTH_SEPARATOR = 1;
export const CHAR_PAD = '0';
export const CHAR_MASK = '_';
export const RE_DELIMITERS = ['.', '-', '/', ' ', ',', '\\', 'б', 'ю'];
export const RE_SEPARATOR = `(?:\\.|\\/|\\-|\\s|\\,)`;
export const RE_ORDER_MDY = new RegExp(
  `^(\\d{1,${LENGTH_MONTH}})?${RE_SEPARATOR}?(\\d{1,${LENGTH_DATE}})?${RE_SEPARATOR}?(\\d{1,${LENGTH_YEAR}})?$`,
);
export const RE_ORDER_DMY = new RegExp(
  `^(\\d{1,${LENGTH_DATE}})?${RE_SEPARATOR}?(\\d{1,${LENGTH_MONTH}})?${RE_SEPARATOR}?(\\d{1,${LENGTH_YEAR}})?$`,
);
export const RE_ORDER_YMD = new RegExp(
  `^(\\d{1,${LENGTH_YEAR}})?${RE_SEPARATOR}?(\\d{1,${LENGTH_MONTH}})?${RE_SEPARATOR}?(\\d{1,${LENGTH_DATE}})?$`,
);
export const emptyDateComponents = {
  year: null,
  month: null,
  date: null,
};
export const defaultDateComponentsOrder = InternalDateOrder.DMY;
export const defaultDateComponentsSeparator = InternalDateSeparator.Dot;
export const defaultFirstDayWeek = InternalDateFirstDayWeek.Monday;

