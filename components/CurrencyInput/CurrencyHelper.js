// @flow
import type { CursorMap } from './CursorHelper';

export type DecimalFormattingOptions = {
  fractionDigits?: ?number,
  thousandsDelimiter?: string
};

type DecimalFormattingOptionsInternal = {
  fractionDigits: ?number,
  thousandsDelimiter: string
};

export type FormattingInfo = {
  raw: string,
  formatted: string,
  cursorMap: CursorMap
};

export default class CurrencyHelper {
  static defaultOptions: DecimalFormattingOptionsInternal = {
    fractionDigits: null,
    thousandsDelimiter: String.fromCharCode(0x2009)
  };

  static getOptions(options?: ?DecimalFormattingOptions): DecimalFormattingOptionsInternal {
    return { ...CurrencyHelper.defaultOptions, ...options };
  }

  static getInfo(value: string, options?: ?DecimalFormattingOptions): FormattingInfo {
    const raw = CurrencyHelper.unformatString(value);
    const formatted = CurrencyHelper.formatString(value, options);
    const cursorMap = CurrencyHelper.getCursorMap(formatted, options);

    return { raw, formatted, cursorMap };
  }

  static getCursorMap(formatted: string, formattingOptions?: ?DecimalFormattingOptions): CursorMap {
    const options = CurrencyHelper.getOptions(formattingOptions);
    const regexp = new RegExp(options.thousandsDelimiter);
    const cursorMap: CursorMap = [];

    let index = formatted.length;
    let cursor = formatted.length;
    let skip = 0;

    while (index >= 0) {
      cursorMap[index] = cursor;

      const ignoredSymbol = regexp.exec(formatted[index - 1]);
      if (ignoredSymbol) {
        ++skip;
      } else {
        cursor = cursor - skip - 1;
        skip = 0;
      }
      --index;
    }
    return cursorMap;
  }

  static format(value: ?number, options?: ?DecimalFormattingOptions): string {
    if (value == null) {
      return '';
    }

    return CurrencyHelper.formatString(value.toString(), options);
  }

  static parse(value: string): ?number {
    const cleaned = CurrencyHelper.unformatString(value);
    if (!cleaned) {
      return null;
    }
    return parseFloat('0' + cleaned);
  }

  static unformatString(value: string): string {
    return value.replace(/\s/g, '').replace(',', '.');
  }

  static formatForClipboard(value: string): string {
    return CurrencyHelper.unformatString(value).replace('.', ',');
  }

  static formatString(value: string, formattingOptions?: ?DecimalFormattingOptions): string {
    const options = CurrencyHelper.getOptions(formattingOptions);
    value = CurrencyHelper.unformatString(value);
    const [integer = '', fraction = ''] = value.split('.');

    const fractionDigits = options.fractionDigits == null ? fraction.length : options.fractionDigits;

    if (fraction.length > fractionDigits) {
      throw new Error('Error');
    }

    const parts = [];

    const blockSize = 3;
    const start = (integer.length - 1) % blockSize - blockSize + 1;
    for (let i = start; i < integer.length; i += blockSize) {
      parts.push(integer.substring(Math.max(i, 0), i + blockSize));
    }

    let result = parts.join(options.thousandsDelimiter);

    if (value.includes('.') || fractionDigits) {
      result += ',';
    }

    if (fractionDigits) {
      result += fraction.padEnd(fractionDigits, '0');
    }

    return result;
  }

  static isValidString(value: string, fractionDigits?: ?number) {
    value = CurrencyHelper.unformatString(value);

    const onlyValidSymbols = !!/^[\d\.]*$/.exec(value);
    if (!onlyValidSymbols) {
      return false;
    }

    const chars = Array.from(value);

    const digitsCount = chars.filter(x => CurrencyHelper.isDigit(x)).length;
    if (digitsCount > 15) {
      return false;
    }

    const dotsCount = chars.filter(x => x === '.').length;

    switch (fractionDigits) {
      case 0:
        return dotsCount === 0;
      case null:
      case undefined:
        return dotsCount <= 1;
      default:
        const [integer, fraction = ''] = value.split('.');
        return dotsCount <= 1 && integer.length <= 15 - fractionDigits && fraction.length <= fractionDigits;
    }
  }

  static extractValid(value: string, fractionDigits?: ?number): string {
    let match = /[\d\.,][\s\d\.,]*/.exec(value);
    if (!match) {
      return '';
    }

    const token = CurrencyHelper.unformatString(match[0]).substr(0, 16);

    for (let i = token.length; i >= 0; --i) {
      const result = token.substr(0, i);
      if (CurrencyHelper.isValidString(result, fractionDigits)) {
        return result;
      }
    }

    return '';
  }

  static isDigit(symbol: string) {
    return /^\d$/.exec(symbol);
  }
}
