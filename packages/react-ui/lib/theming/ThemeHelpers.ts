import { Theme, ThemeIn } from './Theme';

export const exposeGetters = <T extends object>(theme: T): T => {
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

export const REACT_UI_FULL_THEME_KEY = '__IS_REACT_UI_THEME__';

export const REACT_UI_8PX_THEME_KEY = '__IS_REACT_UI_8PX_THEME__';

export const REACT_UI_FLAT_THEME_KEY = '__IS_REACT_UI_FLAT_THEME__';

export const isFullTheme = (theme: Theme | ThemeIn): boolean => {
  //@ts-ignore
  return theme[REACT_UI_FULL_THEME_KEY] === true;
};

export const markAsFullTheme = <T extends object>(theme: T): T => {
  return Object.create(theme, {
    [REACT_UI_FULL_THEME_KEY]: {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const is8pxTheme = (theme: Theme | ThemeIn): boolean => {
  //@ts-ignore
  return theme[REACT_UI_8PX_THEME_KEY] === true;
};

export const markAs8pxTheme = <T extends object>(theme: T): T => {
  return Object.create(theme, {
    [REACT_UI_8PX_THEME_KEY]: {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const isFlatTheme = (theme: Theme | ThemeIn): boolean => {
  //@ts-ignore
  return theme[REACT_UI_FLAT_THEME_KEY] === true;
};

export const markAsFlatTheme = <T extends object>(theme: T): T => {
  return Object.create(theme, {
    [REACT_UI_FLAT_THEME_KEY]: {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};
