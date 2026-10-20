import 'creevey/playwright';
import { kind, story, test } from 'creevey';

import { tid } from './helpers.mjs';

kind('ValidationWrapper', () => {
  story('CustomControlsAfterSubmit', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip on hover after submit', async (context) => {
      const page = context.webdriver;
      const tooltip = page.locator(tid('Tooltip__content')).filter({ hasText: 'Ошибка' });

      await page.getByRole('button', { name: 'Submit', exact: true }).click();
      await page.getByText('Форма невалидна').waitFor();
      await page.getByText('Форма невалидна').click();
      await tooltip.waitFor({ state: 'hidden' });

      // Query the input after submit: the story remounts the custom control.
      await page.getByRole('textbox', { name: 'Кастомное поле' }).hover();
      await tooltip.waitFor({ state: 'visible' });
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ScrollAndFocusInIframe', () => {
    test('scroll', async (context) => {
      const page = context.webdriver;
      const idle = await context.takeScreenshot();
      await page.locator(tid('outside-submit')).click();
      await page.waitForTimeout(500);
      const scrollOnOutsideSubmit = await context.takeScreenshot();

      await context.matchImages({ idle, scrollOnOutsideSubmit });
    });
  });
});
