const TAB = 9;
class TabListener {
  public isTabPressed: boolean = false;
  constructor() {
    window.addEventListener('keydown', event => (this.isTabPressed = event.keyCode === TAB));
    window.addEventListener('keyup', () => (this.isTabPressed = false), true);
  }
}

export default new TabListener();
