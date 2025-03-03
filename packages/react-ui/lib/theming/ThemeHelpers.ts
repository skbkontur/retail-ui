import warning from 'warning';

import { Nullable } from '../../typings/utility-types';
import { isNonNullable } from '../utils';

import { Theme, ThemeIn } from './Theme';
import { isThemeVersionGTE, ThemeVersions } from './ThemeVersions';

export type Marker = (theme: Theme) => Theme;
export type Markers = Marker[];

/**
 * Делает все вычисляемые переменные в теме (геттеры) видимыми для Object.keys(theme)
 * @param theme Объект темы
 * @returns Исходный объект темы с enumerable геттерами
 */
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

/**
 * Помечает тему как "темную"
 * @param theme Объект темы
 * @returns Объект темы с меткой темной темы
 */
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

/**
 * Создает функцию, которая проставляет версию темы
 * @param version Версия темы
 * @returns Функция, принимающая тему, которой будет проставлена переданная версия
 */
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

/**
 * Сравнивает версию темы с переданной версией на "больше или равно"
 * @param theme Объект темы, версию которой нужно сравнить
 * @param version Строка версии, с которой нужно провести сравнение
 * @returns boolean-результат сравнения
 */
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

/**
 * Находит дескриптор свойства в объекте темы по имени
 * @param theme Объект темы
 * @param propName Имя свойства
 * @returns Найденный дескриптор или пустой объект
 */
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

/**
 * Помечает тему переданными маркерами
 * @param theme Объект темы
 * @param markers Массив маркеров
 * @returns Исходная тема, помеченная маркерами
 */
export function applyMarkers(theme: Theme, markers: Markers): Theme {
  return markers.reduce((markedTheme, marker) => {
    return marker(markedTheme);
  }, Object.create(theme));
}

/**
 * Создает объект темы из класса с переменными
 * @param options Объект с опциями
 * @param options.themeClass Класс с переменными
 * @param [options.prototypeTheme] Прототип темы, на основе которого будет создана новая тема
 * @param [options.themeMarkers] Объект маркеров, которыми будет помечена новая тема
 * @returns Объект созданной темы
 */
export function createTheme(options: { themeClass: Theme; prototypeTheme?: Theme; themeMarkers?: Markers }): Theme {
  const { themeClass, prototypeTheme, themeMarkers = [] } = options;

  if (prototypeTheme) {
    Object.setPrototypeOf(themeClass, prototypeTheme);
  }

  const theme = applyMarkers(exposeGetters(themeClass), themeMarkers);

  return Object.freeze(theme);
}
