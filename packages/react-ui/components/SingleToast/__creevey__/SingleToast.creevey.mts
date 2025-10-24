import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

const kindTests = (testName: string) => {
  test(`use toast ${testName}`, async (context) => {
    const showToast = context.webdriver.findElement({ css: `[data-tid~="${testName}"]` });
    await context.webdriver.actions({ bridge: true }).click(showToast).move({ x: 0, y: 0 }).click().perform();
    await delay(1000);
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
