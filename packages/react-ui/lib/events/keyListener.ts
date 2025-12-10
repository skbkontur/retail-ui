import { useMemo } from 'react';

import type { GlobalObject } from '../../lib/globalObject.js';
import { useGlobal } from '../renderEnvironment/index.js';

import { isKeyArrow, isKeyTab } from './keyboard/identifiers.js';

export class KeyListener {
  public isTabPressed = false;
  public isArrowPressed = false;
  constructor(globalObject: GlobalObject) {
    globalObject.addEventListener?.('keydown', (e) => {
      this.isTabPressed = isKeyTab(e);
      this.isArrowPressed = isKeyArrow(e);
    });
    globalObject.addEventListener?.('mousedown', () => {
      this.isTabPressed = false;
      this.isArrowPressed = false;
    });
  }
}

export function useKeyListener() {
  const globalObject = useGlobal();
  return useMemo(() => new KeyListener(globalObject), [globalObject]);
}
