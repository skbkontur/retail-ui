import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';

kind('Dropdown', () => {
  story('SimpleDropdown', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    test('idle', async (context) => {
      const element = await context.webdriver.findElement({ css: '.dropdown-test-container' });
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'idle');
    });

    test('clicked', async (context) => {
      const element = await context.webdriver.findElement({ css: '.dropdown-test-container' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'clicked');
    });

    test('MenuItem hover', async (context) => {
      const element = await context.webdriver.findElement({ css: '.dropdown-test-container' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: '[data-comp-name~="MenuItem"]' }),
        })
        .perform();
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'MenuItem hover');
    });

    test('selected item', async (context) => {
      const element = await context.webdriver.findElement({ css: '.dropdown-test-container' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="MenuItem"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'selected item');
    });
  });

  story('WithMenuItemIcon', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.dropdown-test-container' });

    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });

  story('InsideScrollableContainer', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.dropdown-test-container' });

    test('scrolled', async (context) => {
      await context.webdriver
        .actions()
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      const opened = await context.takeScreenshot();
      await context.webdriver.executeScript(function () {
        const scrollContainer = window.document.querySelector('.dropdown-test-container') as HTMLElement;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      const scrolled = await context.takeScreenshot();
      await context.matchImages({ opened, scrolled });
    });
  });

  story('WithCustomSelectTheme', () => {
    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened top with portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top with portal');
    });

    test('opened bottom with portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom with portal');
    });

    test('opened top without portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="portal"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top without portal');
    });

    test('opened bottom without portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="portal"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Dropdown"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom without portal');
    });
  });

  story('Size', () => {
    test('clicked all', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="open-all"]' }))
        .pause(500)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'ClickedAll');
    });
  });
});
