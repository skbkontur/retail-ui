import type { Theme as ReactUITheme } from '@skbkontur/react-ui/lib/theming/Theme';
import { isDarkTheme } from '@skbkontur/react-ui/lib/theming/ThemeHelpers';
import { isFunction } from '@skbkontur/react-ui/lib/utils';

import { memo } from '../utils/memo.js';
import { TableThemeInternal, isTableTheme, markAsTableTheme } from '../../internal/themes/TableLightTheme.js';
import { TableDarkThemeInternal } from '../../internal/themes/TableDarkTheme.js';

import type { TableTheme } from './ThemeTypes.js';

/**
 * Creates TableTheme out of ReactUI's Theme.
 *
 * Inserts Table vars in the theme, puts them over ReactUI's vars,
 * but respects these Table vars values that might have been specified in ReactUI's theme before that.
 *
 * This allows inserting Table vars in the theme on the fly
 * (without need for users to do it manually in their apps),
 * and using ReactUI's ThemeContext.Provider for overriding them.
 */
export const createTableTheme = (theme: ReactUITheme | TableTheme): TableTheme => {
  if (isTableTheme(theme)) {
    return theme as TableTheme;
  }

  const TableTheme = Object.create(
    theme,
    Object.assign(
      Object.getOwnPropertyDescriptors(TableThemeInternal),
      isDarkTheme(theme) ? Object.getOwnPropertyDescriptors(TableDarkThemeInternal) : {}
    )
  );

  for (const key of Object.keys(TableTheme)) {
    const descriptor = Object.getOwnPropertyDescriptor(TableTheme, key);
    Object.defineProperty(TableTheme, key, {
      get() {
        if (descriptor) {
          const { get, value } = descriptor;
          // eslint-disable-next-line @typescript-eslint/naming-convention
          // @ts-ignore
          return theme[key] || (isFunction(get) ? get.call(this) : value);
        }
      },
    });
  }

  return markAsTableTheme(TableTheme);
};

export const getTableTheme = memo((theme: ReactUITheme | TableTheme): TableTheme => {
  return createTableTheme(theme);
});

// eslint-disable-next-line @typescript-eslint/ban-types
function isZeroArgs<R, T extends (...args: any[]) => R>(fn: T | Function): fn is () => R {
  return fn.length === 0;
}

const memoize = <A extends object, R>(fn: (() => R) | ((arg: A) => R)): (() => R) | ((arg: A) => R) => {
  if (isZeroArgs(fn)) {
    let isCalled = false;
    let result: R;
    return () => {
      if (!isCalled) {
        isCalled = true;
        result = fn();
      }
      return result;
    };
  }

  const cache = new WeakMap();
  return (arg: A) => {
    if (!cache.has(arg)) {
      cache.set(arg, fn(arg));
    }
    return cache.get(arg);
  };
};

export const memoizeStyle = <S extends { [className: string]: (() => string) | ((t: TableTheme) => string) }>(
  styles: S
): S => {
  Object.keys(styles).forEach((className) => (styles[className as keyof S] = memoize(styles[className]) as S[keyof S]));
  return styles;
};

export const cssName = (className: string): string => `.${className}`;
