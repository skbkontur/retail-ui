import { kind, story, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

const kindTests = () => {
  test('toastShown', async (context) => {
    const showToast = context.webdriver.findElement({ css: '[data-tid~="show-toast"]' });
    await context.webdriver.actions({ bridge: true }).click(showToast).move({ x: 0, y: 0 }).click().perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot());
  });
};

kind('Toast', () => {
  story('SimpleNotification', () => {
    kindTests();
  });

  story('TestNotifier', () => {
    kindTests();
  });

  story('UseErrorExample', () => {
    kindTests();
  });

  story('ComplexNotification', () => {
    kindTests();
  });

  story('complex', () => {
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

  story('ToastWithCross', () => {
    test('idle', async (context) => {
      const showInstanceToastButton = context.webdriver.findElement({ css: '[data-tid="show-instance-toast"]' });

      await context.webdriver.actions({ bridge: true }).pause(100).click(showInstanceToastButton).perform();
      await delay(1000);
      const instanceToast = await context.takeScreenshot();

      await context.matchImages({ instanceToast });
    });
  });
});
