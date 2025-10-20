import { story, kind, test } from 'creevey';
import type { CreeveyTestContext } from 'creevey';

const startBlink = async (context: CreeveyTestContext) => {
  await context.webdriver
    .actions({
      bridge: true,
    })
    .click(
      context.webdriver.findElement({
        css: 'input',
      }),
    )
    .sendKeys('1')
    .perform();
};
const finishBlink = async (context: CreeveyTestContext) => {
  await context.webdriver
    .actions({
      bridge: true,
    })
    .click(
      context.webdriver.findElement({
        css: 'input',
      }),
    )
    .sendKeys('2')
    .perform();
};
const interruptBlink = async (context: CreeveyTestContext) => {
  await context.webdriver
    .actions({
      bridge: true,
    })
    .click(
      context.webdriver.findElement({
        css: '[data-tid="update-input"]',
      }),
    )
    .perform();
};

const pressedTest = () => {
  test('blinking', async (context) => {
    await startBlink(context);
    const start = await context.takeScreenshot();

    await finishBlink(context);
    const finish = await context.takeScreenshot();

    await context.matchImages({ start, finish });
  });

  test('interrupting', async (context) => {
    await startBlink(context);
    const start = await context.takeScreenshot();

    await interruptBlink(context);
    const interrupt = await context.takeScreenshot();

    await context.matchImages({ start, interrupt });
  });

  test('blinking after interruption', async (context) => {
    await startBlink(context);
    const start = await context.takeScreenshot();

    await interruptBlink(context);
    const interrupt = await context.takeScreenshot();

    await startBlink(context);
    const restart = await context.takeScreenshot();

    await finishBlink(context);
    const finish = await context.takeScreenshot();

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
