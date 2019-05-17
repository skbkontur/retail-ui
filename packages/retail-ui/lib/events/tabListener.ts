const KEYCODE_TAB = 9;
class TabListener {
  public isTabPressed: boolean = false;
  constructor() {
    window.addEventListener('keydown', event => {
      if (event.keyCode === KEYCODE_TAB) {
        setTimeout(() => {
          this.isTabPressed = true;
        }, 0);
      }
    });
    window.addEventListener('keyup', () => (this.isTabPressed = false), true);
  }
}

export default new TabListener();
