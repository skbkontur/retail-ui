import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('DatePicker', () => {
  story('WithMouseeventHandlers', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: ['chrome2022Dark'],
          tests: ['DateSelect year'],
        },
      },
    });
    test('opened', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened');
    });

    test('DateSelect month', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          }),
        )
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect month');
    });

    test('DateSelect year', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          }),
        )
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect year');
    });
  });

  story('DatePickerWithMinMaxDate', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: /^(?!\b(chrome|ie11)\b)/,
          tests: ['DateSelect months', 'DateSelect years'],
        },
      },
    });

    test('DateSelect months', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .pause(1000)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          }),
        )
        .pause(1000)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect months');
    });

    test('DateSelect years', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .pause(1000)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          }),
        )
        .pause(1000)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect years');
    });
  });

  story('DatePickerInRelativeBody', () => {
    test('opened', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="toggle-relative-position"]' }))
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened top without relative position', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened top without relative position');
    });

    test('opened bottom without relative position', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom without relative position');
    });

    test('opened top with relative position', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="relative"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened top with relative position');
    });

    test('opened bottom with relative position', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-tid~="relative"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom');
    });
  });
  story('MobilePicker', () => {
    test('MobilePicker on iphone opened', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('MobilePicker on iphone opened');
    });
  });
});
