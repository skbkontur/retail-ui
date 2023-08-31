import { globalThat } from '../globalThat';
import { isBrowser } from '../client';

import { isKeyArrow, isKeyTab } from './keyboard/identifiers';

class KeyListener {
  public isTabPressed = false;
  public isArrowPressed = false;
  constructor() {
    if (isBrowser) {
      globalThat.addEventListener('keydown', (e) => {
        this.isTabPressed = isKeyTab(e);
        this.isArrowPressed = isKeyArrow(e);
      });
      globalThat.addEventListener('mousedown', () => {
        this.isTabPressed = false;
        this.isArrowPressed = false;
      });
    }
  }
}

export const keyListener = new KeyListener();
