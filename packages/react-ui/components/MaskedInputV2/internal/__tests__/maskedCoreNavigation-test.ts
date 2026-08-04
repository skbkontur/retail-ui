import { expect } from 'vitest';

import { calcNavigationSelection } from '../maskedCoreNavigation.js';
import { createInputWithSelection, createKeyboardEvent } from './testUtils.js';

describe('calcNavigationSelection', () => {
  it('returns zero selection when input element is missing', () => {
    expect(calcNavigationSelection(createKeyboardEvent('ArrowLeft'), 5, null)).toEqual([0, 0, 'none']);
  });

  it('moves caret one position left on ArrowLeft', () => {
    const input = createInputWithSelection('12:34', { start: 3, end: 3 });

    expect(calcNavigationSelection(createKeyboardEvent('ArrowLeft'), 5, input)).toEqual([2, 2, 'none']);
  });

  it('moves caret one position right on ArrowRight', () => {
    const input = createInputWithSelection('12:34', { start: 2, end: 2 });

    expect(calcNavigationSelection(createKeyboardEvent('ArrowRight'), 5, input)).toEqual([3, 3, 'none']);
  });

  it('does not move caret past maxPos', () => {
    const input = createInputWithSelection('12:34', { start: 5, end: 5 });

    expect(calcNavigationSelection(createKeyboardEvent('ArrowRight'), 5, input)).toEqual([5, 5, 'none']);
  });

  it('extends selection with Shift+ArrowRight', () => {
    const input = createInputWithSelection('12:34', { start: 2, end: 2 });

    expect(calcNavigationSelection(createKeyboardEvent('ArrowRight', { shiftKey: true }), 5, input)).toEqual([
      2,
      3,
      'forward',
    ]);
  });

  it('jumps to home on Home key', () => {
    const input = createInputWithSelection('12:34', { start: 4, end: 4 });

    expect(calcNavigationSelection(createKeyboardEvent('Home'), 5, input)).toEqual([0, 0, 'none']);
  });
});
