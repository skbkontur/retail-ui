import { story, kind, test } from 'creevey';
import 'creevey/playwright';

kind('Modal/Mobile', () => {
  story('MobileModalDefaultWithHeaderAndFooterWithLongContent', () => {
    test('idle', async (context) => {
      const top = await context.takeScreenshot();

      const page = context.webdriver;
      await page.evaluate(() => {
        const modalContainer = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = (modalContent.scrollHeight - modalContainer.offsetHeight) / 2;
      });
      await page.waitForTimeout(500);
      const scrollToMiddle = await context.takeScreenshot();

      await page.evaluate(() => {
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await page.waitForTimeout(500);
      const scrollToBottom = await context.takeScreenshot();

      await context.matchImages({ top, scrollToMiddle, scrollToBottom });
    });
  });

  story('MobileModalDefaultWithStickyHeaderAndStickyFooterWithLongContent', () => {
    test('idle', async (context) => {
      const top = await context.takeScreenshot();

      const page = context.webdriver;
      await page.evaluate(() => {
        const modalContainer = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = (modalContent.scrollHeight - modalContainer.offsetHeight) / 2;
      });
      await page.waitForTimeout(500);
      const scrollToMiddle = await context.takeScreenshot();

      await page.evaluate(() => {
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await page.waitForTimeout(500);
      const scrollToBottom = await context.takeScreenshot();

      await context.matchImages({ top, scrollToMiddle, scrollToBottom });
    });
  });

  story('MobileModalTopWithLongContent', () => {
    test('idle', async (context) => {
      const top = await context.takeScreenshot();

      const page = context.webdriver;
      await page.evaluate(() => {
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await page.waitForTimeout(500);
      const scrollToBottom = await context.takeScreenshot();

      await context.matchImages({ top, scrollToBottom });
    });
  });

  story('MobileModalFullscreenWithStickyHeaderAndStickyFooterWithLongContent', () => {
    test('idle', async (context) => {
      const top = await context.takeScreenshot();

      const page = context.webdriver;
      await page.evaluate(() => {
        const modalContainer = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = (modalContent.scrollHeight - modalContainer.offsetHeight) / 2;
      });
      await page.waitForTimeout(500);
      const scrollToMiddle = await context.takeScreenshot();

      await page.evaluate(() => {
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await page.waitForTimeout(500);
      const scrollToBottom = await context.takeScreenshot();

      await context.matchImages({ top, scrollToMiddle, scrollToBottom });
    });
  });

  story('MobileModalAppearanceBug', () => {
    test('after scrolling', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const modalContainer = window.document.querySelector('.focus-lock-container') as HTMLElement;
        modalContainer.scrollTop = 1000;
      });
      await context.matchImage(await context.takeScreenshot(), 'after scrolling');
    });
  });
});
