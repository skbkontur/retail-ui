import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

kind('RadioGroup', () => {
  story('Vertical', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '#RadioGroup-wrap',
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('hovered', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }),
        })
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'hovered');
    });

    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('mouseLeave', async (context) => {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      await delay(500);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="RadioGroup"] > span > label' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="JustButton"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'mouseLeave');
    });

    test('tabPress', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="JustButton"]' }))
        .sendKeys(Key.TAB)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });

    test('arrow_down', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="JustButton"]' }))
        .sendKeys(Key.TAB)
        .pause(100)
        .sendKeys(Key.DOWN)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'arrow_down');
    });
  });

  story('RemoveBaselineSpacer', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '#RemoveBaselineSpacer-wrap',
    });

    test('defaultState', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'defaultState');
    });
  });
});
