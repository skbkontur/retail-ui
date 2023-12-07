import { isNonNullable } from '../../lib/utils';
import { Nullable } from '../../typings/utility-types';

export const Definitions = { '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ };

export function getDefinitions(formatChars: Nullable<Record<string, string>>): Record<string, string | RegExp> {
  if (isNonNullable(formatChars)) {
    const chars: Record<string, RegExp> = {};

    for (const key in formatChars) {
      chars[key] = new RegExp(formatChars[key]);
    }

    return chars;
  }

  return Definitions;
}

export function getMaskChar(maskChar: Nullable<string>): string {
  return maskChar ?? '_';
}

interface MaskedInputState {
  // Users can unmask value themselves. In these cases we take origin value length
  originValue: string;
  value: string;
  emptyValue: string;
  focused: boolean;
}

export function getFocusPrefix(state: MaskedInputState, maskChar: Nullable<string>): string {
  const { emptyValue } = state;
  return emptyValue.slice(0, emptyValue.indexOf(getMaskChar(maskChar)));
}

export function getCurrentValue(
  state: MaskedInputState,
  maskChar: Nullable<string>,
): [currentValue: string, left: string, right: string] {
  const { emptyValue, value, originValue, focused } = state;

  if (focused && originValue.length === 0 && emptyValue.length > 0) {
    const currentValue = getFocusPrefix(state, maskChar);
    return [currentValue, currentValue, emptyValue.slice(currentValue.length)];
  }

  return [value, originValue, emptyValue.slice(originValue.length)];
}
