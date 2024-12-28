import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const simpleTests = () => {
  test('open side-page', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
      .perform();
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('open side-page');
  });
};

kind('SidePage', () => {
  story('SidePageOverAnotherSidePageStory', () => {
    test('open internal side-page', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="SidePage.Body"] button' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open internal side-page');
    });

    test('close internal side-page', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="SidePage.Body"] button' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '.react-ui:last-child [data-comp-name~="SidePage.Footer"] button' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('close internal side-page');
    });
  });

  story('StickySidePageHeaderWhenAnotherSidePageStory', () => {
    test('sticky header, open and close internal side-page', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="SidePage.Body"] button' }))
        .perform();
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]');

        if (sidepageContainer) {
          sidepageContainer.scrollTop = 3000;
        }
      });
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '.react-ui:last-child [data-comp-name~="SidePage.Footer"] button' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
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
    test('scroll to bottom', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('scroll to bottom');
    });
  });

  story('BodyWithoutHeader', () => {
    test('open side-page without header', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open side-page without header');
    });
  });

  story('SidePageWithFocusLockWhenBackgroundBlocked', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'unstable tests in firefox2022': { in: /^(?!\b(chrome2022)\b)/ } } });

    test('open side-page', async function () {
      const pressTab = async () => {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .perform();
        await delay(5000);
      };
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await delay(1000);
      await pressTab();
      const firstTimeTabPress = await this.browser.takeScreenshot();
      await pressTab();
      const secondTimeTabPress = await this.browser.takeScreenshot();
      await pressTab();
      const thirdTimeTabPress = await this.browser.takeScreenshot();
      await pressTab();
      const fourthTimeTabPress = await this.browser.takeScreenshot();
      await this.expect({
        firstTimeTabPress,
        secondTimeTabPress,
        thirdTimeTabPress,
        fourthTimeTabPress,
      }).to.matchImages();
    });
  });

  story('TestUpdateLayoutMethodStory', () => {
    test('idle', async function () {
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('idle');
    });

    test('Body content has been changed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="toggle-body-content"]' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('Body content has been changed');
    });

    test('child component content has been changed', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="toggle-child-component-content"]' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('child component content has been changed');
    });

    test('update layout', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="toggle-child-component-content"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-tid="update"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('update layout');
    });
  });

  story('WithLongTitleStory', () => {
    test('not fixed', async function () {
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('not fixed');
    });

    test('fixed close element', async function () {
      await this.browser.executeScript(function () {
        const sidePageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        const sidePageHeader = window.document.querySelector('[data-comp-name~="SidePage.Header"]') as HTMLElement;
        const fixedHeaderHeight = 50;

        sidePageContainer.scrollTop = (sidePageHeader.offsetHeight - fixedHeaderHeight) / 2;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed close element');
    });

    test('fixed header', async function () {
      await this.browser.executeScript(function () {
        const sidePageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;
        const sidePageHeader = window.document.querySelector('[data-comp-name~="SidePage.Header"]') as HTMLElement;
        const fixedHeaderHeight = 50;

        sidePageContainer.scrollTop = sidePageHeader.offsetHeight - fixedHeaderHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed header');
    });
  });

  story('SidePageWithChildrenFromOtherComponent', () => {
    test('without header, footer', async function () {
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('without header, footer');
    });

    test('scroll to bottom without header, footer', async function () {
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('scroll to bottom without header, footer');
    });

    test('with header, footer', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="SidePage__header-toggle"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-tid="SidePage__footer-toggle"]' }))
        .pause(1000)
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('with header, footer');
    });

    test('scroll to bottom with header, footer', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="SidePage__header-toggle"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-tid="SidePage__footer-toggle"]' }))
        .perform();
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('scroll to bottom with header, footer');
    });

    test('with panel', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="SidePage__footer-toggle"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-tid="SidePage__panel-toggle"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('with panel');
    });

    test('scroll to bottom with panel', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="SidePage__footer-toggle"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-tid="SidePage__panel-toggle"]' }))
        .perform();
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('scroll to bottom with panel');
    });
  });

  story('SidePageWithBlockBackground', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'unstable tests in firefox2022': { in: /^(?!\b(chrome2022)\b)/ } } });

    test('open side-page', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage();
    });
  });

  story('SidePageChangeBlockBgAndIgnoreBgClick', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
      captureElement: 'body',
    });

    test('change sidepage mode to view to edit to view', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="open-side-page"]' }))
        .perform();
      await delay(100);
      const viewModeSidePage = await this.takeScreenshot();

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="SidePage.Footer"] button' }))
        .perform();
      await delay(100);
      const editModeSidePage = await this.browser.takeScreenshot();

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="SidePage.Footer"] button' }))
        .perform();
      await delay(100);
      const againViewModeSidePage = await this.takeScreenshot();

      await delay(100);
      await this.expect({ viewModeSidePage, editModeSidePage, againViewModeSidePage }).to.matchImages();
    });
  });
});
