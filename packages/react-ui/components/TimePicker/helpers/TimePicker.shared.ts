import type { ReactNode } from 'react';

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

/**
 * Результат ввода одной цифры в активный сегмент.
 * Содержит следующее display-значение и инструкции для UI по выбору сегмента и необходимости blink.
 */
export interface TimeDigitInputResult {
  isFinalPart: boolean;
  isCompletedPart: boolean;
  nextValue: string;
  selectedSegment: TimeSegment;
  shouldBlink: boolean;
}

/** Возвращает массив сегментов, используемых в заданном формате времени. */
export const getTimeSegments = (format: TimeFormat): TimeSegment[] => TIME_SEGMENTS_BY_FORMAT[format];

/** Возвращает верхнюю границу допустимого значения для конкретного сегмента. */
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

/**
 * Нормализует сегмент для committed-значения.
 * Пустой сегмент преобразуется в `00`, а значения выше максимума — к максимуму сегмента.
 */
export const normalizeTimeSegment = (segmentValue: string, segment: TimeSegment): string => {
  const digits = getDigits(segmentValue);

  if (!digits) {
    return '00';
  }

  return String(Math.min(Number(digits), getTimeSegmentMax(segment))).padStart(TIME_SEGMENT_LENGTH, ZERO_PAD_CHAR);
};

/**
 * Нормализует сегмент для режима редактирования.
 * В отличие от committed-нормализации, полностью пустой сегмент остается пустым.
 */
export const normalizeEditableSegment = (segmentValue: string, segment: TimeSegment): string => {
  const digits = getDigits(segmentValue);

  if (!digits) {
    return EMPTY_SEGMENT;
  }

  return String(Math.min(Number(digits), getTimeSegmentMax(segment))).padStart(TIME_SEGMENT_LENGTH, ZERO_PAD_CHAR);
};

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
