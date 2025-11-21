import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid, waitForPopup } from '../../__creevey__/helpers.mjs';

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

    test('idle', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(100);
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TokenInput__root')).click();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('withMenu', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TokenInput__root')).click();
      await page.keyboard.type('a');
      await context.matchImage(await context.takeScreenshot(), 'withMenu');
    });
  });

  story('EmptyCombined', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flaky tests': { in: /firefox/ },
      },
    });

    test('selectFirst', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TokenInput__root')).click();
      await page.keyboard.type('a');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('CombinedFilled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': { in: ['firefox2022', 'firefox2022Dark'], tests: ['editToken'] },
        flaky: { in: /firefox/, tests: ['selectAndType', 'editToken'] },
      },
    });

    test('selectAndType', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Token__root')).first().click();
      const selected = await context.takeScreenshot();
      await page.keyboard.type('a');
      await page.waitForTimeout(300);
      await page.mouse.move(0, 0);
      const typed = await context.takeScreenshot();
      await context.matchImages({ selected, typed });
    });

    test('editToken', async (context) => {
      const page = context.webdriver;
      const firstToken = page.locator(tid('Token__root')).first();
      await firstToken.waitFor();
      await firstToken.dblclick();
      await waitForPopup(page);
      await page.waitForTimeout(500);
      const doubleClickOnToken = await context.takeScreenshot();

      const menuItem = page.locator('[data-tid~="ComboBoxMenu__item"]').first();
      await menuItem.waitFor();
      await menuItem.click();
      await page.waitForTimeout(500);
      const clickOnMenuItem = await context.takeScreenshot();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      const enterOnActiveToken = await context.takeScreenshot();

      await page.keyboard.type('EDITED');
      await page.waitForTimeout(300);
      const editToken = await context.takeScreenshot();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      const enterAfterEdit = await context.takeScreenshot();
      await context.matchImages({
        doubleClickOnToken,
        clickOnMenuItem,
        enterOnActiveToken,
        editToken,
        enterAfterEdit,
      });
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

    test('addButton', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TokenInput__root')).click();
      await page.keyboard.type('zzz');
      await context.matchImage(await context.takeScreenshot());
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

    test('token select', async (context) => {
      const page = context.webdriver;
      const tokenInput = page.locator(tid('TokenInput__root'));
      await tokenInput.click();
      await waitForPopup(page);
      await page.waitForTimeout(300);
      await page.keyboard.type('aaa');
      await page.waitForTimeout(300);
      await page.locator('body').click();
      await page.waitForTimeout(500);
      const withNotSelectedToken = await context.takeScreenshot();

      await tokenInput.click();
      await waitForPopup(page);
      await page.waitForTimeout(300);
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(300);
      await page.keyboard.type('aaaccc');
      await page.waitForTimeout(300);
      await page.locator('body').click();
      await page.waitForTimeout(500);
      const withAutoSelectedTokens = await context.takeScreenshot();

      await tokenInput.click();
      await waitForPopup(page);
      await page.waitForTimeout(300);
      await page.keyboard.type('clear');
      await page.waitForTimeout(300);
      await page.locator('body').click();
      await page.waitForTimeout(500);
      const clearedOnNullReturn = await context.takeScreenshot();

      await tokenInput.click();
      await waitForPopup(page);
      await page.waitForTimeout(300);
      await page.keyboard.type('clear');
      await page.waitForTimeout(300);
      await tokenInput.click();
      await waitForPopup(page);
      await page.waitForTimeout(300);
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(300);
      await page.keyboard.type('aaa');
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await page.keyboard.type('bbb');
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await page.locator('body').click();
      await page.waitForTimeout(500);
      const withSelectedTokens = await context.takeScreenshot();

      await context.matchImages({
        withNotSelectedToken,
        withAutoSelectedTokens,
        clearedOnNullReturn,
        withSelectedTokens,
      });
    });

    test('token edit', async (context) => {
      const page = context.webdriver;
      const tokenInput = page.locator(tid('TokenInput__root'));
      await tokenInput.click();
      await waitForPopup(page);
      await page.waitForTimeout(300);
      await page.keyboard.type('aaa');
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await page.keyboard.type('bbb');
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);

      const firstToken = page.locator(tid('Token__root')).first();
      await firstToken.waitFor();
      await firstToken.dblclick();
      await waitForPopup(page);
      await page.waitForTimeout(500);
      await page.keyboard.type('aaa');
      await page.waitForTimeout(300);
      await page.locator('body').click();
      await page.waitForTimeout(500);
      const withSameValue = await context.takeScreenshot();

      await firstToken.dblclick();
      await waitForPopup(page);
      await page.waitForTimeout(500);
      await page.keyboard.type('zzz');
      await page.waitForTimeout(300);
      await page.locator('body').click();
      await page.waitForTimeout(500);
      const withNotEditedToken = await context.takeScreenshot();

      await firstToken.dblclick();
      await waitForPopup(page);
      await page.waitForTimeout(500);
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(300);
      await page.keyboard.type('clear');
      await page.waitForTimeout(300);
      await page.locator('body').click();
      await page.waitForTimeout(500);
      const withRemovedToken = await context.takeScreenshot();

      await firstToken.dblclick();
      await waitForPopup(page);
      await page.waitForTimeout(500);
      await page.keyboard.type('EDITED');
      await page.waitForTimeout(300);
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await page.locator('body').click();
      await page.waitForTimeout(500);
      const withEditedToken = await context.takeScreenshot();

      await context.matchImages({ withSameValue, withNotEditedToken, withRemovedToken, withEditedToken });
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

    test('selectFirst', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TokenInput__root')).click();
      await page.keyboard.type('a');
      await context.matchImage(await context.takeScreenshot());
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

    test('renderTotalCount', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TokenInput__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('WithPlaceholderAndWidth', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /firefox/, tests: ['selected'] },
      },
    });
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot());
    });

    test('selected', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TokenInput__root')).click();
      await waitForPopup(page);
      await page.keyboard.type('a');
      await page.waitForTimeout(1000);
      await page.locator('[data-tid~="Menu__root"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('Size', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '[data-tid="Gapped__vertical"]',
    });

    test('MenuItem inherits size', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      const tab1 = await context.takeScreenshot();

      await page.keyboard.press('Tab');
      const tab2 = await context.takeScreenshot();

      await page.keyboard.press('Tab');
      const tab3 = await context.takeScreenshot();

      await context.matchImages({ tab1, tab2, tab3 });
    });
  });

  story('VariousMenuPositions', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'chrome only': { in: /^(?!\bchrome2022\b)/ } },
    });

    test('all positions in viewport', async (context) => {
      async function clickOnTokenInput(tid: string): Promise<Buffer> {
        const page = context.webdriver;
        await page.locator(`[data-tid~="${tid}"]`).click();
        await page.waitForTimeout(800);
        return await context.takeScreenshot();
      }

      const leftTop = await clickOnTokenInput('TokenInputViewLeftTop');
      const leftMiddle = await clickOnTokenInput('TokenInputViewLeftMiddle');
      const leftBottom = await clickOnTokenInput('TokenInputViewLeftBottom');
      const rightTop = await clickOnTokenInput('TokenInputViewRightTop');
      const rightMiddle = await clickOnTokenInput('TokenInputViewRightMiddle');
      const rightBottom = await clickOnTokenInput('TokenInputViewRightBottom');

      await context.matchImages({ leftTop, leftMiddle, leftBottom, rightTop, rightMiddle, rightBottom });
    });
  });
});
