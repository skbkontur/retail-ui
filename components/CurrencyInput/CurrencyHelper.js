// @flow

export default class CurrencyHelper {
  static thinsp = String.fromCharCode(0x2009);

  static format(value: ?number, fractionDigits?: ?number): string {
    if (value == null) {
      return '';
    }

    return CurrencyHelper.formatString(value.toString(), fractionDigits);
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

  static formatString(value: string, fractionDigits?: ?number): string {
    value = CurrencyHelper.unformatString(value);
    const [integer = '', fraction = ''] = value.split('.');

    if (fractionDigits == null) {
      fractionDigits = fraction.length;
    }

    if (fraction.length > fractionDigits) {
      throw new Error('Error');
    }

    const parts = [];

    const blockSize = 3;
    const start = (integer.length - 1) % blockSize - blockSize + 1;
    for (let i = start; i < integer.length; i += blockSize) {
      parts.push(integer.substring(Math.max(i, 0), i + blockSize));
    }

    let result = parts.join(CurrencyHelper.thinsp);

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
        return (
          dotsCount <= 1 &&
          integer.length <= 15 - fractionDigits &&
          fraction.length <= fractionDigits
        );
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
