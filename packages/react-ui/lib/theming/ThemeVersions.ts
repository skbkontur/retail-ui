export type ThemeVersions = '5.0' | '5.1';
export interface ThemeVersionParsed {
  major: number;
  minor: number;
}

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

export const parseVersionFromThemeName = (name: string): ThemeVersionParsed | null => {
  return parseThemeVersion(name, '_');
};

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
