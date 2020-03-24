import createEmotion from 'create-emotion';
import extraScopePlugin from 'stylis-plugin-extra-scope';

import { Upgrade } from '../Upgrades';

import { Theme } from './Theme';

let memoCache = new WeakMap();

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

const memoize = <A extends object, R>(fn: (() => R) | ((arg: A) => R)): (() => R) | ((arg: A) => R) => {
  const getCache = (fn: (() => R) | ((arg: A) => R)) => {
    if (!memoCache.has(fn)) memoCache.set(fn, new WeakMap());
    return memoCache.get(fn);
  };
  const zeroArgsKey = Object.create(null);

  if (isZeroArgs(fn)) {
    return () => {
      const argCache = getCache(fn);
      const key = zeroArgsKey;

      if (!argCache.has(key)) argCache.set(key, fn());
      return argCache.get(key);
    };
  }

  return (arg: A) => {
    const argCache = getCache(fn);
    const key = arg;

    if (!argCache.has(key)) argCache.set(key, fn(arg));
    return argCache.get(key);
  };
};

export const memoizeStyle = <S extends { [className: string]: (() => string) | ((t: Theme) => string) }>(
  styles: S,
): S => {
  Object.keys(styles).forEach(className => (styles[className as keyof S] = memoize(styles[className]) as S[keyof S]));
  return styles;
};

export const clearCache = () => {
  flush();
  memoCache = new WeakMap();
};
