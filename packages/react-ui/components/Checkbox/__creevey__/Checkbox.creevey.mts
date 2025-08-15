import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

const checkboxTests = () => {
  test('idle', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'idle');
  });

  test('hovered', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({
          css: '[data-tid~="test-checkbox"]',
        }),
      })
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'hovered');
  });

  test('pressed', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({
          css: '[data-tid~="test-checkbox"]',
        }),
      })
      .press()
      .pause(1000)
      .release()
      .perform();
  });

  test('clicked', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="test-checkbox"]' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('tabPress', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="test-checkbox"]' }))
      .perform();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({ origin: context.webdriver.findElement({ css: 'body' }) })
      .press()
      .release()
      .sendKeys(Key.TAB)
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
  });

  test('spacePress', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="test-checkbox"]' }))
      .perform();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({ origin: context.webdriver.findElement({ css: 'body' }) })
      .press()
      .release()
      .sendKeys(Key.TAB)
      .pause(1000)
      .sendKeys(Key.SPACE)
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'spacePress');
  });
};

kind('Checkbox', () => {
  story('Plain', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'pressed', 'clicked'],
        },
        flaky: {
          in: /^\bfirefox2022/,
          tests: ['clicked'],
        },
      },
    });

    checkboxTests();
  });

  story('Checked', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('hovered', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-tid~="test-checkbox"]',
          }),
        })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hovered');
    });

    test('pressed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-tid~="test-checkbox"]',
          }),
        })
        .press()
        .pause(1000)
        .release()
        .perform();
    });
  });

  story('Indeterminate', () => {
    test('plain', async (context) => {
      const element = await context.webdriver.findElement({
        css: '#screenshot-capture',
      });
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'plain');
    });

    test('hovered', async (context) => {
      const element = await context.webdriver.findElement({
        css: '#screenshot-capture',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: 'label' }),
        })
        .perform();
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'hovered');
    });

    test('tabPress', async (context) => {
      const element = await context.webdriver.findElement({
        css: '#screenshot-capture',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'tabPress');
    });

    test('clicked', async (context) => {
      const element = await context.webdriver.findElement({
        css: '#screenshot-capture',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'label' }))
        .perform();
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'clicked');
    });
  });

  story('Highlighted', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: ['firefox2022', 'firefox2022Dark'],
          tests: ['tabPress'],
        },
      },
    });
    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('tabPress', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });
  });

  story('CheckboxLabelSelectionWithPressedShift', () => {
    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('selected with pressed shift', async (context) => {
      const checkbox = await context.webdriver.findElement({
        css: '[data-comp-name~="Checkbox"]',
      });
      await context.webdriver.actions({ bridge: true }).keyDown(Key.SHIFT).click(checkbox).perform();
      await context.matchImage(await context.takeScreenshot(), 'selected with pressed shift');
      await context.webdriver.actions({ bridge: true }).keyUp(Key.SHIFT).perform();
    });
  });
});
