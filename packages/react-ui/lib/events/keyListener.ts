import { isBrowser } from '../client';

import { isKeyArrow, isKeyTab } from './keyboard/identifiers';

class KeyListener {
  public isTabPressed = false;
  public isArrowPressed = false;
  constructor() {
    if (isBrowser) {
      window.addEventListener('keydown', (e) => {
        this.isTabPressed = isKeyTab(e);
        this.isArrowPressed = isKeyArrow(e);
      });
      window.addEventListener('mousedown', () => {
        this.isTabPressed = false;
        this.isArrowPressed = false;
      });
    }
  }
}

export const keyListener = new KeyListener();
