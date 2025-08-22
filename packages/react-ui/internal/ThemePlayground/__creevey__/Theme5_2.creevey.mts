import { kind, story, test } from 'creevey';

kind('ThemeVersions/5_2', () => {
  story('MiniModal5_2', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });
  });

  story('Button5_2', () => {
    test('with right icon', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'with right icon');
    });
  });
});
