import { kind, story, test } from 'creevey';
import { Key } from 'selenium-webdriver';

const kebabTests = () => {
  test('hovered', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }),
      })
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'hovered');
  });

  test('clicked', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('clickedOnButton2ndTime', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .click(context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'clickedOnButton2ndTime');
  });

  test('tabPress', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.TAB)
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
  });

  test('enterPress', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.TAB)
      .sendKeys(Key.ENTER)
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'enterPress');
  });
};

kind('ThemeVersions/5_1', () => {
  story('Kebab_Small5_1', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Kebab_Medium5_1', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Kebab_Large5_1', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark', 'firefox2022'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });
});
