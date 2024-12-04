import { isNonNullable } from '../utils';

import type { Theme, ThemeIn } from './Theme';

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

export const markAsTheme2022: Marker = (theme) => {
  return Object.create(theme, {
    [REACT_UI_THEME_MARKERS.theme2022.key]: {
      value: REACT_UI_THEME_MARKERS.theme2022.value,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const isTheme2022 = (theme: Theme | ThemeIn): boolean => {
  // @ts-expect-error: internal value.
  return theme[REACT_UI_THEME_MARKERS.theme2022.key] === REACT_UI_THEME_MARKERS.theme2022.value;
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

export function applyMarkers(theme: Readonly<Theme>, markers: Markers) {
  let markedTheme: Readonly<Theme> = theme;
  markers.forEach((marker) => {
    markedTheme = marker(theme);
  });
  return markedTheme;
}
