import { TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR, EMPTY_SEGMENT } from '../helpers/TimePicker.constants.js';
import {
  commitTimeSegmentOnLeave,
  deleteTimeSegmentDigit,
  formatDigitToTimeSegment,
  shiftTimeSegmentValue,
} from '../helpers/TimePicker.editing.js';
import {
  getTimeDisplayValue,
  getEmptyDisplayValue,
  isTimeValueOutOfRange,
  normalizeTimeValue,
  parsePastedTimeValue,
  replaceTimeSegment,
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

  it('auto-completes one digit in hours when digit is greater than 2', () => {
    const result = formatDigitToTimeSegment(getEmptyDisplayValue('HH:mm'), 'hours', '9', 'HH:mm');

    expect(result.nextValue).toBe(`09${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);
    expect(result.selectedSegment).toBe('minutes');
    expect(result.isCompletedPart).toBe(true);
  });

  it('keeps hours pending after first digit 1', () => {
    const result = formatDigitToTimeSegment(getEmptyDisplayValue('HH:mm'), 'hours', '1', 'HH:mm');

    expect(result.nextValue).toBe(
      `1${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );
    expect(result.selectedSegment).toBe('hours');
    expect(result.isCompletedPart).toBe(false);
    expect(result.shouldBlink).toBe(false);
  });

  it('blinks on invalid second digit after 2 in hours', () => {
    const initialValue = `2${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`;
    const result = formatDigitToTimeSegment(initialValue, 'hours', '5', 'HH:mm');

    expect(result.nextValue).toBe(initialValue);
    expect(result.selectedSegment).toBe('hours');
    expect(result.isCompletedPart).toBe(false);
    expect(result.shouldBlink).toBe(true);
  });

  it('keeps minutes pending after first digit 6', () => {
    const result = formatDigitToTimeSegment(getEmptyDisplayValue('HH:mm'), 'minutes', '6', 'HH:mm');

    expect(result.nextValue).toBe(
      `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}6${TIME_PLACEHOLDER_CHAR}`,
    );
    expect(result.selectedSegment).toBe('minutes');
    expect(result.isCompletedPart).toBe(false);
    expect(result.shouldBlink).toBe(false);
  });

  it('blinks on invalid second digit after pending 6 in minutes', () => {
    const initialValue = `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}6${TIME_PLACEHOLDER_CHAR}`;
    const result = formatDigitToTimeSegment(initialValue, 'minutes', '5', 'HH:mm');

    expect(result.nextValue).toBe(initialValue);
    expect(result.selectedSegment).toBe('minutes');
    expect(result.isCompletedPart).toBe(false);
    expect(result.shouldBlink).toBe(true);
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
});
