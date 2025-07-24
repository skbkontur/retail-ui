export type ThemeVersions = '5.0' | '5.1' | '5.2' | '5.3';
export interface ThemeVersionParsed {
  major: number;
  minor: number;
}

/**
 * Converts a string theme version to the object with numbers
 * @param str A string with version (e.g. "1.0")
 * @param [separator="."] Optional major and minor string separator. By default is "."
 * @returns An object of type { major: number; minor: number } or null, if the given string is invalid
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
 * Extracts a version from a theme name
 * @param name A string theme name (e.g. "LIGHT_THEME_1_0")
 * @returns An object of type { major: number; minor: number } or null, if the given string is invalid or contains no version
 */
export const parseVersionFromThemeName = (name: string): ThemeVersionParsed | null => {
  return parseThemeVersion(name, '_');
};

/**
 * Checks if one string theme version is "greater or equal" than another one
 * @param v1 The version being compared (e.g. "1.0")
 * @param v2 The version being compared to (e.g. "2.0")
 * @returns Boolean result
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
