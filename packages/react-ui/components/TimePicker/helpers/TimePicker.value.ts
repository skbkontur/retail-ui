import warning from 'warning';

import {
  DIGIT_REGEXP,
  EMPTY_SEGMENT,
  EMPTY_VALUE,
  NON_DIGIT_REGEXP,
  TIME_LIKE_DIGITS_REGEXP,
  TIME_LIKE_SEGMENTS_REGEXP,
  TIME_SEPARATOR,
  ZERO_PAD_CHAR,
} from './TimePicker.constants.js';
import {
  getDigits,
  getDisplaySegments,
  getTimeSegments,
  normalizeTimeSegment,
  sanitizeSegment,
  getTimeItemLabel,
  getTimeItemValue,
  isTimeItemDisabled,
  type TimeFormat,
  type TimeItem,
  type TimeItemValue,
  type TimePickerExtendedItem,
  type TimePickerMenuItem,
  type TimeSegment,
  isTimeItem,
  isTimeItemObject,
} from './TimePicker.shared.js';

/** Проверяет, что в display-значении нет ни одной введенной цифры. */
export const isTimeDisplayEmpty = (value: string): boolean => !DIGIT_REGEXP.test(value);

/**
 * Приводит время элемента к формату поля: `renderItem` показывает элемент рядом с теми же временами,
 * что и остальное меню, поэтому в нем не должно оказаться `9:00` или `09:00:00` из источника.
 * Элемент-объект копируется только когда его время действительно записано иначе,
 * так что в обычном случае наружу уходит тот же объект, что пришел в `source`.
 */
const normalizeTimeItem = <T extends TimeItemValue>(item: T, value: string, normalizedValue: string): T => {
  if (value === normalizedValue) {
    return item;
  }

  return (isTimeItemObject(item) ? { ...(item as TimeItem), value: normalizedValue } : normalizedValue) as T;
};

/**
 * Разбирает элементы источника для отрисовки: достает время и подпись,
 * а `disabled` дополняет проверкой диапазона `minTime`/`maxTime`.
 * Время нормализуется по формату поля — и у времени элемента, и у самого элемента.
 * React-элементы остаются на своих местах.
 */
export const resolveTimeItems = <T extends TimeItemValue>(
  items: Array<TimePickerExtendedItem<T>>,
  format: TimeFormat,
  minTime?: string,
  maxTime?: string,
): Array<TimePickerMenuItem<T>> =>
  items.map((item) => {
    if (!isTimeItem(item)) {
      return item;
    }

    const value = getTimeItemValue(item);
    const normalizedValue = normalizeTimeValue(value, format);

    return {
      item: normalizeTimeItem(item, value, normalizedValue),
      value: normalizedValue,
      label: getTimeItemLabel(item),
      disabled: isTimeItemDisabled(item) || isTimeValueOutOfRange(normalizedValue, format, minTime, maxTime),
    };
  });

/**
 * Оставляет только элементы, которые компонент умеет показать в меню.
 * Пустые значения — результат условного рендера вроде `isVisible && item` или `items.length && item` —
 * молча отбрасываются, а элементы, из которых не получается собрать время, отбрасываются с предупреждением.
 */
export const sanitizeTimeItems = <T extends TimeItemValue>(
  items: Array<TimePickerExtendedItem<T>>,
  format: TimeFormat,
): Array<TimePickerExtendedItem<T>> => {
  if (!Array.isArray(items)) {
    warning(false, '[TimePicker]: the source function is expected to return an array or a Promise of an array.');

    return [];
  }

  return items.filter((item) => {
    if (!item) {
      return false;
    }

    if (!isTimeItem(item)) {
      return true;
    }

    if (isTimeItemObject(item) && typeof item.value !== 'string') {
      warning(false, '[TimePicker]: a source item is expected to be a time string or an object with a time value.');

      return false;
    }

    if (normalizeTimeValue(getTimeItemValue(item), format) === EMPTY_VALUE) {
      warning(false, `[TimePicker]: the source item value "${getTimeItemValue(item)}" is not a time.`);

      return false;
    }

    return true;
  });
};

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

  const displaySegments = getDisplaySegments(value, format);

  return getTimeSegments(format)
    .map((segment, index) => normalizeTimeSegment(displaySegments[index], segment))
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
 * Преобразует display-значение в промежуточное значение для `onInputValueChange`.
 * Заполненные сегменты дополняются до двух цифр, пропущенные сегменты до последнего заполненного становятся `00`.
 */
export const serializeTimeValue = (value: string, format: TimeFormat): string => {
  const serializedSegments = takeFilledSegments(
    getDisplaySegments(value, format).map((segmentValue) => {
      const digits = getDigits(segmentValue);

      return digits ? digits.padStart(EMPTY_SEGMENT.length, ZERO_PAD_CHAR) : EMPTY_VALUE;
    }),
  );

  return serializedSegments.map((segmentValue) => segmentValue || '00').join(TIME_SEPARATOR);
};

/** Отбрасывает незаполненный хвост сегментов: ведущие пустые сегменты остаются на своих местах. */
const takeFilledSegments = (segments: string[]): string[] => {
  const lastFilledIndex = segments.reduce((result, segmentValue, index) => (segmentValue ? index : result), -1);

  return segments.slice(0, lastFilledIndex + 1);
};

export const getTimeDisplayValue = (value: string, format: TimeFormat): string => {
  if (value === EMPTY_VALUE) {
    return EMPTY_VALUE;
  }

  return getDisplaySegments(value, format).join(TIME_SEPARATOR);
};

/**
 * Возвращает display-значение внешнего `value`.
 * Сегменты, записанные одной цифрой, дополняются нулем, поэтому `9:00` показывается как `09:00` —
 * так же, как компонент показывает время элементов источника.
 * Значение без разделителя остается частично введенным: `1` — это первая цифра часов, а не `01:00`.
 */
export const getExternalTimeDisplayValue = (value: string, format: TimeFormat): string => {
  if (!value.includes(TIME_SEPARATOR)) {
    return getTimeDisplayValue(value, format);
  }

  const paddedSegments = value.split(TIME_SEPARATOR).map((segmentValue) => {
    const digits = getDigits(segmentValue);

    return digits ? digits.padStart(EMPTY_SEGMENT.length, ZERO_PAD_CHAR) : EMPTY_VALUE;
  });

  return getTimeDisplayValue(paddedSegments.join(TIME_SEPARATOR), format);
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
 * Проверяет, что вставленное значение похоже на время:
 * это либо сегменты из одной-двух цифр через любой разделитель — `12:30`, `9:5`, `1:23:45`, `12.30`, —
 * либо цифры подряд — `9`, `1230`, `123045`.
 * Строки, из которых время собралось бы случайно — `2026-08-01`, `hello 42`, — временем не считаются.
 */
export const isTimeLikePastedValue = (value: string): boolean => {
  const trimmedValue = value.trim();

  return TIME_LIKE_SEGMENTS_REGEXP.test(trimmedValue) || TIME_LIKE_DIGITS_REGEXP.test(trimmedValue);
};

/**
 * Парсит вставленное пользователем значение и сразу преобразует его в committed-форму.
 * Значение, не похожее на время, отдается как пустое: такую вставку компонент считает некорректным вводом.
 */
export const parsePastedTimeValue = (value: string, format: TimeFormat): string => {
  const trimmedValue = value.trim();

  if (!DIGIT_REGEXP.test(trimmedValue) || !isTimeLikePastedValue(trimmedValue)) {
    return EMPTY_VALUE;
  }

  // Разделители сегментов приводятся к одному виду, чтобы `9.5` разбирался так же, как `9:5`.
  const normalizedSeparators = TIME_LIKE_SEGMENTS_REGEXP.test(trimmedValue)
    ? trimmedValue.split(NON_DIGIT_REGEXP).join(TIME_SEPARATOR)
    : trimmedValue;

  const segments = getDisplaySegments(normalizedSeparators, format);

  return normalizeTimeValue(segments.join(TIME_SEPARATOR), format);
};

/** Возвращает текущее display-значение сегмента или пустой сегмент, если индекс отсутствует. */
export const getTimeSegmentValue = (value: string, segment: TimeSegment, format: TimeFormat): string => {
  const segments = getDisplaySegments(value, format);
  const index = getTimeSegments(format).indexOf(segment);

  return segments[index] ?? EMPTY_SEGMENT;
};

export const getEmptyDisplayValue = (precision: TimeFormat): string =>
  getTimeSegments(precision)
    .map(() => EMPTY_SEGMENT)
    .join(TIME_SEPARATOR);

/**
 * Преобразует display-значение в поисковый запрос для фильтрации элементов.
 * Сегменты содержат только введенные цифры, незаполненный хвост отбрасывается: `12:3_` => `12:3`, `1_:__` => `1`.
 * Позиции сегментов сохраняются, поэтому ведущие незаполненные сегменты остаются пустыми: `__:34` => `:34`.
 * Это нужно для посегментного сравнения в `filterTimeItems` и передается как есть в пользовательскую `source`.
 */
export const getTimeFilterQuery = (value: string, format: TimeFormat): string =>
  takeFilledSegments(getDisplaySegments(value, format).map(getDigits)).join(TIME_SEPARATOR);

/**
 * Фильтрует элементы по запросу из поля ввода.
 * Сравнивает запрос посегментно: введенные цифры сегмента должны быть префиксом соответствующего сегмента элемента.
 * Пустой запрос возвращает все элементы.
 */
export const filterTimeItems = <T extends TimeItemValue>(
  items: Array<TimePickerExtendedItem<T>>,
  query: string,
  format: TimeFormat,
): Array<TimePickerExtendedItem<T>> => {
  const querySegments = query.split(TIME_SEPARATOR).map(getDigits);

  if (querySegments.every((segmentValue) => !segmentValue)) {
    return items;
  }

  return items.filter((item) => {
    if (!isTimeItem(item)) {
      return true;
    }

    const itemSegments = getDisplaySegments(normalizeTimeValue(getTimeItemValue(item), format), format);

    return querySegments.every(
      (segmentValue, index) => !segmentValue || (itemSegments[index] ?? EMPTY_VALUE).startsWith(segmentValue),
    );
  });
};
