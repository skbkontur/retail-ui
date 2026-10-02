import 'creevey/playwright';
import type { CreeveyTestContext } from 'creevey';
import { story, kind, test } from 'creevey';

kind('Table/Row Focus', () => {
  // Доводим фокус до строки так же, как это делает пользователь — табом. Первая
  // фокусируемая вещь в стори это строка таблицы, других табстопов до неё нет.
  const focusFirstRow = async (context: CreeveyTestContext) => {
    const page = context.webdriver;
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      if (await page.evaluate(() => document.activeElement?.tagName === 'TR')) {
        return;
      }
    }
    throw new Error('Не удалось довести клавиатурный фокус до строки таблицы');
  };

  // Убираем за собой: react-ui решает, показывать ли рамку фокуса, по глобальному флагу
  // KeyListener (взводится на keydown Tab, гаснет на mousedown), а creevey крутит все
  // стори в одном документе. Без сброса наш Tab протекает в соседние тесты, и кнопки,
  // сфокусированные там программно, вдруг получают рамку — одно падение здесь
  // превратилось бы в пять.
  const releaseKeyboardFocusFlag = async (context: CreeveyTestContext) => {
    await context.webdriver.evaluate(() => window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })));
  };

  story('KeyboardFocus', () => {
    // Регресс: рамку фокуса строки рисовал псевдоэлемент у <tr>, а сгенерированный контент
    // внутри строки браузер заворачивает в анонимную ячейку — в строке появлялась лишняя
    // колонка, и ячейки всей таблицы сжимались. Сравнение ширин ловит это надёжнее картинки:
    // эталон бы совпал на любой таблице, где ширины колонок заданы явно.
    test('ширина колонок не меняется при клавиатурном фокусе строки', async (context) => {
      const page = context.webdriver;

      const widths = () =>
        page.$$eval('[data-tid="Table__body"] [data-tid="Table__cell"]', (cells) =>
          cells.map((cell) => Math.round(cell.getBoundingClientRect().width)),
        );

      try {
        const before = await widths();
        if (before.length === 0) {
          throw new Error('Не нашли ячеек таблицы: селектор устарел, сравнивать нечего');
        }

        await focusFirstRow(context);

        const after = await widths();
        if (JSON.stringify(before) !== JSON.stringify(after)) {
          throw new Error(
            `Ширины ячеек поехали от фокуса строки: ${JSON.stringify(before)} → ${JSON.stringify(after)}`,
          );
        }

        // Без рамки сравнение ширин ничего не проверяет. Проверяем именно нашу рамку:
        // у строки с tabindex браузер и сам рисует дефолтную, но она идёт стилем `auto`,
        // так что потерю `.TableRow:focus-visible` такая проверка бы не заметила.
        const ring = await page.evaluate(() => {
          const style = getComputedStyle(document.activeElement as Element);
          return { style: style.outlineStyle, width: style.outlineWidth, color: style.outlineColor };
        });
        if (ring.style !== 'solid' || parseFloat(ring.width) === 0) {
          throw new Error(`Вместо рамки из темы у строки ${JSON.stringify(ring)} — проверять нечего`);
        }
      } finally {
        await releaseKeyboardFocusFlag(context);
      }
    });

    // Картиночная половина: сравнение ширин не заметит, если у рамки уедет отступ,
    // радиус или цвет.
    test('ring', async (context) => {
      try {
        await focusFirstRow(context);
        await context.matchImage(await context.takeScreenshot(), 'ring');
      } finally {
        await releaseKeyboardFocusFlag(context);
      }
    });
  });
});
