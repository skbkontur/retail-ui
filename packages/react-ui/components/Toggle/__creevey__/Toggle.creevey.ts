import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('Toggle', () => {
  story('Plain', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /chrome2022(Dark)?/, tests: ['pressed', 'clicked'] },
      },
    });

    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('pressed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: 'label' }),
        })
        .press()
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
    });

    test('clicked', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'label' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
    });
  });

  story('DisabledWithTooltip', () => {
    test('pressed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: 'label' }),
        })
        .press()
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
    });
  });

  story('WithChildren', () => {
    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });
  });

  story('WithLongDescription', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /chrome2022(Dark)?/, tests: 'clicked' },
      },
    });

    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('clicked', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'label' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
    });
  });
});
