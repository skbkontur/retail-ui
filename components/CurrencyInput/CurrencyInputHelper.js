// @flow

import { type Selection } from './SelectionHelper';
import CurrencyHelper from './CurrencyHelper';
import CursorHelper from './CursorHelper';

export default class CurrencyInputHelper {
  static moveCursor(value: string, selection: Selection, step: number): number {
    return selection.start === selection.end
      ? CursorHelper.calculatePosition(CurrencyHelper.getInfo(value).cursorMap, selection.start, step)
      : step < 0 ? selection.start : selection.end;
  }

  static extendSelection(value: string, selection: Selection, step: number) {
    const info = CurrencyHelper.getInfo(value);
    return CursorHelper.extendSelection(info.cursorMap, selection, step);
  }

  static normalizeSelection(value: string, selection: Selection): Selection {
    const info = CurrencyHelper.getInfo(value);
    return CursorHelper.normalizeSelection(info.cursorMap, selection);
  }

  static safeInsert(value: string, start: number, end: number, input: string, fractionDigits?: ?number) {
    if (!input) {
      return CurrencyInputHelper.insert(value, start, end, '');
    }
    const extracted = CurrencyInputHelper.getMaximumValidSubstring(value, start, end, input, fractionDigits);
    if (extracted) {
      return CurrencyInputHelper.insert(value, start, end, extracted);
    }
    return null;
  }

  static getMaximumValidSubstring(value: string, start: number, end: number, input: string, fractionDigits?: ?number) {
    const prefix = value.substring(0, start);
    const suffix = value.substring(end);
    input = CurrencyHelper.extractValid(input, fractionDigits);

    for (let i = input.length; i >= 0; --i) {
      const result = input.substr(0, i);
      if (CurrencyHelper.isValidString(prefix + result + suffix, fractionDigits)) {
        return result;
      }
    }
    return '';
  }

  static insert(value: string, start: number, end: number, input: string) {
    const prefix = value.substring(0, start);
    const suffix = value.substring(end);

    const info = CurrencyHelper.getInfo(value);
    const raw = CursorHelper.toRawPosition(info.cursorMap, start);
    const info2 = CurrencyHelper.getInfo(prefix + input + suffix);
    const formattedPosition = CursorHelper.toFormattedPosition(info2.cursorMap, raw + input.length);

    return { value: info2.formatted, position: formattedPosition };
  }
}
