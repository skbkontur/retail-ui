import createEmotion from '@emotion/css/create-instance';
import extraScopePlugin from 'stylis-plugin-extra-scope';

import { Upgrade } from '../Upgrades';

import { Theme } from './Theme';

const PREFIX = 'react-ui';

const scope = new Array(Upgrade.getSpecificityLevel()).fill(`.${PREFIX}`).join('');

export const { flush, hydrate, cx, merge, getRegisteredStyles, injectGlobal, keyframes, css, sheet, cache } =
  createEmotion({
    key: PREFIX,
    stylisPlugins: scope ? [extraScopePlugin(scope)] : undefined,
  });

export const cssName = (className: string): string => `.${className}`;

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
  Object.keys(styles).forEach((className) => (styles[className as keyof S] = memoize(styles[className]) as S[keyof S]));
  return styles;
};
