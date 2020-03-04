export default {
  title: '😌 TestRetreat ',
};

export const ButtonWithIcon = () => <Button>Hello 👋</Button>;
export const ButtonWithIcon2 = () => <Button>Hello 👋</Button>;

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

/**
 * Autocomplete. Закрывается по нажатию Esc.
 *
 * Шаги:
 *  1. Открыть story BasicAutocomplete. 📸
 *     Открывается простой Autocomplete без доп. пропов.
 *  2. Кликнуть по полю ввода. 📸
 *     Должен открыться выпадающий список.
 *  3. Нажать клавишу Esc на клавиатуре. 📸
 *     Выпадающий список должен закрыться.
 */
