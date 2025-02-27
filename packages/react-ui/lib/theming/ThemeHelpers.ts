import { Nullable } from '../../typings/utility-types';
import { isNonNullable } from '../utils';

import { Theme, ThemeIn } from './Theme';

export type Marker = (theme: Readonly<Theme>) => Readonly<Theme>;
export type Markers = Marker[];
export const ThemeVersionSeparator = '.' as const;
export type ThemeVersions = '5.0' | '5.1';
export type ThemeVersionType = `${bigint}${typeof ThemeVersionSeparator}${bigint}`;

export const exposeGetters = <T extends Record<string, any>>(theme: T): T => {
  const descriptors = Object.getOwnPropertyDescriptors(theme);
  Object.keys(descriptors).forEach((key) => {
    const descriptor = descriptors[key];
    if (typeof descriptor.get === 'function' && descriptor.configurable) {
      descriptor.enumerable = true;
      Object.defineProperty(theme, key, descriptor);
    }
  });
  return theme;
};

export const REACT_UI_THEME_MARKERS: {
  darkTheme: {
    key: string;
    value: true;
  };
  themeVersion: {
    key: string;
    value: ThemeVersionType;
  };
} = {
  darkTheme: {
    key: '__IS_REACT_UI_DARK_THEME__',
    value: true,
  },
  themeVersion: {
    key: '__REACT_UI_THEME_VERSION__',
    value: '0.0',
  },
};

// backward compatible
export const REACT_UI_DARK_THEME_KEY = REACT_UI_THEME_MARKERS.darkTheme.key;

export const isDarkTheme = (theme: Theme | ThemeIn): boolean => {
  // @ts-expect-error: internal value.
  return theme[REACT_UI_THEME_MARKERS.darkTheme.key] === REACT_UI_THEME_MARKERS.darkTheme.value;
};

export const markAsDarkTheme: Marker = (theme) => {
  return Object.create(theme, {
    [REACT_UI_THEME_MARKERS.darkTheme.key]: {
      value: REACT_UI_THEME_MARKERS.darkTheme.value,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const markThemeVersion: <T extends ThemeVersionType = ThemeVersions>(version: T) => Marker =
  (version) => (theme) => {
    return Object.create(theme, {
      [REACT_UI_THEME_MARKERS.themeVersion.key]: {
        value: version || REACT_UI_THEME_MARKERS.themeVersion.value,
        writable: false,
        enumerable: false,
        configurable: false,
      },
    });
  };

export const isThemeVersion = <T extends ThemeVersionType = ThemeVersions>(
  theme: Theme | ThemeIn,
  version: T,
): boolean => {
  const themeVersion: T | undefined =
    // @ts-expect-error: internal value.
    theme[REACT_UI_THEME_MARKERS.themeVersion.key];

  return isVersionGTE(themeVersion, version);
};

export function findPropertyDescriptor(theme: Theme, propName: string) {
  // TODO: Rewrite for loop.
  // TODO: Enable `no-param-reassign` rule.
  // eslint-disable-next-line no-param-reassign
  for (; isNonNullable(theme); theme = Object.getPrototypeOf(theme)) {
    if (Object.prototype.hasOwnProperty.call(theme, propName)) {
      return Object.getOwnPropertyDescriptor(theme, propName) || {};
    }
  }
  return {};
}

export function applyMarkers<T extends object>(theme: T, markers: Markers): T {
  return markers.reduce((markedTheme, marker) => {
    return marker(markedTheme);
  }, Object.create(theme));
}

export function createTheme(options: {
  themeClass: Theme;
  prototypeTheme?: Theme;
  themeMarkers?: Markers;
}): Readonly<Theme> {
  const { themeClass, prototypeTheme, themeMarkers = [] } = options;

  if (prototypeTheme) {
    Object.setPrototypeOf(themeClass, prototypeTheme);
  }

  const theme = applyMarkers(exposeGetters(themeClass), themeMarkers);

  return Object.freeze(theme);
}

export const isVersionGTE = (v1: Nullable<ThemeVersionType>, v2: Nullable<ThemeVersionType>): boolean => {
  if (!v1 || !v2) {
    return false;
  }

  const [majorV1, minorV1] = v1.split(ThemeVersionSeparator).map(Number);
  const [majorV2, minorV2] = v2.split(ThemeVersionSeparator).map(Number);

  if (majorV1 > majorV2) {
    return true;
  } else if (majorV1 === majorV2) {
    return minorV1 >= minorV2;
  }

  return false;
};
