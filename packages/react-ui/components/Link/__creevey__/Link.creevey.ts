import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const focusedLinkTest = () => {
  test('tab press', async function () {
    await this.browser
      .actions({
        async: undefined,
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
    await this.browser
      .actions({
        async: undefined,
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPressHovered');
  });
};
const linkTests = () => {
  test('idle', async function () {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  });

  test('hover', async function () {
    await this.browser
      .actions({
        async: undefined,
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hover');
  });
};

const focusedStyledLinkTest = () => {
  test('tab press', async function () {
    await this.browser
      .actions({
        async: undefined,
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
    await this.browser
      .actions({
        async: undefined,
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await this.browser
      .actions({
        async: undefined,
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPressHovered');
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
        'story-skip-1': { in: /^(?!\b(chrome|firefox)(2022)*(Dark)*\b)/, tests: ['tab press'] },
      },
    });

    linkTests();
    focusedLinkTest();
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

  story('FocusedStyledLink', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { flacky: { in: /^(?!\b(firefox2022)\b)/ } } });

    focusedStyledLinkTest();
  });

  story('WithLinkFocusOutlineFeatureFlag', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work': {
          in: /chrome/,
        },
      },
    });

    focusedStyledLinkTest();
  });
});
