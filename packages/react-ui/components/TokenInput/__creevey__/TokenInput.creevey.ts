import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('TokenInput', () => {
  story('EmptyWithReference', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.tokens-test-container',
      skip: {
        'do not pass on teamcity': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['clicked', 'withMenu'],
        },
      },
    });

    test('idle', async function () {
      await delay(100);
      await this.expect(await this.takeScreenshot()).to.matchImage('idle');
    });

    test('clicked', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
    });

    test('withMenu', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys('a')
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('withMenu');
    });
  });

  story('EmptyCombined', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flaky tests': { in: /firefox/ },
      },
    });

    test('selectFirst', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys('a')
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });
  });

  story('CombinedFilled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': { in: ['firefox2022', 'firefox2022Dark'], tests: ['editToken'] },
        flaky: { in: /firefox/, tests: ['selectAndType', 'editToken'] },
      },
    });

    test('selectAndType', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
        .perform();
      const selected = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('a')
        .perform();
      const typed = await this.takeScreenshot();
      await this.expect({ selected, typed }).to.matchImages();
    });

    test('editToken', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
        .perform();
      const doubleClickOnToken = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
        .perform();
      const clickOnMenuItem = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ENTER)
        .perform();
      const enterOnActiveToken = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('EDITED')
        .perform();
      const editToken = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ENTER)
        .perform();
      const enterAfterEdit = await this.takeScreenshot();
      await this.expect({
        doubleClickOnToken,
        clickOnMenuItem,
        enterOnActiveToken,
        editToken,
        enterAfterEdit,
      }).to.matchImages();
    });
  });

  story('CustomAddButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['addButton'],
        },
      },
    });

    test('addButton', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys('zzz')
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });
  });

  story('OnUnexpectedInputValidation', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flacky: {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['token select', 'token edit'],
        },
      },
    });

    test('token select', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .pause(1000)
        .sendKeys('aaa')
        .pause(1000)
        .move({ x: 0, y: 0 })
        .click()
        .pause(1000)
        .perform();
      const withNotSelectedToken = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys('aaaccc')
        .move({ x: 0, y: 0 })
        .click()
        .perform();
      const withAutoSelectedTokens = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .pause(1000)
        .sendKeys('clear')
        .move({ x: 0, y: 0 })
        .click()
        .perform();
      await delay(1000);
      const clearedOnNullReturn = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .clear();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys('aaa')
        .sendKeys(this.keys.ENTER)
        .pause(1000)
        .sendKeys('bbb')
        .sendKeys(this.keys.ENTER)
        .move({ x: 0, y: 0 })
        .click()
        .perform();
      const withSelectedTokens = await this.takeScreenshot();
      await this.expect({
        withNotSelectedToken,
        withAutoSelectedTokens,
        clearedOnNullReturn,
        withSelectedTokens,
      }).to.matchImages();
    });

    test('token edit', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .pause(300)
        .sendKeys('aaa')
        .pause(300)
        .sendKeys(this.keys.ENTER)
        .pause(300)
        .sendKeys('bbb')
        .pause(300)
        .sendKeys(this.keys.ENTER)
        .pause(300)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
        .pause(1000)
        .sendKeys('aaa')
        .pause(300)
        .move({ x: 0, y: 0 })
        .click()
        .pause(300)
        .perform();
      const withSameValue = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
        .pause(1000)
        .sendKeys('zzz')
        .pause(300)
        .move({ x: 0, y: 0 })
        .click()
        .pause(300)
        .perform();
      const withNotEditedToken = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
        .pause(1000)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys(this.keys.BACK_SPACE)
        .sendKeys('clear')
        .pause(300)
        .move({ x: 0, y: 0 })
        .click()
        .pause(300)
        .perform();
      const withRemovedToken = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
        .pause(1000)
        .sendKeys('EDITED')
        .pause(300)
        .sendKeys(this.keys.ARROW_DOWN)
        .sendKeys(this.keys.ENTER)
        .pause(300)
        .move({ x: 0, y: 0 })
        .click()
        .pause(300)
        .perform();
      const withEditedToken = await this.takeScreenshot();
      await this.expect({ withSameValue, withNotEditedToken, withRemovedToken, withEditedToken }).to.matchImages();
    });
  });

  story('FullWidthMenu', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['selectFirst'],
        },
      },
    });

    test('selectFirst', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys('a')
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });
  });

  story('CustomRenderTotalCount', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['renderTotalCount'],
        },
      },
    });

    test('renderTotalCount', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });
  });

  story('WithPlaceholderAndWidth', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /firefox/, tests: ['selected'] },
      },
    });
    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });

    test('selected', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .pause(500)
        .sendKeys('a')
        .perform();
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })

        .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });
  });
});
