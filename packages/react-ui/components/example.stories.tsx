export default {
  title: '😌 TestRetreat ',
};

export const ButtonWithIcon = () => {
  return <Button>Hello 👋</Button>;
};

/**
 *  Button. Состояние “hover”
 *
 *  0. История ButtonWithIcon
 *  1. 📸 дефолтное состояние
 *  2. Навести мышь на Кнопку
 *  3. 📸 состояние “hover”
 *  4. Наблюдаем изменение цвета фона
 *
 *  Profit!
 */

ButtonWithIcon.story = {
  parameters: {
    creevey: {
      tests: {
        async hover(this: { browser: WebDriver }) {
          // находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });

          // находим кнопку
          const button = await this.browser.findElement({ css: 'button' });

          // делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: button })
            .perform();

          // делаем скриншот "при наведении"
          const hover = await element.takeScreenshot();

          // сравниваем результаты
          await expect({ idle, hover }).to.matchImages();
        },
      },
    },
  },
};

export const BasicAutocomplete = () => {
  const [value, updateValue] = React.useState('');
  return <Autocomplete source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />;
};

/**
 *  Autocomplete. Выбор значения по Enter
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. 📸 состояние "в фокусе"
 *  3. Ввести символ "о"
 *  4. 📸 состояние “введенный символ”
 *  5. Нажать клавишу ARROW_DOWN
 *  6. 📸 состояние “подсвечен первый элемент”
 *  7. Нажать клавишу ENTER
 *  8. 📸 состояние “выбран элемент”
 *
 *  Profit!
 */

BasicAutocomplete.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: 'input' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const focused = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('o')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await expect({ focused, typed, highlighted, selected }).to.matchImages();
        },
      },
    },
  },
};
