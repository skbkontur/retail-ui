import { expect } from 'vitest';

import { getDefinitions, getMaskChar } from '../../MaskedInputV2.helpers.js';
import type { MaskedPattern } from '../../react-imask/imask/index.js';
import { createMask } from '../../react-imask/imask/masked/create.js';
import { applyMaskedInputChange } from '../maskedCoreInputChange.js';
import { createTestMaskEngine } from './testUtils.js';

function createEagerAppendImask(mask: string): MaskedPattern {
  return createMask({
    mask: mask.replace(/0/g, '{\\0}') as any,
    placeholderChar: getMaskChar(undefined),
    definitions: getDefinitions(undefined),
    eager: 'append',
    overwrite: 'shift',
    lazy: true,
  }) as unknown as MaskedPattern;
}

describe('applyMaskedInputChange', () => {
  it('accepts typed digit and moves cursor forward', () => {
    const { imask } = createTestMaskEngine('99:99');
    imask.unmaskedValue = '1';

    const result = applyMaskedInputChange({
      browserDraft: '12',
      cursorPos: 2,
      typedValue: '1',
      currentRaw: '1',
      oldSelection: { start: 1, end: 1 },
      engine: { imask },
    });

    expect(result.rejected).toBe(false);
    expect(result.newRaw).toBe('12');
    expect(result.cursorPos).toBeGreaterThan(0);
  });

  it('rejects invalid character', () => {
    const { imask } = createTestMaskEngine('99:99');
    imask.unmaskedValue = '1';

    const result = applyMaskedInputChange({
      browserDraft: '1a',
      cursorPos: 2,
      typedValue: '1',
      currentRaw: '1',
      oldSelection: { start: 1, end: 1 },
      engine: { imask },
    });

    expect(result.rejected).toBe(true);
    expect(result.newRaw).toBe('1');
  });

  it('retries insert into slot when keystroke matches leading fixed digit', () => {
    const imask = createEagerAppendImask('7 999');
    imask.resolve('', { input: true });
    imask._appendEager();
    expect(imask.value).toBe('7 ');

    const result = applyMaskedInputChange({
      browserDraft: '77 ',
      cursorPos: 1,
      typedValue: '7 ',
      currentRaw: '',
      oldSelection: { start: 0, end: 0 },
      engine: { imask },
    });

    expect(result.rejected).toBe(false);
    expect(result.newRaw).toBe('7');
  });

  it('accepts digit matching fixed literal when caret is after eager prefix', () => {
    const imask = createEagerAppendImask('7 999');
    imask.resolve('', { input: true });
    imask._appendEager();

    const result = applyMaskedInputChange({
      browserDraft: '7 7',
      cursorPos: 3,
      typedValue: '7 ',
      currentRaw: '',
      oldSelection: { start: 2, end: 2 },
      engine: { imask },
    });

    expect(result.rejected).toBe(false);
    expect(result.newRaw).toBe('7');
  });
});
