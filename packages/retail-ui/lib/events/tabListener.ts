import Keyboard from './keyboard/Keyboard';

class TabListener {
  public isTabPressed: boolean = false;
  constructor() {
    window.addEventListener('keydown', e => (this.isTabPressed = Keyboard.isKeyTab(e)));
    window.addEventListener('mousedown', () => (this.isTabPressed = false));
  }
}

export default new TabListener();
