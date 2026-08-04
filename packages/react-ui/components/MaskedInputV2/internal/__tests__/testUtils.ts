import type React from 'react';

import { getDefinitions, getMaskChar } from '../../MaskedInputV2.helpers.js';
import type { MaskedPattern } from '../../react-imask/imask/index.js';
import { createMask } from '../../react-imask/imask/masked/create.js';
import { buildSlotMap } from '../buildSlotMap.js';
import type { MaskEngine } from '../types.js';

export function createTestImask(mask: string, maskChar?: string): MaskedPattern {
  return createMask({
    mask: mask.replace(/0/g, '{\\0}') as any,
    placeholderChar: getMaskChar(maskChar),
    definitions: getDefinitions(undefined),
    eager: 'remove',
    overwrite: 'shift',
    lazy: true,
  }) as unknown as MaskedPattern;
}

export function createTestMaskEngine(mask: string, maskChar?: string): Pick<MaskEngine, 'imask' | 'slotMap'> {
  const imask = createTestImask(mask, maskChar);

  return {
    imask,
    slotMap: buildSlotMap(imask),
  };
}

export function createKeyboardEvent(
  key: string,
  options: Partial<React.KeyboardEvent<HTMLInputElement>> = {},
): React.KeyboardEvent<HTMLInputElement> {
  return {
    key,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    ...options,
  } as React.KeyboardEvent<HTMLInputElement>;
}

export function createInputWithSelection(
  value: string,
  selection: { start: number; end: number; direction?: 'forward' | 'backward' | 'none' },
): HTMLInputElement {
  const input = document.createElement('input');
  input.value = value;
  input.setSelectionRange(selection.start, selection.end, selection.direction ?? 'none');
  return input;
}
