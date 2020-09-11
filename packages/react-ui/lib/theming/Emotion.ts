import createEmotion from 'create-emotion';
import extraScopePlugin from 'stylis-plugin-extra-scope';

import { Upgrade } from '../Upgrades';

import { Theme } from './Theme';

const PREFIX = 'react-ui';

const scope = new Array(Upgrade.getSpecificityLevel()).fill(`.${PREFIX}`).join('');

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = createEmotion({
  key: PREFIX,
  stylisPlugins: scope ? [extraScopePlugin(scope)] : undefined,
});

export const cssName = (className: string): string => `.${className}`;

function isZeroArgs<R, T extends (...args: any[]) => R>(fn: T | Function): fn is () => R {
  return fn.length == 0;
}

const memoize = <R>(
  fn: (() => R) | ((theme: Theme, ...args: any[]) => R),
): (() => R) | ((theme: Theme, ...args: any[]) => R) => {
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
  return (theme: Theme, ...args: any[]) => {
    if (!cache.has(theme)) cache.set(theme, new Map());
    const argsCache = cache.get(theme);
    const argsHash = JSON.stringify(args);
    if (!argsCache.get(argsHash)) {
      argsCache.set(argsHash, fn(theme, ...args));
    }
    return argsCache.get(argsHash);
  };
};

export const memoizeStyle = <
  S extends { [className: string]: (() => string) | ((t: Theme, ...args: any[]) => string) }
>(
  styles: S,
): S => {
  Object.keys(styles).forEach(className => (styles[className as keyof S] = memoize(styles[className]) as S[keyof S]));
  return styles;
};
