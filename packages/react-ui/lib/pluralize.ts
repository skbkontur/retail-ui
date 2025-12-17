import { LangCodes } from './locale';

export function pluralize(
  langCode: LangCodes = LangCodes.ru_RU,
  count: number = 0,
  one: string = '',
  two: string = '',
  five: string = '',
): string {
  if (langCode !== LangCodes.ru_RU) {
    // Для нестандартных языков используем простое склонение
    return count === 1 ? one : five;
  }

  const absCount = Math.abs(count);
  const lastTwoDigits = absCount % 100;
  const lastDigit = absCount % 10;

  if (lastTwoDigits >= 5 && lastTwoDigits <= 20) {
    return five;
  }

  switch (lastDigit) {
    case 1:
      return one;
    case 2:
    case 3:
    case 4:
      return two;
    default:
      return five;
  }
}
