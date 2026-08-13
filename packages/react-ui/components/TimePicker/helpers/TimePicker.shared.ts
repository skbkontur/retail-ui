import { isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

import type { MenuItemProps } from '../../MenuItem/index.js';
import { isMenuItem } from '../../MenuItem/index.js';
import {
  DIGIT_REGEXP,
  EMPTY_SEGMENT,
  EMPTY_VALUE,
  HOURS_MAX_VALUE,
  MINUTES_AND_SECONDS_MAX_VALUE,
  NON_DIGIT_REGEXP,
  TIME_PLACEHOLDER_CHAR,
  TIME_SEGMENT_LENGTH,
  TIME_SEGMENTS_BY_FORMAT,
  TIME_SEPARATOR,
  ZERO_PAD_CHAR,
} from './TimePicker.constants.js';

export type TimeFormat = 'HH:mm' | 'HH:mm:ss';
export type TimeSegment = 'hours' | 'minutes' | 'seconds';

export interface TimeItem {
  disabled?: boolean;
  value: string;
  label?: ReactNode;
}

/** Элемент со временем: строка в формате `HH:mm[:ss]` или объект. */
export type TimeItemValue = string | TimeItem;

/**
 * React-элемент выпадающего списка: сам элемент или функция, возвращающая его.
 * Параметры типа заданы как `any`, чтобы тип совпадал с тем, что дает инлайн-разметка в `source`:
 * иначе TypeScript не отличает React-элемент от элемента со временем и не выводит тип элемента.
 */
export type TimePickerMenuElement = ReactElement<any, any> | (() => ReactElement<any, any>);

/** Элемент, который можно передать в `source`: элемент со временем или React-элемент. */
export type TimePickerExtendedItem<T extends TimeItemValue = TimeItemValue> = T | TimePickerMenuElement;

export type TimePickerSource<T extends TimeItemValue = TimeItemValue> =
  | Array<TimePickerExtendedItem<T>>
  | ((query: string) => Array<TimePickerExtendedItem<T>> | Promise<Array<TimePickerExtendedItem<T>>>);

/** Разобранный элемент выпадающего списка: исходный элемент, его время, подпись и доступность. */
export interface TimePickerResolvedItem<T extends TimeItemValue = TimeItemValue> {
  item: T;
  value: string;
  label?: ReactNode;
  disabled: boolean;
}

/** Элемент выпадающего списка: разобранный элемент со временем или React-элемент. */
export type TimePickerMenuItem<T extends TimeItemValue = TimeItemValue> =
  | TimePickerResolvedItem<T>
  | TimePickerMenuElement;

const isNotMenuElement = (item: unknown): boolean => typeof item !== 'function' && !isValidElement(item);

/** Проверяет, что элемент источника содержит время, а не является React-элементом. */
export const isTimeItem = <T extends TimeItemValue>(item: TimePickerExtendedItem<T>): item is T =>
  isNotMenuElement(item);

/** Проверяет, что элемент выпадающего списка содержит время, а не является React-элементом. */
export const isTimeMenuItem = <T extends TimeItemValue>(
  item: TimePickerMenuItem<T>,
): item is TimePickerResolvedItem<T> => isNotMenuElement(item);

/**
 * Проверяет, что элемент выпадающего списка — это `MenuItem`, по которому можно ходить с клавиатуры.
 * Заблокированные и невыбираемые пункты в навигации не участвуют, как и элементы-функции:
 * последние отрисовываются как есть, поэтому кликом по ним по-прежнему управляет их собственный `onClick`.
 */
export const isNavigableMenuElement = <T extends TimeItemValue>(
  item: TimePickerMenuItem<T>,
): item is ReactElement<MenuItemProps> => {
  if (typeof item === 'function' || !isValidElement(item) || !isMenuItem(item)) {
    return false;
  }

  const { disabled, isNotSelectable } = item.props as MenuItemProps;

  return !disabled && !isNotSelectable;
};

/** Проверяет, что на элементе выпадающего списка может стоять выделение с клавиатуры. */
export const isHighlightableMenuItem = <T extends TimeItemValue>(item: TimePickerMenuItem<T>): boolean =>
  isTimeMenuItem(item) ? !item.disabled : isNavigableMenuElement(item);

export const getTimeItemValue = (item: TimeItemValue): string => (typeof item === 'string' ? item : item.value);

export const getTimeItemLabel = (item: TimeItemValue): ReactNode => (typeof item === 'string' ? undefined : item.label);

export const isTimeItemDisabled = (item: TimeItemValue): boolean => typeof item !== 'string' && Boolean(item.disabled);

export const isTimeItemObject = (item: TimeItemValue): item is TimeItem => typeof item !== 'string';

/** Результат ввода одной цифры: следующее display-значение, сегмент под выделением и признак вспышки. */
export interface TimeDigitInputResult {
  nextValue: string;
  selectedSegment: TimeSegment;
  shouldBlink: boolean;
}

export const getTimeSegments = (format: TimeFormat): TimeSegment[] => TIME_SEGMENTS_BY_FORMAT[format];

export const getTimeSegmentMax = (segment: TimeSegment): number =>
  segment === 'hours' ? HOURS_MAX_VALUE : MINUTES_AND_SECONDS_MAX_VALUE;

/** Извлекает из сегмента только цифры и ограничивает результат длиной сегмента. */
export const getDigits = (segment: string): string =>
  segment.replace(NON_DIGIT_REGEXP, EMPTY_VALUE).slice(0, TIME_SEGMENT_LENGTH);

/**
 * Приводит произвольное строковое значение сегмента к display-форме:
 * оставляет только цифры и плейсхолдеры, ограничивает длину и дополняет незаполненные позиции плейсхолдером.
 */
export const sanitizeSegment = (segment: string): string =>
  Array.from(segment)
    .filter((char) => DIGIT_REGEXP.test(char) || char === TIME_PLACEHOLDER_CHAR)
    .slice(0, TIME_SEGMENT_LENGTH)
    .join('')
    .padEnd(TIME_SEGMENT_LENGTH, TIME_PLACEHOLDER_CHAR);

const normalizeSegment = (segmentValue: string, segment: TimeSegment, emptyResult: string): string => {
  const digits = getDigits(segmentValue);

  if (!digits) {
    return emptyResult;
  }

  return String(Math.min(Number(digits), getTimeSegmentMax(segment))).padStart(TIME_SEGMENT_LENGTH, ZERO_PAD_CHAR);
};

/** Нормализует сегмент для committed-значения: пустой сегмент становится `00`. */
export const normalizeTimeSegment = (segmentValue: string, segment: TimeSegment): string =>
  normalizeSegment(segmentValue, segment, '00');

/** Нормализует сегмент для режима редактирования: полностью пустой сегмент остается пустым. */
export const normalizeEditableSegment = (segmentValue: string, segment: TimeSegment): string =>
  normalizeSegment(segmentValue, segment, EMPTY_SEGMENT);

/** Проверяет, что сегмент содержит одну введенную цифру и ожидает вторую. */
export const hasPendingSingleDigit = (segmentValue: string): boolean =>
  new RegExp(`^\\d${TIME_PLACEHOLDER_CHAR}$`).test(segmentValue);

/**
 * Разбивает входное значение на display-сегменты текущего формата.
 * Поддерживает committed-значение (`HH:mm[:ss]`) и display-значение с плейсхолдерами
 */
export const getDisplaySegments = (value: string, format: TimeFormat): string[] => {
  const segments = getTimeSegments(format);
  const fallback = segments.map(() => EMPTY_SEGMENT);

  if (value === EMPTY_VALUE) {
    return fallback;
  }

  if (value.includes(TIME_SEPARATOR) || value.includes(TIME_PLACEHOLDER_CHAR)) {
    const sourceParts = value.split(TIME_SEPARATOR);
    return segments.map((_, index) => sanitizeSegment(sourceParts[index] ?? EMPTY_VALUE));
  }

  const digits = value.replace(NON_DIGIT_REGEXP, EMPTY_VALUE);

  return segments.map((_, index) => {
    const segmentStart = index * TIME_SEGMENT_LENGTH;
    const segmentEnd = segmentStart + TIME_SEGMENT_LENGTH;

    return sanitizeSegment(digits.slice(segmentStart, segmentEnd));
  });
};
