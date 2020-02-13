import { isKeyTab } from './keyboard/identifiers';

class TabListener {
  public isTabPressed = false;
  constructor() {
    window.addEventListener('keydown', e => (this.isTabPressed = isKeyTab(e)));
    window.addEventListener('mousedown', () => (this.isTabPressed = false));
  }
}

export const tabListener = new TabListener();
