import { globalObject } from '@skbkontur/global-object';

import { isKeyArrow, isKeyTab } from './keyboard/identifiers';

class KeyListener {
  public isTabPressed = false;
  public isArrowPressed = false;
  constructor() {
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

export const keyListener = new KeyListener();
