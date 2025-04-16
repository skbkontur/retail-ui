import { kind, story, test } from 'creevey';

import { delay } from '../../../lib/delay';

kind('ThemeVersions/5_1', () => {
  story('ModalWithStickyHeaderAndStickyFooter5_1', () => {
    test('idle', async (context) => {
      const idle = await context.webdriver.takeScreenshot();
      await context.webdriver.executeScript(function () {
        const modalContent = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await delay(500);
      const scrollToBottom = await context.webdriver.takeScreenshot();
      await context.matchImages({ idle, scrollToBottom });
    });
  });

  story('ModalWithStickyHeaderAndStickyFooterColored5_1', () => {
    test('idle', async (context) => {
      const idle = await context.webdriver.takeScreenshot();
      await context.webdriver.executeScript(function () {
        const modalContent = document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        modalContent.scrollTop = modalContent.scrollHeight;
      });
      await delay(500);
      const scrollToBottom = await context.webdriver.takeScreenshot();
      await context.matchImages({ idle, scrollToBottom });
    });
  });
});
