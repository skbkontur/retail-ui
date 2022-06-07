import { Nullable } from '../../typings/utility-types';

import { Selection } from './SelectionHelper';
import { CurrencyHelper } from './CurrencyHelper';
import { CursorHelper } from './CursorHelper';

export interface DecimalOptions {
  integerDigits?: Nullable<number>;
  fractionDigits?: Nullable<number>;
  unsigned?: boolean;
}

export class CurrencyInputHelper {
  public static moveCursor(value: string, selection: Selection, step: number): number {
    if (selection.start === selection.end) {
      return CursorHelper.calculatePosition(CurrencyHelper.getInfo(value).cursorMap, selection.start, step);
    } else if (step < 0) {
      return selection.start;
    }

    return selection.end;
  }

  public static extendSelection(value: string, selection: Selection, step: number) {
    const info = CurrencyHelper.getInfo(value);
    return CursorHelper.extendSelection(info.cursorMap, selection, step);
  }

  public static normalizeSelection(value: string, selection: Selection): Selection {
    const info = CurrencyHelper.getInfo(value);
    return CursorHelper.normalizeSelection(info.cursorMap, selection);
  }

  public static safeInsert(value: string, start: number, end: number, input: string, options: DecimalOptions) {
    if (input && start === 0 && end === value.length) {
      const extracted = CurrencyHelper.extractValid(input, options);
      if (!extracted) {
        return null;
      }
      return CurrencyInputHelper.insert(value, start, end, extracted);
    }

    const prefix = value.substring(0, start);
    const suffix = value.substring(end);

    const combined = prefix + input + suffix;
    if (CurrencyHelper.isValidString(combined, options)) {
      return CurrencyInputHelper.insert(value, start, end, input);
    }
    return null;
  }

  public static insert(value: string, start: number, end: number, input: string) {
    const prefix = value.substring(0, start);
    const suffix = value.substring(end);

    const info = CurrencyHelper.getInfo(value);
    const raw = CursorHelper.toRawPosition(info.cursorMap, start);
    const info2 = CurrencyHelper.getInfo(prefix + input + suffix);
    const formattedPosition = CursorHelper.toFormattedPosition(info2.cursorMap, raw + input.length);

    return { value: info2.formatted, position: formattedPosition };
  }
}
