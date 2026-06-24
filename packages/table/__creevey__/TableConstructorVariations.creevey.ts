import 'creevey/playwright';
import type { CreeveyTestContext } from 'creevey';
import { story, kind, test } from 'creevey';

kind('Table/Constructor Variations', () => {
  // Фокус внутрь overlay-экшнбара первой строки (ветка :focus-within, которую чинили).
  const focusActionBar = async (context: CreeveyTestContext) => {
    const page = context.webdriver;
    await page.locator('[data-tid="Table__popupActionBar"] button').first().focus();
    await page.waitForTimeout(500);
  };

  // overlay-экшнбар на КЛИКАБЕЛЬНОЙ строке: при фокусе подложка-тень (--table-row-shadow-hover)
  story('ActionsOverlayClickable', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });
    test('focus', async (context) => {
      await focusActionBar(context);
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  // overlay-экшнбар на НЕкликабельной строке: при фокусе фон как у sticky-шапки (--table-sticky-background)
  story('ActionsOverlayNonClickable', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });
    test('focus', async (context) => {
      await focusActionBar(context);
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });
});
