import createCacheEmotion from '@emotion/cache';
import { CacheProvider, css as cssFromCache } from '@emotion/core';
import createEmotion from 'create-emotion';
import extraScopePlugin from 'stylis-plugin-extra-scope';

import { Upgrade } from '../Upgrades';

import { Theme } from './Theme';
import { EmotionCacheExtra } from './ThemeCache';

const PREFIX = 'react-ui';

const scope = new Array(Upgrade.getSpecificityLevel()).fill(`.${PREFIX}`).join('');

const createCache = (themeHash: string) => createCacheEmotion({ key: `${PREFIX}-${themeHash}` });

export { cssFromCache, createCache, CacheProvider };
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

export const cssName = (className: any): string => `.${className}`;

function isZeroArgs<R, T extends (...args: any[]) => R>(fn: T | Function): fn is () => R {
  return fn.length == 0;
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
    if (!cache.has(arg)) cache.set(arg, fn(arg));
    return cache.get(arg);
  };
};

export const memoizeStyle = <S extends { [className: string]: (() => string) | ((t: Theme) => string) }>(
  styles: S,
): S => {
  Object.keys(styles).forEach(className => (styles[className as keyof S] = memoize(styles[className]) as S[keyof S]));
  return styles;
};

export class GrandStyles {
  css(...args: any[]) {
    const serializedStyles = cssFromCache(...args);
    const className = `${this.cache.key}-${serializedStyles.name}`;
    if (this.cache.inserted[serializedStyles.name] === undefined) {
      this.cache.insert(cssName(className), serializedStyles, this.cache.sheet, true);
    }
    return className;
  }

  constructor(protected readonly cache: EmotionCacheExtra, protected readonly theme: Theme) {}
}
