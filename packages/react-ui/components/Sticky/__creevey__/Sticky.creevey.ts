import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('Sticky', () => {
  story('WideContainer', () => {
    test('fixed', async function () {
      await this.browser.executeScript(function () {
        const stickyContent = window.document.querySelector('[data-tid="stickyContent"]') as HTMLElement;
        const nonStickyText = window.document.querySelector('[data-tid="nonStickyText"]') as HTMLElement;
        const scrollXOffset = nonStickyText.getBoundingClientRect().width / 2;
        const scrollYOffset = stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(scrollXOffset, scrollYOffset);
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
    });
  });

  story('Top', () => {
    test('top', async function () {
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('top');
    });

    test('fixed', async function () {
      await this.browser.executeScript(function () {
        const stickyStop = window.document.querySelector('[data-tid="stickyStop"]') as HTMLElement;
        const scrollOffset = stickyStop.getBoundingClientRect().top - window.innerHeight / 2;

        window.scrollTo(0, scrollOffset);
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
    });

    test('stoped', async function () {
      await this.browser.executeScript(function () {
        const stickyStop = window.document.querySelector('[data-tid="stickyStop"]') as HTMLElement;
        stickyStop.scrollIntoView();
      });
      await this.browser.executeScript(function () {
        const stickyContent = window.document.querySelector('[data-tid="stickyContent"]') as HTMLElement;
        const scrollOffset = pageYOffset - stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(0, scrollOffset);
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('stoped');
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

    test('bottom', async function () {
      await this.browser.executeScript(function () {
        window.scrollTo(0, 9999);
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('bottom');
    });

    test('fixed', async function () {
      await this.browser.executeScript(function () {
        const sticky = window.document.querySelector('[data-comp-name~="Sticky"]') as HTMLElement;
        const scrollOffset = sticky.getBoundingClientRect().top - window.innerHeight;

        window.scrollTo(0, scrollOffset);
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
    });

    test('stoped', async function () {
      await this.browser.executeScript(function () {
        const stickyStop = window.document.querySelector('[data-tid="stickyStop"]') as HTMLElement;
        stickyStop.scrollIntoView(false);
      });
      await this.browser.executeScript(function () {
        const stickyContent = window.document.querySelector('[data-tid="stickyContent"]') as HTMLElement;
        const scrollOffset = pageYOffset + stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(0, scrollOffset);
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
    });
  });
});
