import { type Definitions } from '@lossir/imask';

import { isNonNullable } from '../../lib/utils';

export const DEFAULT_MASK_CHAR = '_';
export const DEFINITIONS = Object.freeze({ '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ });

export function getDefinitions(formatChars: Record<string, string> | undefined): Definitions {
  if (isNonNullable(formatChars)) {
    const chars: Record<string, RegExp> = {};

    for (const key in formatChars) {
      chars[key] = new RegExp(formatChars[key]);
    }

    return chars;
  }

  return DEFINITIONS;
}

export function getMaskChar(maskChar: string | undefined): string {
  return !maskChar ? DEFAULT_MASK_CHAR : maskChar;
}
