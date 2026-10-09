import 'creevey/playwright';
import { story, kind, test } from 'creevey';

kind('Table/Editable Cell', () => {
  story('Sizes', () => {
    // Покой: текст без полей, ровно под заголовками колонок.
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    // По кадру на размер: в каждом сравниваем, что текст поля встал на место текста в покое.
    for (const [index, size] of ['small', 'medium', 'large'].entries()) {
      test(`hover ${size}`, async (context) => {
        await context.webdriver.hover(`[data-tid="Table__body"] >> nth=${index} >> [data-tid="Table__row"] >> nth=0`);
        await context.matchImage(await context.takeScreenshot(), `hover ${size}`);
      });
    }

    // Поле скрыто прозрачностью, а не display: до него доходит Tab, и фокус показывает строку целиком.
    test('focus', async (context) => {
      const page = context.webdriver;
      await page.mouse.move(0, 0);
      await page.locator('[data-tid="Table__editableCellEditor"] input').first().focus();
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  // В одном кадре: первая строка под курсором (поле), вторая в покое (текст). Правые края текста должны совпасть.
  story('Currency', () => {
    test('hover', async (context) => {
      await context.webdriver.hover('[data-tid="Table__body"] [data-tid="Table__row"] >> nth=0');
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });
  });
});
