export default {
  title: '😌 TestRetreat ',
};

export const HelloWorld = () => '👋';

export const ButtonWithIcon = () => <Button icon={<i>🐻</i>}>with Icon</Button>;

ButtonWithIcon.story = {
  parameters: {
    creevey: {
      tests: {
        async simple(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const idle = await element.takeScreenshot();
          await expect(idle).to.matchImage();
        },
      },
    },
  },
};

export const BasicAutocomplete = () => {
  const [value, updateValue] = useState('');
  return <Autocomplete source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />;
};

BasicAutocomplete.story = {
  parameters: {
    creevey: {
      tests: {
        async focused(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: 'input' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const focused = await element.takeScreenshot();
          await expect(focused).to.matchImage();
        },
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
 *  1. Открыть story BasicAutocomplete.
 *     Открывается простой Autocomplete без доп. пропов.
 *  2. Кликнуть по полю ввода.
 *     Должен открыться выпадающий список.
 *  3. Нажать клавишу Esc на клавиатуре.
 *     Выпадающий список должен закрыться.
 */
