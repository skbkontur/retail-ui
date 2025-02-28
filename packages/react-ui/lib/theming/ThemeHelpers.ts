import warning from 'warning';

import { Nullable } from '../../typings/utility-types';
import { isNonNullable } from '../utils';

import { Theme, ThemeIn } from './Theme';
import { isThemeVersionGTE, ThemeVersions } from './ThemeVersions';

export type Marker = (theme: Theme) => Theme;
export type Markers = Marker[];

export const exposeGetters = (theme: Theme): Theme => {
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
    value: ThemeVersions | null;
  };
} = {
  darkTheme: {
    key: '__IS_REACT_UI_DARK_THEME__',
    value: true,
  },
  themeVersion: {
    key: '__REACT_UI_THEME_VERSION__',
    value: null,
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

export const markThemeVersion: (version: ThemeVersions) => Marker = (version) => (theme) => {
  return Object.create(theme, {
    [REACT_UI_THEME_MARKERS.themeVersion.key]: {
      value: version || REACT_UI_THEME_MARKERS.themeVersion.value,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const isThemeGTE = (theme: Theme | ThemeIn, version: ThemeVersions): boolean => {
  const themeVersion: Nullable<ThemeVersions> =
    // @ts-expect-error: internal value.
    theme[REACT_UI_THEME_MARKERS.themeVersion.key];

  if (!themeVersion) {
    warning(true, `[ThemeHelpers]: The theme doesn't have a version. Checking for ${version}.`);
    return false;
  }

  return isThemeVersionGTE(themeVersion, version);
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

export function applyMarkers(theme: Theme, markers: Markers): Theme {
  return markers.reduce((markedTheme, marker) => {
    return marker(markedTheme);
  }, Object.create(theme));
}

export function createTheme(options: { themeClass: Theme; prototypeTheme?: Theme; themeMarkers?: Markers }): Theme {
  const { themeClass, prototypeTheme, themeMarkers = [] } = options;

  if (prototypeTheme) {
    Object.setPrototypeOf(themeClass, prototypeTheme);
  }

  const theme = applyMarkers(exposeGetters(themeClass), themeMarkers);

  return Object.freeze(theme);
}
