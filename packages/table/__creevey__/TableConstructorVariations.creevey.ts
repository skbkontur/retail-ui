import 'creevey/playwright';
import type { CreeveyTestContext } from 'creevey';
import { story, kind, test } from 'creevey';

kind('Table/Constructor Variations', () => {
  const hoverFirstRow = async (context: CreeveyTestContext) => {
    const page = context.webdriver;
    await page.locator('[data-tid="Table__row"]').first().hover();
    await page.waitForTimeout(200);
  };

  // фокус внутрь экшнбара первой строки (ветка :focus-within)
  const focusFirstActionBar = async (context: CreeveyTestContext) => {
    const page = context.webdriver;
    await page.locator('[data-tid="Table__popupActionBar"] button').first().focus();
    await page.waitForTimeout(200);
  };

  // overlay-экшнбар на КЛИКАБЕЛЬНОЙ строке: при наведении/фокусе подложка-тень (--table-row-shadow-hover)
  story('ActionsOverlayClickable', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });
    test('hover', async (context) => {
      await hoverFirstRow(context);
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });
    test('focus', async (context) => {
      await focusFirstActionBar(context);
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  // overlay-экшнбар на НЕкликабельной строке: при наведении/фокусе фон как у sticky-шапки (--table-sticky-background)
  story('ActionsOverlayNonClickable', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });
    test('hover', async (context) => {
      await hoverFirstRow(context);
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });
    test('focus', async (context) => {
      await focusFirstActionBar(context);
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });
});
