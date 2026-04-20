import 'creevey/playwright';
import { kind, story, test } from 'creevey';

import { tid, waitForByTid } from '../../__creevey__/helpers.mjs';

const kindTests = ({ withClose }: { withClose?: boolean } = {}) => {
  test('toastShown', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('show-toast')).click();
    await page.mouse.move(0, 0);
    await page.mouse.click(0, 0);
    await waitForByTid(page, 'ToastView__root');
    await context.matchImage(await context.takeScreenshot());
    if (withClose) {
      await page.locator(tid('ToastView__close')).click();
    }
    await page.locator(tid('ToastView__root')).waitFor({ state: 'hidden' });
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
    kindTests({ withClose: true });
  });

  story('complex', () => {
    kindTests();
  });

  story('ReactNodeExample', () => {
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
      const page = context.webdriver;
      const showInstanceToastButton = page.locator(tid('show-instance-toast'));
      await showInstanceToastButton.click();
      await waitForByTid(page, 'ToastView__root');
      const instanceToast = await context.takeScreenshot();

      await context.matchImages({ instanceToast });
      await page.locator(tid('ToastView__root')).waitFor({ state: 'hidden' });
    });
  });
});
