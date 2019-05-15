class TabListener {
  public isTabPressed: boolean = false;
  constructor() {
    window.addEventListener('keydown', event => (this.isTabPressed = event.key === 'Tab'));
    window.addEventListener('keyup', event => (this.isTabPressed = this.isTabPressed && event.key !== 'Tab'));
    window.addEventListener('mousedown', () => (this.isTabPressed = false));
  }
}

export default new TabListener();
