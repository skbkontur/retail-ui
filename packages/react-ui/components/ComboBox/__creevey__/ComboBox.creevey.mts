import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

const multilineTest = () => {
  test('plain', async (context) => {
    const page = context.webdriver;
    const plain = await context.takeScreenshot();
    await page.locator(tid('ComboBoxView__root')).click();
    await page.waitForTimeout(1000);
    const opened = await context.takeScreenshot();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    const closed = await context.takeScreenshot();

    await page.locator('body').click();
    await page.waitForTimeout(1000);
    const blur = await context.takeScreenshot();

    await page.locator(tid('ComboBoxView__root')).hover();
    await page.waitForTimeout(1000);
    await page.locator(tid('Input__clearCross')).click();
    await page.waitForTimeout(1000);
    await page.locator('body').click();
    await page.waitForTimeout(1000);
    const cleared = await context.takeScreenshot();

    await page.waitForTimeout(1000);
    await context.matchImages({ plain, opened, closed, blur, cleared });
  });
};

kind('ComboBox', () => {
  story('SimpleComboboxStory', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
        flacky: {
          in: ['chrome2022Dark'],
          tests: ['select'],
        },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('hovered', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.locator(tid('ComboBoxMenu__item') + ':nth-of-type(4)').hover();
      await context.matchImage(await context.takeScreenshot(), 'hovered');
    });

    test('selected', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.locator(tid('ComboBoxMenu__item') + ':nth-of-type(4)').hover();
      await page.locator(tid('ComboBoxMenu__item') + ':nth-of-type(4)').click();
      await context.matchImage(await context.takeScreenshot(), 'selected');
    });

    test('search result', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.keyboard.type('Second');
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'search result');
    });

    test('selcted', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.keyboard.type('Second');
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await context.matchImage(await context.takeScreenshot(), 'selcted');
    });

    test('opened again', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.keyboard.type('Second');
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.locator(tid('Input__root')).click();
      await context.matchImage(await context.takeScreenshot(), 'opened again');
    });

    test('search result_0', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.keyboard.type('Такого точно нету');
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'search result_0');
    });

    test('select', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.waitForTimeout(300);
      // Ждем появления меню и стабилизации
      await page.locator(tid('ComboBoxMenu__item')).first().waitFor();
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      // Ждем стабилизации выделения
      await page.waitForTimeout(300);
      await context.matchImage(await context.takeScreenshot(), 'select');
    });

    test('submit', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.waitForTimeout(1000);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await context.matchImage(await context.takeScreenshot(), 'submit');
    });

    test('select_1', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('InputLikeText__root')).click();
      await page.waitForTimeout(500);
      await page.keyboard.type('Second');
      await page.waitForTimeout(500);
      await page.locator('body').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'select_1');
    });

    test('selected_2', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('InputLikeText__root')).click();
      await page.waitForTimeout(1000);
      await page.keyboard.type('Second');
      await page.waitForTimeout(500);
      await page.locator('body').click();
      await page.waitForTimeout(1000);
      await page.locator(tid('InputLikeText__root')).click();
      await context.matchImage(await context.takeScreenshot(), 'selected_2');
    });
  });

  story('OpenToTop', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    test('plain', async (context) => {
      const page = context.webdriver;
      const element = page.locator('[data-tid="container"]');
      await context.matchImage(await element.screenshot(), 'plain');
    });

    test('opened', async (context) => {
      const page = context.webdriver;
      const element = page.locator('[data-tid="container"]');
      await page.locator(tid('InputLikeText__root')).click();
      await context.matchImage(await element.screenshot(), 'opened');
    });

    test('hovered', async (context) => {
      const page = context.webdriver;
      const element = page.locator('[data-tid="container"]');
      await page.locator(tid('InputLikeText__root')).click();
      await page.locator(tid('ComboBoxMenu__item') + ':nth-of-type(4)').hover();
      await context.matchImage(await element.screenshot(), 'hovered');
    });

    test('selected', async (context) => {
      const page = context.webdriver;
      const element = page.locator('[data-tid="container"]');
      await page.locator(tid('InputLikeText__root')).click();
      await page.locator(tid('ComboBoxMenu__item') + ':nth-of-type(4)').hover();
      await page.locator(tid('ComboBoxMenu__item') + ':nth-of-type(4)').click();
      await context.matchImage(await element.screenshot(), 'selected');
    });
  });

  story('AlwaysReject', () => {
    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('ToogleError', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['plain again', 'with error'],
        },
      },
    });

    test('plain', async (context) => {
      const page = context.webdriver;
      await page.locator("[data-tid~='Toggle__root']").waitFor();
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('with error', async (context) => {
      const page = context.webdriver;
      await page.locator("[data-tid~='Toggle__root']").click();
      await page.waitForTimeout(200);
      await context.matchImage(await context.takeScreenshot(), 'with error');
    });

    test('plain again', async (context) => {
      const page = context.webdriver;
      await page.locator("[data-tid~='Toggle__root']").click();
      await page.waitForTimeout(200);
      await page.locator("[data-tid~='Toggle__root']").click();
      await page.waitForTimeout(200);
      await context.matchImage(await context.takeScreenshot(), 'plain again');
    });
  });

  story('WithExternalValue', () => {
    test('initial value', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'initial value');
    });

    test('reset value', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid="resetBtn"]').click();
      await context.matchImage(await context.takeScreenshot(), 'reset value');
    });

    test('set value', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid="resetBtn"]').click();
      await page.locator('[data-tid="setValueBtn"]').click();
      await context.matchImage(await context.takeScreenshot(), 'set value');
    });
  });

  story('FocusFlow', () => {
    test('before', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'before');
    });

    test('after Enter on Item', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Enter');
      await context.matchImage(await context.takeScreenshot(), 'after Enter on Item');
    });

    test('after tab to the next field', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await context.matchImage(await context.takeScreenshot(), 'after tab to the next field');
    });
  });

  story('WithTooltip', () => {
    test('show and hide Tooltip', async (context) => {
      const page = context.webdriver;
      const body = page.locator('body');
      await page.locator('[data-tid="InputLikeText__input"]').click();
      await page.waitForTimeout(1000);
      const showTooltip = await body.screenshot();
      await body.click();
      await page.waitForTimeout(1000);
      const hideTooltip = await body.screenshot();
      await context.matchImages({ showTooltip, hideTooltip });
    });
  });

  story('MobileSimple', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('ComboBoxView__root')).first().click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });

    test('opened top with portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top with portal');
    });

    test('opened bottom with portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('pos')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('InputLikeText__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom with portal');
    });

    test('opened top without portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('portal')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('InputLikeText__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top without portal');
    });

    test('opened bottom without portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('portal')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('pos')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('InputLikeText__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom without portal');
    });
  });

  story('Size', () => {
    test('clicked all', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid="open-all"]').click();
      await page.waitForTimeout(500);
      await page.evaluate(() => {
        const containers = document.querySelectorAll('[data-tid~="ScrollContainer__inner"]');
        for (let i = 0; i < containers.length; i++) {
          containers[i].scrollTop += 300;
        }
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'ClickedAll');
    });
  });

  story('MultilineComboboxStory', () => {
    multilineTest();
  });

  story('MultilineEditingComboboxStory', () => {
    multilineTest();
  });
});
