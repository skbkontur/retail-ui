import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const kindTests = () => {
  test('toastShown', async function () {
    const showToast = this.browser.findElement({ css: '[data-tid~="show-toast"]' });
    await this.browser.actions({ bridge: true }).click(showToast).move({ x: 0, y: 0 }).click().perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage();
  });
};

kind('Toast', () => {
  story('SimpleNotification', () => {
    kindTests();
  });

  story('TestNotifier', () => {
    kindTests();
  });

  story('ComplexNotification', () => {
    kindTests();
  });

  story('complex', () => {
    kindTests();
  });

  story('StaticMethod', () => {
    kindTests();
  });

  story('button', () => {
    kindTests();
  });

  story('data-tid', () => {
    kindTests();
  });

  story('onClick', () => {
    kindTests();
  });

  story('Toast', () => {
    kindTests();
  });

  story('push', () => {
    kindTests();
  });
});
