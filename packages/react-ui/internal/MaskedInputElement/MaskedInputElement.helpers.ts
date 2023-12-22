import { isNonNullable } from '../../lib/utils';

export const DEFAULT_MASK_CHAR = '_';
export const DEFINITIONS = { '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ };

export function getDefinitions(formatChars: Record<string, string> | undefined): Record<string, RegExp> {
  if (isNonNullable(formatChars)) {
    const chars: Record<string, RegExp> = {};

    for (const key in formatChars) {
      chars[key] = new RegExp(formatChars[key]);
    }

    return chars;
  }

  return DEFINITIONS;
}

export function getMaskChar(maskChar: string | null | undefined): string {
  if (maskChar === null) {
    return '';
  }

  return maskChar === undefined ? DEFAULT_MASK_CHAR : maskChar;
}

interface IMaskInputState {
  // Users can unmask value themselves. In these cases we take origin value length
  originValue: string;
  value: string;
  emptyValue: string;
  focused: boolean;
}

export function getFocusPrefix(state: IMaskInputState, maskChar: string | null | undefined): string {
  const { emptyValue } = state;
  return emptyValue.slice(0, emptyValue.indexOf(getMaskChar(maskChar)));
}

export function getCurrentValue(
  state: IMaskInputState,
  maskChar: string | null | undefined,
): [currentValue: string, left: string, right: string] {
  const { emptyValue, value, originValue, focused } = state;

  if (focused && originValue.length === 0 && emptyValue.length > 0) {
    const currentValue = getFocusPrefix(state, maskChar);
    return [currentValue, currentValue, emptyValue.slice(currentValue.length)];
  }

  return [value, originValue, emptyValue.slice(originValue.length)];
}
