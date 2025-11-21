import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

const kindTests = (testName: string) => {
  test(`use toast ${testName}`, async (context) => {
    const page = context.webdriver;
    const showToast = page.locator(tid(testName));
    await showToast.click();
    await page.mouse.move(0, 0);
    await page.mouse.click(0, 0);
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot());
  });
};

kind('SingleToast', () => {
  story('StaticErrorMethod', () => {
    kindTests('error-theme');
  });

  story('StaticDefaultMethod', () => {
    kindTests('default-theme');
  });

  story('WithOverrideDefaultColor', () => {
    kindTests('override-default-theme');
  });

  story('StaticDefaultMethodWithAction', () => {
    kindTests('static-default-theme-with-action');
  });

  // TODO: удалить после избавления от старого api метода push
  story('OldApi', () => {
    kindTests('old-api');
  });
});
