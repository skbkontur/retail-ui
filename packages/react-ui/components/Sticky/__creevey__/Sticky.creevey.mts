import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid, waitForAnimationFrame } from '../../__creevey__/helpers.mjs';

kind('Sticky', () => {
  story('WideContainer', () => {
    test('fixed', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const stickyContent = window.document.querySelector('[data-tid="stickyContent"]');
        const nonStickyText = window.document.querySelector('[data-tid="nonStickyText"]');

        const scrollXOffset = (nonStickyText?.getBoundingClientRect()?.width ?? 0) / 2;
        const scrollYOffset = (stickyContent?.getBoundingClientRect()?.height ?? 0) / 2;

        window.scrollTo(scrollXOffset, scrollYOffset);
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'fixed');
    });
  });

  story('Top', () => {
    test('top', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'top');
    });

    test('fixed', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const stickyStop = window.document.querySelector('[data-tid="stickyStop"]') as HTMLElement;
        const scrollOffset = (stickyStop?.getBoundingClientRect()?.y ?? 0) - window.innerHeight / 2;

        window.scrollTo(0, scrollOffset);
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'fixed');
    });

    test('stoped', async (context) => {
      const page = context.webdriver;
      const stickyStop = page.locator(tid('stickyStop'));
      await stickyStop.waitFor();
      await stickyStop.evaluate((element: HTMLElement) => element.scrollIntoView());
      await page.waitForTimeout(500);
      const stickyContent = page.locator(tid('stickyContent'));
      await stickyContent.waitFor();
      await stickyContent.evaluate((element: HTMLElement) => {
        const scrollOffset = window.pageYOffset - element.getBoundingClientRect().height / 2;
        window.scrollTo(0, scrollOffset);
      });
      // Ждем завершения скролла и стабилизации позиции
      await page.waitForTimeout(500);
      await waitForAnimationFrame(page);
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'stoped');
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
      const page = context.webdriver;
      await page.evaluate(() => {
        window.scrollTo(0, 9999);
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'bottom');
    });

    test('fixed', async (context) => {
      const page = context.webdriver;
      const stickyRoot = page.locator(tid('Sticky__root'));
      await stickyRoot.waitFor();
      await stickyRoot.evaluate((element: HTMLElement) => {
        const scrollOffset = element.getBoundingClientRect().top - window.innerHeight;
        window.scrollTo(0, scrollOffset);
      });
      // Ждем завершения скролла и стабилизации позиции
      // В Firefox может потребоваться больше времени для стабилизации
      await page.waitForTimeout(1000);
      await waitForAnimationFrame(page);
      await page.waitForTimeout(500);
      // Дополнительная проверка стабильности скролла для Firefox
      await page.evaluate(() => {
        return new Promise<void>((resolve) => {
          let lastScroll = window.pageYOffset;
          let stableFrames = 0;
          const checkStable = () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll === lastScroll) {
              stableFrames++;
              if (stableFrames >= 3) {
                resolve();
              } else {
                requestAnimationFrame(checkStable);
              }
            } else {
              lastScroll = currentScroll;
              stableFrames = 0;
              requestAnimationFrame(checkStable);
            }
          };
          // Ждем несколько кадров после скролла
          requestAnimationFrame(() => {
            requestAnimationFrame(checkStable);
          });
        });
      });
      await page.waitForTimeout(300);
      await context.matchImage(await context.takeScreenshot(), 'fixed');
    });

    test('stoped', async (context) => {
      const page = context.webdriver;
      const stickyStop = page.locator(tid('stickyStop'));
      await stickyStop.waitFor();
      await stickyStop.evaluate((element: HTMLElement) => element.scrollIntoView(false));
      await page.waitForTimeout(500);
      const stickyContent = page.locator(tid('stickyContent'));
      await stickyContent.waitFor();
      await stickyContent.evaluate((element: HTMLElement) => {
        const scrollOffset = window.pageYOffset + element.getBoundingClientRect().height / 2;
        window.scrollTo(0, scrollOffset);
      });
      // Ждем завершения скролла и стабилизации позиции
      await page.waitForTimeout(500);
      await waitForAnimationFrame(page);
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'fixed');
    });
  });
});
