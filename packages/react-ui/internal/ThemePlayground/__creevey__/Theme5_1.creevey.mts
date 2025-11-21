import { kind, story, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../../components/__creevey__/helpers.mjs';

const kebabTests = () => {
  test('hovered', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Kebab__caption')).hover();
    await context.matchImage(await context.takeScreenshot(), 'hovered');
  });

  test('clicked', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Kebab__caption')).click();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('clickedOnButton2ndTime', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Kebab__caption')).click();
    await page.locator(tid('Kebab__caption')).click();
    await context.matchImage(await context.takeScreenshot(), 'clickedOnButton2ndTime');
  });

  test('tabPress', async (context) => {
    const page = context.webdriver;
    await page.keyboard.press('Tab');
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
  });

  test('enterPress', async (context) => {
    const page = context.webdriver;
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await context.matchImage(await context.takeScreenshot(), 'enterPress');
  });
};

kind('ThemeVersions/5_1', () => {
  story('Kebab_Small5_1', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Kebab_Medium5_1', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Kebab_Large5_1', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark', 'firefox2022'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('ModalWithStickyHeaderAndStickyFooter5_1', () => {
    test('idle', async (context) => {
      const page = context.webdriver;
      const idle = await context.takeScreenshot();
      await page.evaluate(function () {
        const modalContent = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await page.waitForTimeout(500);
      const scrollToBottom = await context.takeScreenshot();
      await context.matchImages({ idle, scrollToBottom });
    });
  });

  story('ModalWithStickyHeaderAndStickyFooterColored5_1', () => {
    test('idle', async (context) => {
      const page = context.webdriver;
      const idle = await context.takeScreenshot();
      await page.evaluate(function () {
        const modalContent = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await page.waitForTimeout(500);
      const scrollToBottom = await context.takeScreenshot();
      await context.matchImages({ idle, scrollToBottom });
    });
  });
});
