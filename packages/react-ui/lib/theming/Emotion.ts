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

const memoize = <A extends object, R>(fn: (() => R) | ((arg: A) => R)): (() => R) | ((arg: A) => R) => {
  const zeroArgsKey = Object.create(null);
  return (arg: A) => {
    if (!memoCache.has(fn)) memoCache.set(fn, new WeakMap());
    const argCache = memoCache.get(fn);
    const key = arg || zeroArgsKey;

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
