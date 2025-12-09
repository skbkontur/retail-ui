import { story, kind, test } from 'creevey';

import { delay } from '../../delay.mjs';

kind('widgetToIframe', () => {
  story('ModalStory', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: 'body' });

    test('closes by pressing Esc', async (context) => {
      await delay(500);
      const iframeLocator = context.webdriver.locator('#test-element iframe');
      await iframeLocator.press('Escape');
      await delay(500);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('HintStory', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: 'body' });

    test('hover', async (context) => {
      await delay(500);
      const iframe = context.webdriver.frameLocator('#test-element iframe');
      await iframe.locator('#widgetRoot span').hover();
      await delay(500);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ScrollIsHiddenStory', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: 'body' });

    test('should hide scroll bar', async (context) => {
      await delay(500);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ToggleStory', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: 'body' });

    test('should focus by Tab', async (context) => {
      await delay(500);
      const iframeLocator = context.webdriver.locator('#test-element iframe');
      await iframeLocator.press('Tab');
      await delay(500);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ModalStackStory', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: 'body' });

    test('should remove highlighted numbers', async (context) => {
      await delay(500);
      const iframe = context.webdriver.frameLocator('#test-element iframe');
      await iframe.locator('#widgetRoot button').click();
      await iframe.locator("[data-tid='modal-container'] [data-tid='Button__rootElement']").click();
      await delay(500);
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
