import { story, kind, test } from 'creevey';

kind('Switcher', () => {
  story('Horizontal', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Button"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });
  story('WithCustomRenderItems', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'chrome only': { in: /^(?!\bchrome2022\b)/ } },
    });
  });
});
