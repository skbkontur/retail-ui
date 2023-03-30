describe('button', () => {
  const buttonTests = () => {
    it('hover', async function () {
      await this.browser.$('[data-tid~="test-button"]').moveTo();
      await this.browser.assertView('hover', '#test-element');
    });

    it('pressed', async function () {
      await this.browser.$('[data-tid~="test-button"]').click({ skipRelease: true });
      await this.browser.assertView('pressed', '#test-element');
    });

    it('clicked', async function () {
      await this.browser.$('[data-tid~="test-button"]').click();
      await this.browser.assertView('pressed', '#test-element');
    });

    it('tabPress', async function () {
      await this.browser.keys('Tab');
      await this.browser.assertView('tabPress', '#test-element');
    });
  };

  describe('playground-default', () => {
    beforeEach(async ({ browser }) => {
      await browser.selectStory('button--playground-default');
    });

    buttonTests();
  });

  describe('playground-disabled', () => {
    beforeEach(async ({ browser }) => {
      await browser.selectStory('button--playground-disabled');
    });

    buttonTests();
  });
});
