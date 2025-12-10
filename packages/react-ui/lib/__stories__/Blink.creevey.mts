import { story, kind, test } from 'creevey';
import 'creevey/playwright';
import type { CreeveyTestContext } from 'creevey';

import { tid } from '../../components/__creevey__/helpers.mjs';

const optionsWithAnimation = { animations: 'allow' };

const startBlink = async (context: CreeveyTestContext) => {
  const page = context.webdriver;
  await page.locator(tid('Input__root')).click();
  await page.keyboard.type('1');
  await page.locator(tid('TokenInput__label')).click();
  await page.keyboard.type('1');
  await page.locator('body').click();
  await page.waitForTimeout(200);
};
const finishBlink = async (context: CreeveyTestContext) => {
  const page = context.webdriver;
  await page.locator(tid('Input__root')).click();
  await page.keyboard.type('2');
  await page.locator(tid('TokenInput__label')).click();
  await page.keyboard.type('2');
  await page.locator('body').click();
  await page.waitForTimeout(200);
};
const interruptBlink = async (context: CreeveyTestContext) => {
  const page = context.webdriver;
  await page.locator(tid('update-input')).click();
  await page.waitForTimeout(200);
};

const pressedTest = () => {
  test('blinking', async (context) => {
    await startBlink(context);
    const start = await context.takeScreenshot(optionsWithAnimation);
    await finishBlink(context);
    const finish = await context.takeScreenshot(optionsWithAnimation);

    await context.matchImages({ start, finish });
  });

  test('interrupting', async (context) => {
    await startBlink(context);
    const start = await context.takeScreenshot(optionsWithAnimation);

    await interruptBlink(context);
    const interrupt = await context.takeScreenshot(optionsWithAnimation);

    await context.matchImages({ start, interrupt });
  });

  test('blinking after interruption', async (context) => {
    await startBlink(context);
    const start = await context.takeScreenshot(optionsWithAnimation);

    await interruptBlink(context);
    const interrupt = await context.takeScreenshot(optionsWithAnimation);

    await startBlink(context);
    const restart = await context.takeScreenshot(optionsWithAnimation);

    await finishBlink(context);
    const finish = await context.takeScreenshot(optionsWithAnimation);

    await context.matchImages({ start, interrupt, restart, finish });
  });
};

const defaultStoryParameters = {
  skip: { 'enough basic themes': { in: /^(?!\bchrome2022\b|\bfirefox2022\b)/ } },
};

kind('Lib/blink', () => {
  story('Animate', ({ setStoryParameters }) => {
    setStoryParameters(defaultStoryParameters);
    pressedTest();
  });
});
