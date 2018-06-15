
import type { CursorMap } from './CursorHelper';

export type DecimalFormattingOptions = {
  fractionDigits?: ?number,
  thousandsDelimiter?: string,
  minusSign?: string
};

type DecimalFormattingOptionsInternal = {
  fractionDigits: ?number,
  thousandsDelimiter: string,
  minusSign: string
};

export type FormattingInfo = {
  raw: string,
  formatted: string,
  cursorMap: CursorMap
};

export default class CurrencyHelper {
  static defaultOptions: DecimalFormattingOptionsInternal = {
    fractionDigits: null,
    thousandsDelimiter: String.fromCharCode(0x2009),
    minusSign: String.fromCharCode(0x2212)
  };

  static getOptions(
    options?: ?DecimalFormattingOptions
  ): DecimalFormattingOptionsInternal {
    return { ...CurrencyHelper.defaultOptions, ...options };
  }

  static getInfo(
    value: string,
    options?: ?DecimalFormattingOptions
  ): FormattingInfo {
    const raw = CurrencyHelper.unformatString(value);
    const formatted = CurrencyHelper.formatString(value, options);
    const cursorMap = CurrencyHelper.getCursorMap(formatted, options);

    return { raw, formatted, cursorMap };
  }

  static getCursorMap(
    formatted: string,
    formattingOptions?: ?DecimalFormattingOptions
  ): CursorMap {
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

    const destructed = CurrencyHelper.destructString(cleaned);
    if (!destructed) {
      return null;
    }

    const result =
      destructed.sign +
      (destructed.integer || '0') +
      (destructed.delimiter || '.') +
      (destructed.fraction || '0');

    return parseFloat(result);
  }

  static unformatString(value: string): string {
    return value
      .replace(/\s/g, '')
      .replace(',', '.')
      .replace(/[\u2212\u002D\uFE63\uFF0D\u2012\u2013\u2014\u2015]/g, '-');
  }

  static formatForClipboard(value: string): string {
    return CurrencyHelper.unformatString(value).replace('.', ',');
  }

  static formatString(
    value: string,
    formattingOptions?: ?DecimalFormattingOptions
  ): string {
    const options = CurrencyHelper.getOptions(formattingOptions);
    value = CurrencyHelper.unformatString(value);
    const destructed = CurrencyHelper.destructString(value);

    if (!destructed) {
      throw new Error('Error');
    }

    const { sign, integer, delimiter, fraction } = destructed;

    const fractionDigits =
      options.fractionDigits == null ? fraction.length : options.fractionDigits;

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

    if (delimiter || fractionDigits) {
      result += ',';
    }

    if (fractionDigits) {
      result += fraction.padEnd(fractionDigits, '0');
    }

    if (sign) {
      result = options.minusSign + result;
    }

    return result;
  }

  static isValidString(
    value: string,
    fractionDigits: ?number,
    unsigned: ?boolean
  ) {
    value = CurrencyHelper.unformatString(value);
    const destructed = CurrencyHelper.destructString(value);

    if (!destructed) {
      return false;
    }

    const { sign, integer, delimiter, fraction } = destructed;

    if (integer.length + fraction.length > 15) {
      return false;
    }

    if (unsigned && sign) {
      return false;
    }

    switch (fractionDigits) {
      case null:
      case undefined:
        return true;
      case 0:
        return !delimiter;
      default:
        return (
          fraction.length <= fractionDigits &&
          integer.length <= 15 - fractionDigits
        );
    }
  }

  static extractValid(
    value: string,
    fractionDigits: ?number,
    unsigned: ?boolean
  ): string {
    value = CurrencyHelper.unformatString(value);

    const special = [
      unsigned ? '' : '-',
      fractionDigits === 0 ? '' : '\\.'
    ].join('');

    const regexp = new RegExp(`[${special}\\d]+`);
    const match = regexp.exec(value);

    if (!match) {
      return '';
    }

    const token = match[0].substr(0, 17);

    for (let i = token.length; i >= 0; --i) {
      const result = token.substr(0, i);
      if (CurrencyHelper.isValidString(result, fractionDigits, unsigned)) {
        return result;
      }
    }

    return '';
  }

  static destructString(value: string) {
    const match = /^(-)?(\d*)?(\.)?(\d*)?$/.exec(value);
    if (!match) {
      return null;
    }
    const [_, sign = '', integer = '', delimiter = '', fraction = ''] = match;
    return { sign, integer, delimiter, fraction };
  }
}
