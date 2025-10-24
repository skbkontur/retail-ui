import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

kind('Sticky', () => {
  story('WideContainer', () => {
    test('fixed', async (context) => {
      await context.webdriver.executeScript(function () {
        const stickyContent = window.document.querySelector('[data-tid="stickyContent"]') as HTMLElement;
        const nonStickyText = window.document.querySelector('[data-tid="nonStickyText"]') as HTMLElement;
        const scrollXOffset = nonStickyText.getBoundingClientRect().width / 2;
        const scrollYOffset = stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(scrollXOffset, scrollYOffset);
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'fixed');
    });
  });

  story('Top', () => {
    test('top', async (context) => {
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'top');
    });

    test('fixed', async (context) => {
      await context.webdriver.executeScript(function () {
        const stickyStop = window.document.querySelector('[data-tid="stickyStop"]') as HTMLElement;
        const scrollOffset = stickyStop.getBoundingClientRect().top - window.innerHeight / 2;

        window.scrollTo(0, scrollOffset);
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'fixed');
    });

    test('stoped', async (context) => {
      await context.webdriver.executeScript(function () {
        const stickyStop = window.document.querySelector('[data-tid="stickyStop"]') as HTMLElement;
        stickyStop.scrollIntoView();
      });
      await context.webdriver.executeScript(function () {
        const stickyContent = window.document.querySelector('[data-tid="stickyContent"]') as HTMLElement;
        const scrollOffset = pageYOffset - stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(0, scrollOffset);
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'stoped');
    });
  });

  story('Bottom', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flacky stopped position': {
          in: ['firefox', 'firefox8px', 'firefoxDark'],
          tests: 'stoped',
        },
      },
    });

    test('bottom', async (context) => {
      await context.webdriver.executeScript(function () {
        window.scrollTo(0, 9999);
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'bottom');
    });

    test('fixed', async (context) => {
      await context.webdriver.executeScript(function () {
        const sticky = window.document.querySelector('[data-tid~="Sticky__root"]') as HTMLElement;
        const scrollOffset = sticky.getBoundingClientRect().top - window.innerHeight;

        window.scrollTo(0, scrollOffset);
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'fixed');
    });

    test('stoped', async (context) => {
      await context.webdriver.executeScript(function () {
        const stickyStop = window.document.querySelector('[data-tid="stickyStop"]') as HTMLElement;
        stickyStop.scrollIntoView(false);
      });
      await context.webdriver.executeScript(function () {
        const stickyContent = window.document.querySelector('[data-tid="stickyContent"]') as HTMLElement;
        const scrollOffset = pageYOffset + stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(0, scrollOffset);
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'fixed');
    });
  });
});
