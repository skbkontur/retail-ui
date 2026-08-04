import { describe, expect, it } from 'vitest';

import { computePasteMaskedCursor } from '../computePasteMaskedCursor.js';
import { createTestMaskEngine } from './testUtils.js';

describe('computePasteMaskedCursor', () => {
  it('returns masked position after pasted chars in the middle', () => {
    const { slotMap } = createTestMaskEngine('9-9-9-9');

    expect(computePasteMaskedCursor('1', '3', '123', 1, slotMap, 5)).toBe(4);
  });

  it('returns typedLength when cursor moves past last raw slot', () => {
    const { slotMap } = createTestMaskEngine('999');

    expect(computePasteMaskedCursor('', '', '123', 0, slotMap, 3)).toBe(3);
  });
});
