import { story, kind, test } from 'creevey';

kind('FileUploaderFile', () => {
  story('FileUploaderFileWithValidationError', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': {
          in: /^(?!\b(chrome)\b)/,
        },
      },
    });

    test('hover', async function () {
      await this.browser
        .actions({
          async: undefined,
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: '[data-tid="FileUploader__fileName"]' }),
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('hover');
    });
  });
});
