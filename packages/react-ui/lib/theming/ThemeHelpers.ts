import { isNonNullable } from '../utils';

import { Theme, ThemeIn } from './Theme';
import { isVersionGTE } from './ThemeVersionsComparator';

export type Marker = (theme: Readonly<Theme>) => Readonly<Theme>;
export type Markers = Marker[];

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

export const REACT_UI_THEME_MARKERS = {
  darkTheme: {
    key: '__IS_REACT_UI_DARK_THEME__',
    value: true,
  },
  theme2022: {
    key: '__IS_REACT_UI_THEME_2022__',
    value: true,
  },
  themeVersion: {
    key: '__REACT_UI_THEME_VERSION__',
    value: 0,
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

export const markThemeVersion: (version: string) => Marker = (version) => (theme) => {
  return Object.create(theme, {
    [REACT_UI_THEME_MARKERS.themeVersion.key]: {
      value: version,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const isThemeVersionGTE = (theme: Theme | ThemeIn, version: string): boolean => {
  // @ts-expect-error: internal value.
  const themeVersion = theme[REACT_UI_THEME_MARKERS.themeVersion.key] || '';
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

export function createThemeFromClass<T extends object, P extends object>(
  themeObject: T,
  options?: {
    prototypeTheme?: P;
    themeMarkers?: Markers;
  },
): T {
  const { prototypeTheme, themeMarkers = [] } = options || {};

  if (prototypeTheme) {
    Object.setPrototypeOf(themeObject, prototypeTheme);
  }

  const theme = applyMarkers(exposeGetters(themeObject), themeMarkers);

  return theme;
}
