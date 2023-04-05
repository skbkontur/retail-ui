describe('Button', () => {
  const buttonTests = () => {
    it('idle', async function () {
      await this.browser.assertView('idle', '#test-element');
    });

    hermione.skip.in(['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], 'hover');
    hermione.skip.in(['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], 'flacky');
    it('hover', async function () {
      await this.browser.$('[data-tid~="test-button"]').moveTo();
      await this.browser.assertView('hover', '#test-element');
    });

    hermione.skip.in(['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], 'flacky');
    it('pressed', async function () {
      await this.browser.$('[data-tid~="test-button"]').click({ skipRelease: true });
      await this.browser.assertView('pressed', '#test-element');
    });

    hermione.skip.in(['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], 'flacky');
    it('clicked', async function () {
      await this.browser.$('[data-tid~="test-button"]').click();
      await this.browser.assertView('clicked', '#test-element');
    });

    hermione.skip.in(
      ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark'],
      'focus goes out of page and breaks other tests',
    );
    it('tabPress', async function () {
      await this.browser.keys('Tab');
      await this.browser.assertView('tabPress', '#test-element');
    });
  };

  describe('Playground Default', () => {
    beforeEach(async ({ browser }) => {
      const storyId = 'button--playground-default';
      const url = await browser.getUrl(); // FIXME
      if (new URL(url).searchParams.get('id') === storyId) {
        await browser.refresh();
      } else {
        await browser.selectStory(storyId);
      }
    });

    buttonTests();
  });

  describe('Playground Disabled', () => {
    beforeEach(async ({ browser }) => {
      const storyId = 'button--playground-disabled';
      const url = await browser.getUrl(); // FIXME
      if (new URL(url).searchParams.get('id') === storyId) {
        await browser.refresh();
      } else {
        await browser.selectStory(storyId);
      }
    });

    buttonTests();
  });
});
