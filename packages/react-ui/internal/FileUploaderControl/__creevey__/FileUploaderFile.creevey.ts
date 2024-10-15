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

    test('hover', async function () {
      await this.browser
        .actions({
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
