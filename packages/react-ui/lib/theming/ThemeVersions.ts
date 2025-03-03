export type ThemeVersions = '5.0' | '5.1';
export interface ThemeVersionParsed {
  major: number;
  minor: number;
}

/**
 * Выделяет из строки вида '1.0' объект вида { major: number; minor: number; }
 * @param str Исходная строка
 * @param [separator="."] Строковый разделитель мажора и минора. По умолчанию "."
 * @returns Объект с числами или null, если исходная строка невалидна
 */
export const parseThemeVersion = (str: string, separator: string = '\\.'): ThemeVersionParsed | null => {
  const match = str.match(new RegExp(`(\\d+)${separator}(\\d+)`));
  const major = match?.[1];
  const minor = match?.[2];

  if (!major || !minor) {
    return null;
  }

  return {
    major: Number(major),
    minor: Number(minor),
  };
};

/**
 * Выделяет из названия темы объект c ее версией вида { major: number; minor: number; }
 * @param name Строка названия темы вида `LIGHT_THEME_1_0`
 * @returns Объект с числами или null, если исходная строка невалидна
 */
export const parseVersionFromThemeName = (name: string): ThemeVersionParsed | null => {
  return parseThemeVersion(name, '_');
};

/**
 * Сравнивает две версии темы вида "1.0" на "больше или равно"
 * @param v1 Сравниваемая версия
 * @param v2 Версия, с которой идет сравнение
 * @returns boolean-результат сравнения
 */
export const isThemeVersionGTE = (v1: ThemeVersions, v2: ThemeVersions): boolean => {
  const parsedV1 = parseThemeVersion(v1);
  const parsedV2 = parseThemeVersion(v2);

  if (!parsedV1 || !parsedV2) {
    return false;
  }

  if (parsedV1.major > parsedV2.major) {
    return true;
  } else if (parsedV1.major === parsedV2.major) {
    return parsedV1.minor >= parsedV2.minor;
  }

  return false;
};
