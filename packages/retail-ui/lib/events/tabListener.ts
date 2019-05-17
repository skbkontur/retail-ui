class TabListener {
  public isTabPressed: boolean = false;
  constructor() {
    window.addEventListener('keydown', event => {
      if (event.key === 'Tab') {
        setTimeout(() => {
          this.isTabPressed = true;
        }, 0);
      }
    });
    window.addEventListener('keyup', event => (this.isTabPressed = this.isTabPressed && event.key !== 'Tab'));
    window.addEventListener('focus', () => (this.isTabPressed = false), true);
  }
}

export default new TabListener();
