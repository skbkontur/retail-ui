import { DIGIT_REGEXP, EMPTY_SEGMENT, EMPTY_VALUE, TIME_SEPARATOR } from './TimePicker.constants.js';
import {
  getDigits,
  getDisplaySegments,
  getTimeSegments,
  normalizeTimeSegment,
  sanitizeSegment,
  type TimeFormat,
  type TimeSegment,
} from './TimePicker.shared.js';

/** Проверяет, содержит ли display-значение хотя бы одну введенную цифру. */
export const isTimeDisplayEmpty = (value: string): boolean => !DIGIT_REGEXP.test(value);

/**
 * Проверяет, выходит ли значение за диапазон `minTime`/`maxTime` после нормализации.
 * Пустое значение не считается выходящим за диапазон. Если `minTime > maxTime`, диапазон трактуется как переходящий через полночь.
 */
export const isTimeValueOutOfRange = (
  value: string,
  format: TimeFormat,
  minTime?: string,
  maxTime?: string,
): boolean => {
  const normalizedValue = normalizeTimeValue(value, format);

  if (normalizedValue === EMPTY_VALUE) {
    return false;
  }

  const normalizedMinTime = normalizeTimeRangeValue(minTime, format);
  const normalizedMaxTime = normalizeTimeRangeValue(maxTime, format);

  if (normalizedMinTime && normalizedMaxTime && normalizedMinTime > normalizedMaxTime) {
    return normalizedValue < normalizedMinTime && normalizedValue > normalizedMaxTime;
  }

  return (
    (normalizedMinTime !== undefined && normalizedValue < normalizedMinTime) ||
    (normalizedMaxTime !== undefined && normalizedValue > normalizedMaxTime)
  );
};

/**
 * Нормализует display-значение в committed-форму `HH:mm[:ss]`.
 * Частично заполненные сегменты дополняются и ограничиваются максимумами сегментов.
 */
export const normalizeTimeValue = (value: string, format: TimeFormat): string => {
  if (isTimeDisplayEmpty(value)) {
    return EMPTY_VALUE;
  }

  return getTimeSegments(format)
    .map((segment, index) => normalizeTimeSegment(getDisplaySegments(value, format)[index], segment))
    .join(TIME_SEPARATOR);
};

const normalizeTimeRangeValue = (value: string | undefined, format: TimeFormat): string | undefined => {
  if (!value) {
    return undefined;
  }

  const normalizedValue = normalizeTimeValue(value, format);

  return normalizedValue === EMPTY_VALUE ? undefined : normalizedValue;
};

/**
 * Преобразует display-значение в partial raw value для `onValueChange`.
 * Заполненные сегменты дополняются до двух цифр, пропущенные сегменты до последнего заполненного становятся `00`.
 */
export const serializeTimeValue = (value: string, format: TimeFormat): string => {
  const serializedSegments = getDisplaySegments(value, format).map((segmentValue) => {
    const digits = getDigits(segmentValue);

    return digits ? digits.padStart(EMPTY_SEGMENT.length, '0') : EMPTY_VALUE;
  });

  const lastFilledIndex = serializedSegments.reduce(
    (result, segmentValue, index) => (segmentValue ? index : result),
    -1,
  );

  if (lastFilledIndex < 0) {
    return EMPTY_VALUE;
  }

  return serializedSegments
    .slice(0, lastFilledIndex + 1)
    .map((segmentValue) => segmentValue || '00')
    .join(TIME_SEPARATOR);
};

/** Возвращает display-значение с плейсхолдерами из partial или committed value. */
export const getTimeDisplayValue = (value: string, format: TimeFormat): string => {
  if (value === EMPTY_VALUE) {
    return EMPTY_VALUE;
  }

  return getDisplaySegments(value, format).join(TIME_SEPARATOR);
};

/** Заменяет значение выбранного сегмента, сохраняя остальные сегменты display-значения без изменений. */
export const replaceTimeSegment = (
  value: string,
  segment: TimeSegment,
  nextSegmentValue: string,
  format: TimeFormat,
): string => {
  const segments = getDisplaySegments(value, format);
  const index = getTimeSegments(format).indexOf(segment);

  segments[index] = sanitizeSegment(nextSegmentValue);

  return segments.join(TIME_SEPARATOR);
};

/**
 * Парсит вставленное пользователем значение и сразу преобразует его в committed-форму.
 */
export const parsePastedTimeValue = (value: string, format: TimeFormat): string => {
  if (!DIGIT_REGEXP.test(value)) {
    return EMPTY_VALUE;
  }

  const segments = getDisplaySegments(value, format);

  return normalizeTimeValue(segments.join(TIME_SEPARATOR), format);
};

/** Возвращает текущее display-значение сегмента или пустой сегмент, если индекс отсутствует. */
export const getTimeSegmentValue = (value: string, segment: TimeSegment, format: TimeFormat): string => {
  const segments = getDisplaySegments(value, format);
  const index = getTimeSegments(format).indexOf(segment);

  return segments[index] ?? EMPTY_SEGMENT;
};

/** Возвращает полностью пустое display-значение для выбранной точности времени. */
export const getEmptyDisplayValue = (precision: TimeFormat): string =>
  getTimeSegments(precision)
    .map(() => EMPTY_SEGMENT)
    .join(TIME_SEPARATOR);
