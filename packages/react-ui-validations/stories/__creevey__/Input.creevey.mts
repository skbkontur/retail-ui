import { story, kind, test } from 'creevey';

kind('Input', () => {
  story('TooltipTopLeft', () => {
    test('invalidTooltip', async (context) => {
      const input = await context.webdriver.findElement({ css: '.react-ui-1xb4xgu' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(input)
        .sendKeys('test')
        .click(context.webdriver.findElement({ css: 'body' }))
        .click(input)
        .pause(500)
        .perform();
      await context.matchImage(await context.takeScreenshot(), );
    });
  });
});
