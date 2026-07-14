import { useMemo } from 'react';

import type { GlobalObject } from '../../lib/globalObject.js';
import { useGlobal } from '../renderEnvironment/index.js';
import { isKeyArrow, isKeyTab } from './keyboard/identifiers.js';

const cache = new WeakMap<object, KeyListener>();

export class KeyListener {
  public isTabPressed = false;
  public isArrowPressed = false;
  constructor(globalObject: GlobalObject) {
    const instance = cache.get(globalObject);

    if (instance !== undefined) {
      return instance;
    }

    globalObject.addEventListener?.('keydown', (e) => {
      this.isTabPressed = isKeyTab(e);
      this.isArrowPressed = isKeyArrow(e);
    });
    globalObject.addEventListener?.('mousedown', () => {
      this.isTabPressed = false;
      this.isArrowPressed = false;
    });
    cache.set(globalObject, this);
  }
}

export function useKeyListener(): KeyListener {
  const globalObject = useGlobal();
  return useMemo(() => new KeyListener(globalObject), [globalObject]);
}
