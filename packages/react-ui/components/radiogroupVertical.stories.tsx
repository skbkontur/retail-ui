import { element } from 'prop-types';

import { RadioGroup } from './RadioGroup';

export default {
  title: '😌 TestRetreat ',
};

export const RadioGroupVertical = () => (
  <RadioGroup>
    <Gapped vertical gap={10}>
      <Radio value="fd">1</Radio>
      <Radio value="er">2</Radio>
      <Radio value="gs">3</Radio>
    </Gapped>
  </RadioGroup>
);

/**
 * 0. Найти элемент для скриншота
 * 1. Найти элементы списка
 * 2. 📸скриншот дефолтного состояния
 * 3. Навести курсор
 * 4. 📸Скриншот при наведении
 * 5. 📸Нажатие-Скриншот момента нажатия на кнопку
 * 6. 📸Скриншот после нажатия
 * 7. Повторное нажатие
 * 8. 📸Скриншот после повторного нажатия
 * 9. нажатие таба
 * 10. 📸Скриншот без фокуса
 * 11. Выбрать другой пункт
 * 12. 📸Скриншот другого выбора
 *  Profit!
 */

RadioGroupVertical.story = {
  parameters: {
    creevey: {
      tests: {
        async cliksToVerticalElements(this: { browser: WebDriver }) {
          // 0. Найти элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });

          // 1. Найти элементы списка
          const button = await this.browser.findElements({ css: '[data-comp-name=Radio]' });

          // 2. Скриншот дефолтного состояния
          const defaultState = await element.takeScreenshot();

          // 3.  Навести курсор
          await this.browser
            .actions({ bridge: true })
            .move({ origin: button[0] })
            .perform();

          // 4. делаем скриншот "при наведении"
          const cursor = await element.takeScreenshot();

          // 5. делаем скриншот "при нажатии"
          await this.browser
            .actions({ bridge: true })
            .move({ origin: button[0] })
            .press(0)
            .perform();

          const click = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .release()
            .perform();

          //6. скриншот после нажатия
          const afterClick = await element.takeScreenshot();

          // 7. повторное нажатие
          await this.browser
            .actions({ bridge: true })
            .click(button[0])
            .perform();

          // 8. скрин после повторного нажатия
          const afterRepiatClick = await element.takeScreenshot();

          // 9. нажатие таба
          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.TAB)
            .perform();

          // 10. скрин без фокуса
          const withoutFocus = await element.takeScreenshot();

          // 11. выбрать другой пункт
          await this.browser
            .actions({ bridge: true })
            .click(button[2])
            .perform();

          // 12. скрин выбора другого элемента
          const otherElement = await element.takeScreenshot();

          // 13. сравниваем результаты
          await expect({
            defaultState,
            cursor,
            click,
            afterClick,
            afterRepiatClick,
            withoutFocus,
            otherElement,
          }).to.matchImages();
        },
      },
    },
  },
};
