import { SerializedStyles, EmotionCache, StyleSheet } from '@emotion/utils';
import warning from 'warning';

import { Constructor } from '../../typings/utility-types';

import { createCache } from './Emotion';
import { DEFAULT_THEME_HASH, Theme } from './Theme';

export type EmotionCacheExtra = EmotionCache & {
  // method `insert()` is not described in types
  insert: (selector: string, serialized: SerializedStyles, sheet: StyleSheet, shouldCache: boolean) => void;
};

type Storage<S> = {
  theme: Theme;
  emotionCache: EmotionCacheExtra;
  jsStylesOfComponents: Map<string, S>;
};

type ComponentTech = {
  __KONTUR_REACT_UI__: string;
};

const themeCache = new Map();
const HASH_KEY = '__REACT_UI_THEME_HASH__';

export function setCache(theme: Theme, hash: string) {
  Object.defineProperty(theme, HASH_KEY, {
    value: hash,
    writable: false,
    enumerable: false,
    configurable: false,
  });
  if (!themeCache.has(hash)) {
    themeCache.set(hash, {
      theme: theme,
      emotionCache: createCache(hash),
      jsStylesOfComponents: new Map(),
    });
  }
}

export function deleteCache(hash: string) {
  themeCache.delete(hash);
}

export function setJsStyles<C extends ComponentTech, S>(component: C, styles: Constructor<S>, hash: string): void {
  warning(component !== undefined, `Perhaps you are using the component until the module is finished loading.`);

  const storage: Storage<S> = themeCache.get(hash)!;
  const { jsStylesOfComponents, emotionCache, theme } = storage;

  if (!jsStylesOfComponents.has(component.__KONTUR_REACT_UI__)) {
    jsStylesOfComponents.set(component.__KONTUR_REACT_UI__, new styles(emotionCache, theme));
  }
}

export function getJsStyles<C extends ComponentTech, S>(component: C, styles: Constructor<S>, theme?: any): S {
  const hash = theme ? theme[HASH_KEY] : DEFAULT_THEME_HASH;
  setJsStyles(component, styles, hash);

  return themeCache.get(hash)!.jsStylesOfComponents.get(component.__KONTUR_REACT_UI__);
}
