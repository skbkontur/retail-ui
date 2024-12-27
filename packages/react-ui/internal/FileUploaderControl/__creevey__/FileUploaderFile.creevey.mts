import { story, kind, test } from 'creevey';

kind('FileUploaderFile', () => {
  story('FileUploaderFileWithValidationError', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': {
          in: /^(?!\b(chrome2022)\b)/,
        },
      },
    });

    test('hover', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: '[data-tid="FileUploader__fileName"]' }),
        })
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });
  });
});
