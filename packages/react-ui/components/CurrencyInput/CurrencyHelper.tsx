import { isNonNullable } from '../../lib/utils';
import { Nullable } from '../../typings/utility-types';
import { isSafari } from '../../lib/client';

import { DecimalOptions } from './CurrencyInputHelper';
import { CursorMap } from './CursorHelper';
import { MAX_ALLOWED_CHARS, MAX_SAFE_DIGITS } from './constants';

export interface DecimalFormattingOptions {
  fractionDigits?: Nullable<number>;
  hideTrailingZeros?: boolean;
  thousandsDelimiter?: string;
  minusSign?: string;
}

type DecimalFormattingOptionsInternal = Required<DecimalFormattingOptions>;

export interface FormattingInfo {
  raw: string;
  formatted: string;
  cursorMap: CursorMap;
}

export class CurrencyHelper {
  public static defaultOptions: DecimalFormattingOptionsInternal = {
    fractionDigits: null,
    hideTrailingZeros: false,
    thousandsDelimiter: String.fromCharCode(isSafari ? 0x0020 : 0x2009),
    minusSign: String.fromCharCode(0x2212),
  };

  public static getOptions(options?: Nullable<DecimalFormattingOptions>): DecimalFormattingOptionsInternal {
    return { ...CurrencyHelper.defaultOptions, ...options };
  }

  public static getInfo(value: string, options?: Nullable<DecimalFormattingOptions>): FormattingInfo {
    const raw = CurrencyHelper.unformatString(value);
    const formatted = CurrencyHelper.formatString(value, options);
    const cursorMap = CurrencyHelper.getCursorMap(formatted, options);

    return { raw, formatted, cursorMap };
  }

  public static getCursorMap(formatted: string, formattingOptions?: Nullable<DecimalFormattingOptions>): CursorMap {
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

  public static format(value: Nullable<number>, options?: Nullable<DecimalFormattingOptions>): string {
    if (!isNonNullable(value)) {
      return '';
    }

    return CurrencyHelper.formatString(value.toString(), options);
  }

  public static parse(value: string): Nullable<number> {
    const cleaned = CurrencyHelper.unformatString(value);
    if (!cleaned) {
      return null;
    }

    const destructed = CurrencyHelper.destructString(cleaned);
    if (!destructed) {
      return null;
    }

    const result =
      destructed.sign + (destructed.integer || '0') + (destructed.delimiter || '.') + (destructed.fraction || '0');

    return parseFloat(result);
  }

  public static unformatString(value: string): string {
    return value
      .replace(/\s/g, '')
      .replace(',', '.')
      .replace(/[\u2212\u002D\uFE63\uFF0D\u2012\u2013\u2014\u2015]/g, '-');
  }

  public static formatForClipboard(value: string): string {
    return CurrencyHelper.unformatString(value).replace('.', ',');
  }

  public static formatString(value: string, formattingOptions?: Nullable<DecimalFormattingOptions>): string {
    const options = CurrencyHelper.getOptions(formattingOptions);
    value = CurrencyHelper.unformatString(value);
    const destructed = CurrencyHelper.destructString(value) || { sign: '', integer: '', delimiter: '', fraction: '' };

    const { sign, integer, delimiter } = destructed;
    let fraction = destructed.fraction;
    let fractionDigits = fraction.length;

    if (options.hideTrailingZeros) {
      fraction = fraction.replace(/0+$/, '');
      fractionDigits = fraction.length;
    } else if (options.fractionDigits !== null) {
      fractionDigits = options.fractionDigits;
    }

    const parts = [];

    const blockSize = 3;
    const start = ((integer.length - 1) % blockSize) - blockSize + 1;
    for (let i = start; i < integer.length; i += blockSize) {
      parts.push(integer.substring(Math.max(i, 0), i + blockSize));
    }

    let result = parts.join(options.thousandsDelimiter);

    if (delimiter || fractionDigits) {
      result += ',';
      result += fraction.padEnd(Math.min(fractionDigits, MAX_SAFE_DIGITS), '0');
    }

    if (sign) {
      result = options.minusSign + result;
    }

    return result;
  }

  public static isValidString(value: string, options: DecimalOptions) {
    value = CurrencyHelper.unformatString(value);
    const destructed = CurrencyHelper.destructString(value);

    if (!destructed) {
      return false;
    }

    const { sign, integer, delimiter, fraction } = destructed;

    if (options.unsigned && sign) {
      return false;
    }

    if (options.fractionDigits === 0 && delimiter) {
      return false;
    }

    const integerDigits = integer === '0' ? 0 : integer.length;
    const fractionDigits = fraction.length;

    if (isNonNullable(options.integerDigits) && integerDigits > options.integerDigits) {
      return false;
    }

    if (!isNonNullable(options.integerDigits) && integerDigits > MAX_SAFE_DIGITS - (options.fractionDigits || 0)) {
      return false;
    }

    if (isNonNullable(options.fractionDigits) && fractionDigits > options.fractionDigits) {
      return false;
    }

    return integerDigits + fractionDigits <= MAX_SAFE_DIGITS;
  }

  public static extractValid(value: string, options: DecimalOptions): string {
    value = CurrencyHelper.unformatString(value);

    const match = /[-.\d]+/.exec(value);

    if (!match) {
      return '';
    }

    const token = match[0].substr(0, MAX_ALLOWED_CHARS);

    for (let i = token.length; i >= 0; --i) {
      const result = token.substr(0, i);
      if (CurrencyHelper.isValidString(result, options)) {
        return result;
      }
    }

    return '';
  }

  public static destructString(value: string) {
    const match = /^(-)?(\d*)?(\.)?(\d*)?$/.exec(value);
    if (!match) {
      return null;
    }
    const [, sign = '', integer = '', delimiter = '', fraction = ''] = match;
    return { sign, integer, delimiter, fraction };
  }
}
