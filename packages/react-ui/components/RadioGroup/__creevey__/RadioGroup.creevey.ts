import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('RadioGroup', () => {
  story('Vertical', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '#RadioGroup-wrap',
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Dark'], tests: 'hovered' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hovered', 'clicked'] },
      },
    });

    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('hovered', async function () {
      await this.browser
        .actions({
          async: undefined,
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }),
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
    });

    test('clicked', async function () {
      await this.browser
        .actions({
          async: undefined,
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
    });

    test('mouseLeave', async function () {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      await delay(500);
      await this.browser
        .actions({
          async: undefined,
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }))
        .perform();
      await this.browser
        .actions({
          async: undefined,
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="JustButton"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('mouseLeave');
    });

    test('tabPress', async function () {
      await this.browser
        .actions({
          async: undefined,
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="JustButton"]' }))
        .sendKeys(this.keys.TAB)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
    });

    test('arrow_down', async function () {
      await this.browser
        .actions({
          async: undefined,
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="JustButton"]' }))
        .sendKeys(this.keys.TAB)
        .pause(100)
        .sendKeys(this.keys.DOWN)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('arrow_down');
    });
  });
});
