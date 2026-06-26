import {
  getDefaultMaxTime,
  getDefaultMinTime,
  getNativeTimeStep,
  getTimeForComponent,
  getTimeForNative,
} from '../NativeTimeInput.utils.js';

describe('NativeTimeInput utils', () => {
  it('normalizes component time for native minute format', () => {
    expect(getTimeForNative('9:5', 'HH:mm')).toBe('09:05');
    expect(getTimeForNative('09:15:45', 'HH:mm')).toBe('09:15');
  });

  it('normalizes component time for native second format', () => {
    expect(getTimeForNative('9:5', 'HH:mm:ss')).toBe('09:05:00');
    expect(getTimeForNative('09:15:45', 'HH:mm:ss')).toBe('09:15:45');
  });

  it('normalizes native time back to component format', () => {
    expect(getTimeForComponent('9:5', 'HH:mm')).toBe('09:05');
    expect(getTimeForComponent('9:5', 'HH:mm:ss')).toBe('09:05:00');
    expect(getTimeForComponent('', 'HH:mm:ss')).toBe('');
  });

  it('returns format-specific defaults and step', () => {
    expect(getDefaultMinTime('HH:mm')).toBe('00:00');
    expect(getDefaultMaxTime('HH:mm')).toBe('23:59');
    expect(getDefaultMinTime('HH:mm:ss')).toBe('00:00:00');
    expect(getDefaultMaxTime('HH:mm:ss')).toBe('23:59:59');
    expect(getNativeTimeStep('HH:mm')).toBe(60);
    expect(getNativeTimeStep('HH:mm:ss')).toBe(1);
  });

  it('returns undefined for empty component value', () => {
    expect(getTimeForNative('', 'HH:mm')).toBeUndefined();
    expect(getTimeForNative(undefined, 'HH:mm:ss')).toBeUndefined();
  });
});
