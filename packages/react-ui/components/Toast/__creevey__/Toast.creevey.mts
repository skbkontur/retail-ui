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
});
