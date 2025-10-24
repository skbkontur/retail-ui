import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

const simpleTests = () => {
  test('open side-page', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
      .perform();
    await context.matchImage(await context.webdriver.takeScreenshot(), 'open side-page');
  });
};

const afterScrollingTest = () => {
  test('after scrolling', async (context) => {
    await context.webdriver.executeScript(function () {
      const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
      sidepageContainer.scrollTop = 300;
    });
    await context.matchImage(await context.takeScreenshot());
  });
};

kind('SidePage', () => {
  story('SidePageOverAnotherSidePageStory', () => {
    test('open internal side-page', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="SidePageBody__root"] button' }))
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open internal side-page');
    });

    test('close internal side-page', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="SidePageBody__root"] button' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '.react-ui:last-child [data-tid~="SidePageFooter__root"] button' }))
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), 'close internal side-page');
    });
  });

  story('StickySidePageHeaderWhenAnotherSidePageStory', () => {
    test('sticky header, open and close internal side-page', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="SidePageBody__root"] button' }))
        .perform();
      await context.webdriver.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]');

        if (sidepageContainer) {
          sidepageContainer.scrollTop = 3000;
        }
      });
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '.react-ui:last-child [data-tid~="SidePageFooter__root"] button' }))
        .perform();
      await context.matchImage(
        await context.webdriver.takeScreenshot(),
        'sticky header, open and close internal side-page',
      );
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await context.webdriver.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'scroll to bottom');
    });
  });

  story('BodyWithoutHeader', () => {
    test('open side-page without header', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await delay(100);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open side-page without header');
    });
  });

  story('SidePageWithFocusLockWhenBackgroundBlocked', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'unstable tests in firefox2022': { in: /^(?!\b(chrome2022)\b)/ } } });

    test('open side-page', async (context) => {
      const pressTab = async () => {
        await context.webdriver
          .actions({
            bridge: true,
          })
          .sendKeys(Key.TAB)
          .perform();
        await delay(4000);
      };
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await delay(1000);
      await pressTab();
      const firstTimeTabPress = await context.webdriver.takeScreenshot();
      await pressTab();
      const secondTimeTabPress = await context.webdriver.takeScreenshot();
      await pressTab();
      const thirdTimeTabPress = await context.webdriver.takeScreenshot();
      await pressTab();
      const fourthTimeTabPress = await context.webdriver.takeScreenshot();
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
      await context.matchImage(await context.webdriver.takeScreenshot(), 'idle');
    });

    test('Body content has been changed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="toggle-body-content"]' }))
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), 'Body content has been changed');
    });

    test('child component content has been changed', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="toggle-child-component-content"]' }))
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), 'child component content has been changed');
    });

    test('update layout', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="toggle-child-component-content"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid="update"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'update layout');
    });
  });

  story('WithLongTitleStory', () => {
    test('not fixed', async (context) => {
      await context.matchImage(await context.webdriver.takeScreenshot(), 'not fixed');
    });

    test('fixed close element', async (context) => {
      await context.webdriver.executeScript(function () {
        const sidePageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        const sidePageHeader = window.document.querySelector('[data-tid~="SidePageHeader__root"]') as HTMLElement;
        const fixedHeaderHeight = 50;

        sidePageContainer.scrollTop = (sidePageHeader.offsetHeight - fixedHeaderHeight) / 2;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'fixed close element');
    });

    test('fixed header', async (context) => {
      await context.webdriver.executeScript(function () {
        const sidePageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        const sidePageHeader = window.document.querySelector('[data-tid~="SidePageHeader__root"]') as HTMLElement;
        const fixedHeaderHeight = 50;

        sidePageContainer.scrollTop = sidePageHeader.offsetHeight - fixedHeaderHeight;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'fixed header');
    });
  });

  story('SidePageWithChildrenFromOtherComponent', () => {
    test('without header, footer', async (context) => {
      await context.matchImage(await context.webdriver.takeScreenshot(), 'without header, footer');
    });

    test('scroll to bottom without header, footer', async (context) => {
      await context.webdriver.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'scroll to bottom without header, footer');
    });

    test('with header, footer', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="SidePage__header-toggle"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid="SidePage__footer-toggle"]' }))
        .pause(1000)
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'with header, footer');
    });

    test('scroll to bottom with header, footer', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="SidePage__header-toggle"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid="SidePage__footer-toggle"]' }))
        .perform();
      await context.webdriver.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'scroll to bottom with header, footer');
    });

    test('with panel', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="SidePage__footer-toggle"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid="SidePage__panel-toggle"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'with panel');
    });

    test('scroll to bottom with panel', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="SidePage__footer-toggle"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid="SidePage__panel-toggle"]' }))
        .perform();
      await context.webdriver.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'scroll to bottom with panel');
    });
  });

  story('SidePageWithBlockBackground', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'unstable tests in firefox2022': { in: /^(?!\b(chrome2022)\b)/ } } });

    test('open side-page', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot());
    });
  });

  story('SidePageChangeBlockBgAndIgnoreBgClick', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
      captureElement: 'body',
    });

    test('change sidepage mode to view to edit to view', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await delay(100);
      const viewModeSidePage = await context.takeScreenshot();

      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid~="SidePageFooter__root"] button` }))
        .perform();
      await delay(100);
      const editModeSidePage = await context.webdriver.takeScreenshot();

      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid~="SidePageFooter__root"] button` }))
        .perform();
      await delay(100);
      const againViewModeSidePage = await context.takeScreenshot();

      await delay(100);
      await context.matchImages({ viewModeSidePage, editModeSidePage, againViewModeSidePage });
    });
  });

  story('NestedSidePagesWithChangingVeil', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
      captureElement: 'body',
    });

    test('idle', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-first-side-page"]' }))
        .perform();
      await delay(500);
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-second-side-page"]' }))
        .perform();
      await delay(500);
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-third-side-page"]' }))
        .perform();
      await delay(500);
      const thirdOpenedNoVeils = await context.takeScreenshot();

      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid~="veil-first-from-third-side-page"]` }))
        .perform();
      await delay(500);
      const thirdOpenedWithFirstVeil = await context.webdriver.takeScreenshot();

      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid~="veil-second-from-third-side-page"] button` }))
        .perform();
      await delay(500);
      const thirdOpenedWithFirstAndSecondVeils = await context.takeScreenshot();

      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid~="veil-second-from-third-side-page"] button` }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid~="veil-third-from-third-side-page"] button` }))
        .perform();
      await delay(500);
      const thirdOpenedWithFirstAndThirdVeils = await context.takeScreenshot();

      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid~="close-third-side-page"] button` }))
        .perform();
      await delay(500);
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
