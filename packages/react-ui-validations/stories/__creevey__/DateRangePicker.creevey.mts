import { story, kind, test } from 'creevey';

kind('DateRangePicker', () => {
  story('Example1', () => {
    test('submit', async (context) => {
      const submitButton = await context.webdriver.findElement({ css: '[data-tid~="submit-button"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submitButton)
        .pause(1000)
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
