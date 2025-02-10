import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';

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

  story('ToastWithCross', () => {
    test('idle', async (context) => {
      const showStaticToastButton = context.webdriver.findElement({ css: '[data-tid~="show-static-toast"]' });
      const showInstanceToastButton = context.webdriver.findElement({ css: '[data-tid~="show-instance-toast"]' });

      await context.webdriver.actions({ bridge: true }).click(showStaticToastButton).perform();
      await delay(1000);
      const staticToast = await context.takeScreenshot();

      const closeFirstToast = context.webdriver.findElement({ css: '[data-tid~="ToastView__close"]' });
      await context.webdriver
        .actions({ bridge: true })
        .click(closeFirstToast)
        .pause(100)
        .click(showInstanceToastButton)
        .perform();
      await delay(1000);
      const instanceToast = await context.takeScreenshot();

      await context.matchImages({ staticToast, instanceToast });
    });
  });
});
