import { story, kind, test } from 'creevey';

const linkTests = () => {
  test('idle', async function () {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  });

  test('hover', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hover');
  });
};

kind('Link', () => {
  story('Simple', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
      },
    });

    linkTests();
  });

  story('WithIcon', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
      },
    });

    linkTests();
  });

  story('Danger', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
      },
    });

    linkTests();
  });

  story('Grayed', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
      },
    });

    linkTests();
  });

  story('Disabled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
      },
    });

    linkTests();
  });

  story('Loading', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
      },
    });

    linkTests();
  });
});
