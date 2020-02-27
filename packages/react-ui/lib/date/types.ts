import { LangCodes } from '../locale';

export enum InternalDateOrder {
  DMY = 'DMY',
  YMD = 'YMD',
  MDY = 'MDY',
}

export enum InternalDateSeparator {
  Slash = '/',
  Dot = '.',
  Dash = '-',
  Space = ' ',
}

export enum InternalDateComponentType {
  Date = 0,
  Month = 1,
  Year = 2,
  All = 3,
  Separator = 4,
}

export type InternalDateTypesOrder = [InternalDateComponentType, InternalDateComponentType, InternalDateComponentType];
export type InternalDateComponent = number | null;
export type InternalDateComponentRaw = number | string | null;

export interface InternalDateFragment {
  type: InternalDateComponentType;
  value: InternalDateComponentRaw | InternalDateSeparator;
  length: number;
  valueWithPad?: string;
  isValid?: boolean;
}

export interface InternalDateComponents {
  year: InternalDateComponent;
  month: InternalDateComponent;
  date: InternalDateComponent;
}

export interface InternalDateComponentsRaw {
  year: InternalDateComponentRaw;
  month: InternalDateComponentRaw;
  date: InternalDateComponentRaw;
}

export interface InternalDateComponentsNumber {
  year: number;
  month: number;
  date: number;
}

export interface InternalDateToFragmentsSettings {
  order?: InternalDateOrder;
  separator?: InternalDateSeparator;
  withSeparator?: boolean;
  withPad?: boolean;
  pad?: string;
}

export interface InternalDateChangeSettings {
  isLoop?: boolean;
  isRange?: boolean;
  isCutFeb?: boolean;
}

export interface InternalDateConstructorProps {
  order?: InternalDateOrder;
  separator?: InternalDateSeparator;
  langCode?: LangCodes;
  value?: string;
}

export enum InternalDateValidateCheck {
  NotNull,
  Number,
  Limits,
  Native,
  Range,
}

export function isInternalDateValidateCheck(value: unknown): value is InternalDateValidateCheck {
  return typeof value === 'number' && Object.values(InternalDateValidateCheck).includes(value);
}

export enum InternalDateFirstDayWeek {
  Monday = 0,
  Sunday = 1,
  Saturday = 2,
}

export enum InternalDateDayWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Sunday = 6,
  Saturday = 7,
}

export interface InternalDateLocaleSet {
  order: InternalDateOrder;
  separator: InternalDateSeparator;
  firstDayWeek: InternalDateFirstDayWeek;
  notWorkingDays: InternalDateDayWeek[];
}
