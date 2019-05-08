class TabListener {
  public isTabPressed: boolean = false;
  constructor() {
    window.addEventListener('keydown', event => (this.isTabPressed = event.key === 'Tab'));
    window.addEventListener('keyup', event => (this.isTabPressed = this.isTabPressed && event.key !== 'Tab'));
  }
}

export default new TabListener();
