import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

const simpleTests = () => {
  test('open side-page', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('open-side-page')).click();
    await context.matchImage(await context.takeScreenshot(), 'open side-page');
  });
};

const afterScrollingTest = () => {
  test('after scrolling', async (context) => {
    const page = context.webdriver;
    await page.evaluate(() => {
      const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
      sidepageContainer.scrollTop = 300;
    });
    await page.waitForTimeout(200);
    await context.matchImage(await context.takeScreenshot());
  });
};

kind('SidePage', () => {
  story('SidePageOverAnotherSidePageStory', () => {
    test('open internal side-page', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-side-page')).click();
      await page.locator(tid('SidePageBody__root') + ' button').click();
      await context.matchImage(await context.takeScreenshot(), 'open internal side-page');
    });

    test('close internal side-page', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-side-page')).click();
      await page.locator(tid('SidePageBody__root') + ' button').click();
      await page.locator('.react-ui:last-child [data-tid~="SidePageFooter__root"] button').click();
      await context.matchImage(await context.takeScreenshot(), 'close internal side-page');
    });
  });

  story('StickySidePageHeaderWhenAnotherSidePageStory', () => {
    test('sticky header, open and close internal side-page', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-side-page')).click();
      await page.locator(tid('SidePageBody__root') + ' button').click();
      await page.evaluate(() => {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]');
        if (sidepageContainer) {
          sidepageContainer.scrollTop = 3000;
        }
      });
      await page.locator('.react-ui:last-child [data-tid~="SidePageFooter__root"] button').click();
      await context.matchImage(await context.takeScreenshot(), 'sticky header, open and close internal side-page');
    });
  });

  story('Simple', () => {
    simpleTests();
  });

  story('MobileSimple', () => {
    simpleTests();
  });

  story('BodyWithoutFooter', () => {
    test('scroll to bottom', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-side-page')).click();
      await page.evaluate(() => {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        sidepageContainer.scrollTop = 3000;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'scroll to bottom');
    });
  });

  story('BodyWithoutHeader', () => {
    test('open side-page without header', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-side-page')).click();
      await page.waitForTimeout(100);
      await context.matchImage(await context.takeScreenshot(), 'open side-page without header');
    });
  });

  story('SidePageWithFocusLockWhenBackgroundBlocked', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'unstable tests in firefox2022': { in: /^(?!\b(chrome2022)\b)/ } },
      captureElement: null,
    });

    test('open side-page', async (context) => {
      const page = context.webdriver;
      const pressTab = async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(4000);
      };
      await page.locator(tid('open-side-page')).click();
      await page.waitForTimeout(1000);
      await pressTab();
      const firstTimeTabPress = await context.takeScreenshot();
      await pressTab();
      const secondTimeTabPress = await context.takeScreenshot();
      await pressTab();
      const thirdTimeTabPress = await context.takeScreenshot();
      await pressTab();
      const fourthTimeTabPress = await context.takeScreenshot();
      await context.matchImages({
        firstTimeTabPress,
        secondTimeTabPress,
        thirdTimeTabPress,
        fourthTimeTabPress,
      });
    });
  });

  story('TestUpdateLayoutMethodStory', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('Body content has been changed', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('toggle-body-content')).click();
      await context.matchImage(await context.takeScreenshot(), 'Body content has been changed');
    });

    test('child component content has been changed', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('toggle-child-component-content')).click();
      await context.matchImage(await context.takeScreenshot(), 'child component content has been changed');
    });

    test('update layout', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('toggle-child-component-content')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('update')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'update layout');
    });
  });

  story('WithLongTitleStory', () => {
    test('not fixed', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'not fixed');
    });

    test('fixed close element', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const sidePageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        const sidePageHeader = window.document.querySelector('[data-tid~="SidePageHeader__root"]') as HTMLElement;
        const fixedHeaderHeight = 50;
        sidePageContainer.scrollTop = (sidePageHeader.offsetHeight - fixedHeaderHeight) / 2;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'fixed close element');
    });

    test('fixed header', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const sidePageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        const sidePageHeader = window.document.querySelector('[data-tid~="SidePageHeader__root"]') as HTMLElement;
        const fixedHeaderHeight = 50;
        sidePageContainer.scrollTop = sidePageHeader.offsetHeight - fixedHeaderHeight;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'fixed header');
    });
  });

  story('SidePageWithChildrenFromOtherComponent', () => {
    test('without header, footer', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'without header, footer');
    });

    test('scroll to bottom without header, footer', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        sidepageContainer.scrollTop = 3000;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'scroll to bottom without header, footer');
    });

    test('with header, footer', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('SidePage__header-toggle')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('SidePage__footer-toggle')).click();
      await page.waitForTimeout(1000);
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'with header, footer');
    });

    test('scroll to bottom with header, footer', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('SidePage__header-toggle')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('SidePage__footer-toggle')).click();
      await page.evaluate(() => {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        sidepageContainer.scrollTop = 3000;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'scroll to bottom with header, footer');
    });

    test('with panel', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('SidePage__footer-toggle')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('SidePage__panel-toggle')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'with panel');
    });

    test('scroll to bottom with panel', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('SidePage__footer-toggle')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('SidePage__panel-toggle')).click();
      await page.evaluate(() => {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        sidepageContainer.scrollTop = 3000;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'scroll to bottom with panel');
    });
  });

  story('SidePageWithBlockBackground', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'unstable tests in firefox2022': { in: /^(?!\b(chrome2022)\b)/ } } });

    test('open side-page', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-side-page')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('SidePageChangeBlockBgAndIgnoreBgClick', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
      captureElement: 'body',
    });

    test('change sidepage mode to view to edit to view', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-side-page')).click();
      await page.waitForTimeout(100);
      const viewModeSidePage = await context.takeScreenshot();

      await page.locator(tid('SidePageFooter__root') + ' button').click();
      await page.waitForTimeout(100);
      const editModeSidePage = await context.takeScreenshot();

      await page.locator(tid('SidePageFooter__root') + ' button').click();
      await page.waitForTimeout(100);
      const againViewModeSidePage = await context.takeScreenshot();

      await page.waitForTimeout(100);
      await context.matchImages({ viewModeSidePage, editModeSidePage, againViewModeSidePage });
    });
  });

  story('NestedSidePagesWithChangingVeil', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
      captureElement: 'body',
    });

    test('idle', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-first-side-page')).click();
      await page.waitForTimeout(500);
      await page.locator(tid('open-second-side-page')).click();
      await page.waitForTimeout(500);
      await page.locator(tid('open-third-side-page')).click();
      await page.waitForTimeout(500);
      const thirdOpenedNoVeils = await context.takeScreenshot();

      await page.locator(tid('veil-first-from-third-side-page')).click();
      await page.waitForTimeout(500);
      const thirdOpenedWithFirstVeil = await context.takeScreenshot();

      await page.locator(tid('veil-second-from-third-side-page') + ' button').click();
      await page.waitForTimeout(500);
      const thirdOpenedWithFirstAndSecondVeils = await context.takeScreenshot();

      await page.locator(tid('veil-second-from-third-side-page') + ' button').click();
      await page.locator(tid('veil-third-from-third-side-page') + ' button').click();
      await page.waitForTimeout(500);
      const thirdOpenedWithFirstAndThirdVeils = await context.takeScreenshot();

      await page.locator(tid('close-third-side-page') + ' button').click();
      await page.waitForTimeout(500);
      const secondOpenedWithFirstVeilAndNoSecondVeil = await context.takeScreenshot();

      await context
        .expect({
          thirdOpenedNoVeils,
          thirdOpenedWithFirstVeil,
          thirdOpenedWithFirstAndSecondVeils,
          thirdOpenedWithFirstAndThirdVeils,
          secondOpenedWithFirstVeilAndNoSecondVeil,
        })
        .to.matchImages();
    });
  });

  story('DisableHeaderShrink', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: 'body',
    });

    afterScrollingTest();
  });

  story('WithNotCutTitleOnStuck', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: 'body',
    });

    afterScrollingTest();
  });
});
