import type { Emotion } from '@emotion/css/create-instance';
import createEmotion from '@emotion/css/create-instance';
import extraScopePlugin from 'stylis-plugin-extra-scope';

import { Upgrade } from '../Upgrades.js';
import type { AnyObject, FunctionWithParams } from '../utils.js';

import type { Theme } from './Theme.js';

export const REACT_UI_PREFIX = Upgrade.getSpecificityClassName();

const scope = new Array(Upgrade.getSpecificityLevel()).fill(`.${REACT_UI_PREFIX}`).join('');

export const getEmotion = ({
  key = REACT_UI_PREFIX,
  container,
  nonce,
}: {
  container: HTMLElement;
  key?: string;
  nonce?: string;
}): Emotion =>
  createEmotion({
    key,
    prepend: true,
    stylisPlugins: scope ? [extraScopePlugin(scope)] : undefined,
    container,
    nonce,
  });

function isZeroArgs<R, T extends FunctionWithParams<R>>(fn: T | FunctionWithParams<R>): fn is () => R {
  return fn.length === 0;
}

const memoize = <A extends AnyObject, R>(fn: (() => R) | ((arg: A) => R)): (() => R) | ((arg: A) => R) => {
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

export interface StylesObject {
  [className: string]: (() => string) | ((t: Theme) => string);
}

export type StylesGetter<S> = (emotion: Emotion) => S;

export const memoizeStyle = <S extends StylesObject>(styles: S): S => {
  Object.keys(styles).forEach((className) => (styles[className as keyof S] = memoize(styles[className]) as S[keyof S]));
  return styles;
};

export const memoizeGetStyles = <S extends StylesObject>(getStyles: StylesGetter<S>): StylesGetter<S> => {
  const stylesCache = new WeakMap<Emotion, S>();
  return (emotion: Emotion): S => {
    if (!stylesCache.has(emotion)) {
      stylesCache.set(emotion, memoizeStyle(getStyles(emotion)));
    }

    return stylesCache.get(emotion) as S;
  };
};

export const prefix =
  (component: string, app = REACT_UI_PREFIX) =>
  <T extends Record<string, string>>(classes: T): T =>
    Object.keys(classes).reduce((acc, key) => {
      return { ...acc, [key]: `${app}-${component}-${classes[key]}` };
    }, {} as T);
