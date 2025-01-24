import { story, kind, test } from 'creevey';

kind('Textarea', () => {
  story('Required', () => {
    test('idle', async (context) => {
      const textareaWithRightTooltip = await context.webdriver.findElement({
        css: '[data-tid~="textarea-with-right-tooltip"]',
      });
      const textareaWithBottomTooltip = await context.webdriver.findElement({
        css: '[data-tid~="textarea-with-bottom-tooltip"]',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(textareaWithRightTooltip)
        .pause(100)
        .move({
          origin: textareaWithBottomTooltip,
        })
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
