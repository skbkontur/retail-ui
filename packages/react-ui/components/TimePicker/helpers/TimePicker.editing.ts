import {
  DIGIT_REGEXP,
  EMPTY_SEGMENT,
  EMPTY_VALUE,
  FIRST_DIGIT_MAX_BY_SEGMENT,
  TIME_PLACEHOLDER_CHAR,
  TIME_SEGMENT_LENGTH,
  ZERO_PAD_CHAR,
} from './TimePicker.constants.js';
import { getNextTimeSegment } from './TimePicker.selection.js';
import {
  getDigits,
  getTimeSegmentMax,
  hasPendingSingleDigit,
  normalizeEditableSegment,
  type TimeDigitInputResult,
  type TimeFormat,
  type TimeSegment,
} from './TimePicker.shared.js';
import { getTimeSegmentValue, replaceTimeSegment } from './TimePicker.value.js';

/**
 * Удаляет одну цифру из активного сегмента справа налево.
 * Сначала превращает заполненный сегмент в значение с одной ожидающей цифрой,
 * затем — в полностью пустой сегмент.
 */
export const deleteTimeSegmentDigit = (value: string, segment: TimeSegment, format: TimeFormat): string => {
  const currentSegmentValue = getTimeSegmentValue(value, segment, format);

  const [first, second] = Array.from(currentSegmentValue);

  if (DIGIT_REGEXP.test(second ?? EMPTY_VALUE)) {
    return replaceTimeSegment(value, segment, `${first}${TIME_PLACEHOLDER_CHAR}`, format);
  }

  if (DIGIT_REGEXP.test(first ?? EMPTY_VALUE)) {
    return replaceTimeSegment(value, segment, EMPTY_SEGMENT, format);
  }

  return value;
};

/**
 * Коммитит активный сегмент при уходе с него или потере фокуса.
 * Частично введенное значение дополняется и нормализуется, а полностью пустой сегмент остается пустым.
 */
export const commitTimeSegmentOnLeave = (value: string, segment: TimeSegment, format: TimeFormat): string => {
  const nextValue = normalizeEditableSegment(getTimeSegmentValue(value, segment, format), segment);

  if (nextValue === EMPTY_SEGMENT) {
    return replaceTimeSegment(value, segment, EMPTY_SEGMENT, format);
  }

  return replaceTimeSegment(value, segment, nextValue, format);
};

/**
 * Сдвигает значение активного сегмента на шаг вверх или вниз с циклическим переходом по границам.
 * Пустой сегмент трактуется как `00`.
 */
export const shiftTimeSegmentValue = (
  value: string,
  segment: TimeSegment,
  step: 1 | -1,
  format: TimeFormat,
): string => {
  const currentSegmentValue = getTimeSegmentValue(value, segment, format);

  const normalizedSegmentValue = normalizeEditableSegment(currentSegmentValue, segment);

  const max = getTimeSegmentMax(segment);

  const current = normalizedSegmentValue === EMPTY_SEGMENT ? 0 : Number(normalizedSegmentValue);
  const next = (current + step + max + 1) % (max + 1);

  return replaceTimeSegment(value, segment, String(next).padStart(TIME_SEGMENT_LENGTH, ZERO_PAD_CHAR), format);
};

/**
 * Обрабатывает ввод одной цифры в активный сегмент.
 * Возвращает следующее display-значение и метаданные для UI:
 * нужно ли завершить сегмент, перейти к следующему сегменту или показать анимацию ошибки.
 */
export const formatDigitToTimeSegment = (
  value: string,
  segment: TimeSegment,
  digit: string,
  format: TimeFormat,
): TimeDigitInputResult => {
  const currentSegmentValue = getTimeSegmentValue(value, segment, format);

  const nextSegment = getNextTimeSegment(segment, format);

  const shouldAppend = hasPendingSingleDigit(currentSegmentValue);

  const currentDigits = shouldAppend ? getDigits(currentSegmentValue) : '';
  const firstDigitThreshold = FIRST_DIGIT_MAX_BY_SEGMENT[segment];

  if (currentDigits.length === 0) {
    if (segment === 'hours' && Number(digit) > firstDigitThreshold) {
      const nextValue = replaceTimeSegment(value, segment, `0${digit}`, format);

      return {
        isFinalPart: nextSegment === null,
        isCompletedPart: true,
        shouldBlink: false,
        selectedSegment: nextSegment ?? segment,
        nextValue,
      };
    }

    return {
      isFinalPart: false,
      isCompletedPart: false,
      shouldBlink: false,
      selectedSegment: segment,
      nextValue: replaceTimeSegment(value, segment, `${digit}${TIME_PLACEHOLDER_CHAR}`, format),
    };
  }

  if (segment === 'hours' && currentDigits === '2' && Number(digit) > 3) {
    return {
      isFinalPart: false,
      isCompletedPart: false,
      shouldBlink: true,
      selectedSegment: segment,
      nextValue: value,
    };
  }

  if (segment !== 'hours' && Number(`${currentDigits}${digit}`) > getTimeSegmentMax(segment)) {
    return {
      isFinalPart: false,
      isCompletedPart: false,
      shouldBlink: true,
      selectedSegment: segment,
      nextValue: value,
    };
  }

  const nextValue = replaceTimeSegment(
    value,
    segment,
    String(Number(`${currentDigits}${digit}`)).padStart(TIME_SEGMENT_LENGTH, ZERO_PAD_CHAR),
    format,
  );

  return {
    isFinalPart: nextSegment === null,
    isCompletedPart: true,
    shouldBlink: false,
    selectedSegment: nextSegment ?? segment,
    nextValue,
  };
};
