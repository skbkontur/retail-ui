import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

kind('Modal/Mobile', () => {
  story('MobileModalDefaultWithHeaderAndFooterWithLongContent', () => {
    test('idle', async (context) => {
      const top = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        const modalContainer = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = (modalContent.scrollHeight - modalContainer.offsetHeight) / 2;
      });
      await delay(500);
      const scrollToMiddle = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await delay(500);
      const scrollToBottom = await context.webdriver.takeScreenshot();

      await context.matchImages({ top, scrollToMiddle, scrollToBottom });
    });
  });

  story('MobileModalDefaultWithStickyHeaderAndStickyFooterWithLongContent', () => {
    test('idle', async (context) => {
      const top = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        const modalContainer = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = (modalContent.scrollHeight - modalContainer.offsetHeight) / 2;
      });
      await delay(500);
      const scrollToMiddle = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await delay(500);
      const scrollToBottom = await context.webdriver.takeScreenshot();

      await context.matchImages({ top, scrollToMiddle, scrollToBottom });
    });
  });

  story('MobileModalTopWithLongContent', () => {
    test('idle', async (context) => {
      const top = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await delay(500);
      const scrollToBottom = await context.webdriver.takeScreenshot();

      await context.matchImages({ top, scrollToBottom });
    });
  });

  story('MobileModalFullscreenWithStickyHeaderAndStickyFooterWithLongContent', () => {
    test('idle', async (context) => {
      const top = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        const modalContainer = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = (modalContent.scrollHeight - modalContainer.offsetHeight) / 2;
      });
      await delay(500);
      const scrollToMiddle = await context.webdriver.takeScreenshot();

      await context.webdriver.executeScript(function () {
        const modalContent = document.querySelector('.focus-lock-container') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await delay(500);
      const scrollToBottom = await context.webdriver.takeScreenshot();

      await context.matchImages({ top, scrollToMiddle, scrollToBottom });
    });
  });
});
