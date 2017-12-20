// @flow

import { type Selection } from './SelectionHelper';
import CurrencyHelper from './CurrencyHelper';

export default class CurrencyInputHelper {
  static toUnformattedPosition(value: string, formattedPosition: number) {
    const prefix = CurrencyHelper.formatString(value).substr(
      0,
      formattedPosition
    );
    return CurrencyHelper.unformatString(prefix).length;
  }

  static toFormattedPosition(value: string, unformattedPosition: number) {
    const unformatted = CurrencyHelper.unformatString(value);
    const hasFraction = unformatted.indexOf('.') !== -1;

    const suffix = unformatted.substr(unformattedPosition);
    const suffixHasFraction = suffix.indexOf('.') !== -1;

    const formattedSuffix =
      !hasFraction || suffixHasFraction
        ? CurrencyHelper.formatString(suffix)
        : suffix;
    return CurrencyHelper.formatString(value).length - formattedSuffix.length;
  }

  static calculateFormattedPosition(
    value: string,
    position: number,
    step: number
  ) {
    const unformatted = CurrencyInputHelper.toUnformattedPosition(
      value,
      position
    );
    return CurrencyInputHelper.toFormattedPosition(
      value,
      Math.max(0, unformatted + step)
    );
  }

  static safeInsert(
    value: string,
    start: number,
    end: number,
    input: string,
    fractionDigits?: ?number
  ) {
    if (!input) {
      return CurrencyInputHelper.insert(value, start, end, '');
    }
    const extracted = CurrencyInputHelper.getMaximumValidSubstring(
      value,
      start,
      end,
      input,
      fractionDigits
    );
    if (extracted) {
      return CurrencyInputHelper.insert(value, start, end, extracted);
    }
    return null;
  }

  static getMaximumValidSubstring(
    value: string,
    start: number,
    end: number,
    input: string,
    fractionDigits?: ?number
  ) {
    const prefix = value.substring(0, start);
    const suffix = value.substring(end);
    input = CurrencyHelper.extractValid(input, fractionDigits);

    for (let i = input.length; i >= 0; --i) {
      const result = input.substr(0, i);
      if (
        CurrencyHelper.isValidString(prefix + result + suffix, fractionDigits)
      ) {
        return result;
      }
    }
    return '';
  }

  static insert(value: string, start: number, end: number, input: string) {
    const prefix = value.substring(0, start);
    const suffix = value.substring(end);

    input = input || '';

    const result = CurrencyHelper.formatString(prefix + input + suffix);

    const unformattedPosition = CurrencyInputHelper.toUnformattedPosition(
      value,
      start
    );
    const formattedPosition = CurrencyInputHelper.toFormattedPosition(
      result,
      unformattedPosition + input.length
    );

    return { value: result, position: formattedPosition };
  }

  static extendSelection(
    value: string,
    selection: Selection,
    step: number
  ): Selection {
    selection = CurrencyInputHelper.normalizeSelection(value, selection);

    selection =
      selection.direction === 'backward'
        ? {
            start: CurrencyInputHelper.calculateFormattedPosition(
              value,
              selection.start,
              step
            ),
            end: selection.end,
            direction: 'backward'
          }
        : {
            start: selection.start,
            end: CurrencyInputHelper.calculateFormattedPosition(
              value,
              selection.end,
              step
            ),
            direction: 'forward'
          };

    return CurrencyInputHelper.normalizeSelection(value, selection);
  }

  static moveCursor(value: string, selection: Selection, step: number): number {
    return selection.start === selection.end
      ? CurrencyInputHelper.calculateFormattedPosition(
          value,
          selection.start,
          step
        )
      : step < 0 ? selection.start : selection.end;
  }

  static normalizePosition(value: string, position: number): number {
    position = Math.min(Math.max(0, position), value.length);
    return CurrencyInputHelper.calculateFormattedPosition(value, position, 0);
  }

  static normalizeSelection(value: string, selection: Selection): Selection {
    const start = CurrencyInputHelper.normalizePosition(value, selection.start);
    const end = CurrencyInputHelper.normalizePosition(value, selection.end);

    if (start === end) {
      return {
        start,
        end,
        direction: 'none'
      };
    }

    if (start < end) {
      return {
        start,
        end,
        direction: selection.direction === 'backward' ? 'backward' : 'forward'
      };
    }

    return {
      start: end,
      end: start,
      direction: selection.direction === 'backward' ? 'forward' : 'backward'
    };
  }
}
