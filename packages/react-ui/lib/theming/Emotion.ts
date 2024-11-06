import createEmotion, { Emotion } from '@emotion/css/create-instance';
import extraScopePlugin from 'stylis-plugin-extra-scope';
import { globalObject } from '@skbkontur/global-object';
import { createContext } from 'react';

import { Upgrade } from '../Upgrades';
import { AnyObject, FunctionWithParams } from '../utils';

import { Theme } from './Theme';

export const REACT_UI_PREFIX = Upgrade.getSpecificityClassName();

const scope = new Array(Upgrade.getSpecificityLevel()).fill(`.${REACT_UI_PREFIX}`).join('');

export const getEmotion = ({
  key = REACT_UI_PREFIX,
  container,
  nonce,
}: {
  container?: HTMLElement | null;
  key?: string;
  nonce?: string;
}): Emotion =>
  createEmotion({
    key,
    prepend: true,
    stylisPlugins: scope ? [extraScopePlugin(scope)] : undefined,
    container: container ?? globalObject.document?.head,
    nonce,
  });

// breaking changes
// todo убрать все экспорты, чтобы все компоненты управлялись через EmotionContext, пока оставили для обратной совместимости с icons/side-menu/Fias
export const { injectGlobal, cache, css, cx, keyframes, getRegisteredStyles, hydrate, sheet, merge, flush } =
  getEmotion({});

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

export const memoizeStyle = <S extends { [className: string]: (() => string) | ((t: Theme) => string) }>(
  styles: S,
): S => {
  Object.keys(styles).forEach((className) => (styles[className as keyof S] = memoize(styles[className]) as S[keyof S]));
  return styles;
};

export const prefix =
  (component: string, app = REACT_UI_PREFIX) =>
  <T extends Record<string, string>>(classes: T): T =>
    Object.keys(classes).reduce((acc, key) => {
      return { ...acc, [key]: `${app}-${component}-${classes[key]}` };
    }, {} as T);

export const EmotionContext = createContext<Emotion>(getEmotion({}));
export const EmotionConsumer = EmotionContext.Consumer;
export const EmotionProvider = EmotionContext.Provider;

EmotionContext.displayName = 'EmotionContext';
EmotionContext.__KONTUR_REACT_UI__ = 'EmotionContext';
