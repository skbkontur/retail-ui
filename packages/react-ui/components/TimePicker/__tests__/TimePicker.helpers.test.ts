import { createElement } from 'react';

import { TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR, EMPTY_SEGMENT } from '../helpers/TimePicker.constants.js';
import {
  commitTimeSegmentOnLeave,
  deleteTimeSegmentDigit,
  formatDigitToTimeSegment,
  shiftTimeSegmentValue,
} from '../helpers/TimePicker.editing.js';
import { isTimeMenuItem } from '../helpers/TimePicker.shared.js';
import {
  filterTimeItems,
  getExternalTimeDisplayValue,
  getTimeDisplayValue,
  getTimeFilterQuery,
  getEmptyDisplayValue,
  isTimeValueOutOfRange,
  normalizeTimeValue,
  parsePastedTimeValue,
  replaceTimeSegment,
  resolveTimeItems,
  serializeTimeValue,
} from '../helpers/TimePicker.value.js';

describe('TimePicker helpers', () => {
  it('keeps empty value empty on normalize', () => {
    expect(normalizeTimeValue('', 'HH:mm')).toBe('');
    expect(normalizeTimeValue('', 'HH:mm:ss')).toBe('');
  });

  it('normalizes partial values', () => {
    expect(
      normalizeTimeValue(
        `1${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
        'HH:mm',
      ),
    ).toBe('01:00');
    expect(
      normalizeTimeValue(
        `12${TIME_SEPARATOR}3${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}4${TIME_PLACEHOLDER_CHAR}`,
        'HH:mm:ss',
      ),
    ).toBe('12:03:04');
  });

  it('serializes display value into partial raw value', () => {
    expect(
      serializeTimeValue(
        `1${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
        'HH:mm',
      ),
    ).toBe('01');
    expect(
      serializeTimeValue(
        `01${TIME_SEPARATOR}3${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
        'HH:mm:ss',
      ),
    ).toBe('01:03');
    expect(
      serializeTimeValue(
        `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}6${TIME_PLACEHOLDER_CHAR}`,
        'HH:mm',
      ),
    ).toBe('00:06');
  });

  it('restores display value from partial raw value', () => {
    expect(getTimeDisplayValue('01', 'HH:mm')).toBe(
      `01${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );
    expect(getTimeDisplayValue('01:03', 'HH:mm:ss')).toBe(
      `01${TIME_SEPARATOR}03${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );
  });

  const PH = TIME_PLACEHOLDER_CHAR;
  const emptyHHmm = getEmptyDisplayValue('HH:mm');

  it.each([
    [
      'auto-completes one digit in hours when digit is greater than 2',
      emptyHHmm,
      'hours',
      '9',
      `09${TIME_SEPARATOR}${PH}${PH}`,
      'minutes',
      false,
    ],
    [
      'keeps hours pending after first digit 1',
      emptyHHmm,
      'hours',
      '1',
      `1${PH}${TIME_SEPARATOR}${PH}${PH}`,
      'hours',
      false,
    ],
    [
      'blinks on invalid second digit after 2 in hours',
      `2${PH}${TIME_SEPARATOR}${PH}${PH}`,
      'hours',
      '5',
      `2${PH}${TIME_SEPARATOR}${PH}${PH}`,
      'hours',
      true,
    ],
    [
      'keeps minutes pending after first digit 6',
      emptyHHmm,
      'minutes',
      '6',
      `${PH}${PH}${TIME_SEPARATOR}6${PH}`,
      'minutes',
      false,
    ],
    [
      'blinks on invalid second digit after pending 6 in minutes',
      `${PH}${PH}${TIME_SEPARATOR}6${PH}`,
      'minutes',
      '5',
      `${PH}${PH}${TIME_SEPARATOR}6${PH}`,
      'minutes',
      true,
    ],
  ] as const)('%s', (_name, value, segment, digit, nextValue, selectedSegment, shouldBlink) => {
    const result = formatDigitToTimeSegment(value, segment, digit, 'HH:mm');

    expect(result.nextValue).toBe(nextValue);
    expect(result.selectedSegment).toBe(selectedSegment);
    expect(result.shouldBlink).toBe(shouldBlink);
  });

  it('normalizes pending minutes on leave', () => {
    expect(
      commitTimeSegmentOnLeave(
        `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}6${TIME_PLACEHOLDER_CHAR}`,
        'minutes',
        'HH:mm',
      ),
    ).toBe(`${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}06`);
  });

  it('clamps values greater than max', () => {
    expect(normalizeTimeValue('24:67', 'HH:mm')).toBe('23:59');
  });

  it('normalizes pasted values immediately', () => {
    expect(parsePastedTimeValue('88:88', 'HH:mm')).toBe('23:59');
    expect(parsePastedTimeValue('1', 'HH:mm')).toBe('01:00');
    expect(parsePastedTimeValue('99:99:99', 'HH:mm:ss')).toBe('23:59:59');
    expect(parsePastedTimeValue('abc', 'HH:mm')).toBe('');
  });

  it('parses pasted values with separators and single-digit segments', () => {
    expect(parsePastedTimeValue('9:30', 'HH:mm')).toBe('09:30');
    expect(parsePastedTimeValue('9:5', 'HH:mm')).toBe('09:05');
    expect(parsePastedTimeValue('1:23:45', 'HH:mm:ss')).toBe('01:23:45');
    expect(parsePastedTimeValue('1:23:45', 'HH:mm')).toBe('01:23');
    expect(parsePastedTimeValue('12.30', 'HH:mm')).toBe('12:30');
    expect(parsePastedTimeValue('12 30', 'HH:mm')).toBe('12:30');
    expect(parsePastedTimeValue('9.5', 'HH:mm')).toBe('09:05');
    expect(parsePastedTimeValue('9 5', 'HH:mm')).toBe('09:05');
    expect(parsePastedTimeValue('9-5', 'HH:mm')).toBe('09:05');
    expect(parsePastedTimeValue('1.2.3', 'HH:mm')).toBe('01:02');
    expect(parsePastedTimeValue('1.2.3', 'HH:mm:ss')).toBe('01:02:03');
    expect(parsePastedTimeValue('  12:30  ', 'HH:mm')).toBe('12:30');
    expect(parsePastedTimeValue('1230', 'HH:mm')).toBe('12:30');
  });

  it('rejects pasted values that only look like they contain a time', () => {
    expect(parsePastedTimeValue('2026-08-01', 'HH:mm')).toBe('');
    expect(parsePastedTimeValue('2026-08-01T12:30', 'HH:mm')).toBe('');
    expect(parsePastedTimeValue('hello 42', 'HH:mm')).toBe('');
    expect(parsePastedTimeValue('встреча в 9', 'HH:mm')).toBe('');
    expect(parsePastedTimeValue('1234567', 'HH:mm')).toBe('');
    expect(parsePastedTimeValue('-5:-5', 'HH:mm')).toBe('');
  });

  it('pads single-digit segments of the external value', () => {
    expect(getExternalTimeDisplayValue('9:00', 'HH:mm')).toBe('09:00');
    expect(getExternalTimeDisplayValue('9:5', 'HH:mm')).toBe('09:05');
    expect(getExternalTimeDisplayValue('09:00', 'HH:mm')).toBe('09:00');
    expect(getExternalTimeDisplayValue('9:00:5', 'HH:mm:ss')).toBe('09:00:05');
    expect(getExternalTimeDisplayValue('', 'HH:mm')).toBe('');
  });

  it('keeps a partial external value without a separator partial', () => {
    expect(getExternalTimeDisplayValue('1', 'HH:mm')).toBe(`1${TIME_PLACEHOLDER_CHAR}:${EMPTY_SEGMENT}`);
  });

  it('checks time values against min and max range', () => {
    expect(isTimeValueOutOfRange('09:00', 'HH:mm', '09:00', '18:00')).toBe(false);
    expect(isTimeValueOutOfRange('08:59', 'HH:mm', '09:00', '18:00')).toBe(true);
    expect(isTimeValueOutOfRange('18:01', 'HH:mm', '09:00', '18:00')).toBe(true);
    expect(isTimeValueOutOfRange('09:00:30', 'HH:mm:ss', '09:00', '18:00')).toBe(false);
    expect(isTimeValueOutOfRange('08:59:59', 'HH:mm:ss', '09:00', '18:00')).toBe(true);
  });

  it('handles cross-midnight range (minTime > maxTime)', () => {
    expect(isTimeValueOutOfRange('07:30', 'HH:mm', '18:00', '09:00')).toBe(false);
    expect(isTimeValueOutOfRange('10:00', 'HH:mm', '18:00', '09:00')).toBe(true);
    expect(isTimeValueOutOfRange('20:00', 'HH:mm', '18:00', '09:00')).toBe(false);
    expect(isTimeValueOutOfRange('18:00', 'HH:mm', '18:00', '09:00')).toBe(false);
    expect(isTimeValueOutOfRange('09:00', 'HH:mm', '18:00', '09:00')).toBe(false);
    expect(isTimeValueOutOfRange('17:59', 'HH:mm', '18:00', '09:00')).toBe(true);
    expect(isTimeValueOutOfRange('09:01', 'HH:mm', '18:00', '09:00')).toBe(true);
  });

  it('cycles segment values with arrows', () => {
    expect(shiftTimeSegmentValue(`23${TIME_SEPARATOR}00`, 'hours', 1, 'HH:mm')).toBe(`00${TIME_SEPARATOR}00`);
    expect(shiftTimeSegmentValue(`00${TIME_SEPARATOR}00`, 'minutes', -1, 'HH:mm')).toBe(`00${TIME_SEPARATOR}59`);
  });

  it('deletes and clears active segment without touching separator', () => {
    expect(deleteTimeSegmentDigit(`12${TIME_SEPARATOR}34`, 'minutes', 'HH:mm')).toBe(
      `12${TIME_SEPARATOR}3${TIME_PLACEHOLDER_CHAR}`,
    );
    expect(replaceTimeSegment(`12${TIME_SEPARATOR}34`, 'hours', EMPTY_SEGMENT, 'HH:mm')).toBe(
      `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}34`,
    );
  });

  it('builds filter query from display value', () => {
    expect(getTimeFilterQuery('', 'HH:mm')).toBe('');
    expect(getTimeFilterQuery(getEmptyDisplayValue('HH:mm'), 'HH:mm')).toBe('');
    expect(
      getTimeFilterQuery(
        `1${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
        'HH:mm',
      ),
    ).toBe('1');
    expect(getTimeFilterQuery(`12${TIME_SEPARATOR}3${TIME_PLACEHOLDER_CHAR}`, 'HH:mm')).toBe(`12${TIME_SEPARATOR}3`);
    expect(getTimeFilterQuery('12:34', 'HH:mm')).toBe('12:34');
    expect(getTimeFilterQuery(`${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}34`, 'HH:mm')).toBe(
      `${TIME_SEPARATOR}34`,
    );
  });

  it('filters items by segment prefixes', () => {
    const items = [{ value: '09:00' }, { value: '12:00' }, { value: '12:30' }, { value: '12:35' }, { value: '19:30' }];

    expect(filterTimeItems(items, '', 'HH:mm')).toEqual(items);
    expect(filterTimeItems(items, '1', 'HH:mm')).toEqual([
      { value: '12:00' },
      { value: '12:30' },
      { value: '12:35' },
      { value: '19:30' },
    ]);
    expect(filterTimeItems(items, '12:3', 'HH:mm')).toEqual([{ value: '12:30' }, { value: '12:35' }]);
    expect(filterTimeItems(items, '22', 'HH:mm')).toEqual([]);
    expect(filterTimeItems(items, `${TIME_SEPARATOR}30`, 'HH:mm')).toEqual([{ value: '12:30' }, { value: '19:30' }]);
  });

  it('resolves items for rendering keeping the source item as is', () => {
    const element = createElement('span', { key: 'header' });
    const item = { value: '10:00', label: 'Обед', disabled: true };

    const resolved = resolveTimeItems(['09:00', item, element], 'HH:mm');

    expect(resolved).toEqual([
      { item: '09:00', value: '09:00', label: undefined, disabled: false },
      { item, value: '10:00', label: 'Обед', disabled: true },
      element,
    ]);
    expect(resolved[2]).toBe(element);
  });

  it('disables resolved items out of the min and max range', () => {
    const resolved = resolveTimeItems(['09:00', '12:00', '19:00'], 'HH:mm', '10:00', '18:00');

    expect(resolved.map((item) => isTimeMenuItem(item) && item.disabled)).toEqual([true, false, true]);
  });
});
