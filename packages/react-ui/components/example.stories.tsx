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
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на Кнопку
 *  4. 📸 состояние “hover”
 *  5. Наблюдаем изменение цвета фона
 *
 *  Profit!
 */

ButtonWithIcon.story = {
  parameters: {
    creevey: {
      tests: {
        async hover(this: { browser: WebDriver }) {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });
          // находим кнопку
          const button = await this.browser.findElement({ css: 'button' });

          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: button })
            .perform();

          // 4. делаем скриншот "при наведении"
          const hover = await element.takeScreenshot();

          // 5. сравниваем результаты
          await expect({ idle, hover }).to.matchImages();
        },
      },
    },
  },
};

const BASIC_AUTOCOMPLETE_ITEMS = ['one', 'two', 'three'];

export const BasicAutocomplete = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete source={BASIC_AUTOCOMPLETE_ITEMS} value={value} onValueChange={updateValue} />
    </div>
  );
};

/**
 *  Autocomplete. Выбор значения по Enter
 *
 *  0. История BasicAutocomplete
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. 📸 состояние "в фокусе"
 *  4. Ввести символ "о"
 *  5. 📸 состояние “введенный символ”
 *  6. Нажать клавишу ARROW_DOWN
 *  7. 📸 состояние “подсвечен первый элемент”
 *  8. Нажать клавишу ENTER
 *  9. 📸 состояние “выбран элемент”
 *
 *  Profit!
 */

BasicAutocomplete.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

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

        async itemNotFound(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .sendKeys('a', Key.ARROW_DOWN)
            .perform();

          const absent = await element.takeScreenshot();

          await expect({ absent }).to.matchImages();
        },

        async itemNotFoundAfterFillExtraChar(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .sendKeys('o', Key.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('!', Key.ARROW_DOWN)
            .perform();

          const absent = await element.takeScreenshot();

          await expect({ highlighted, absent }).to.matchImages();
        },

        async itemtFoundAfterFixMisprint(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .sendKeys('ob', Key.ARROW_DOWN)
            .perform();

          const absent = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.BACK_SPACE, Key.ARROW_DOWN, Key.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await expect({ absent, selected }).to.matchImages();
        },

        async firstItemSelectedAfterLast(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });
          const typedText = 'o';

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .sendKeys(typedText)
            .perform();

          const filteredItemsLength = BASIC_AUTOCOMPLETE_ITEMS.filter(item =>
            item
              .trim()
              .toLowerCase()
              .includes(typedText),
          ).length;
          const arrowDownKeysArray: string[] = Array(filteredItemsLength + 1).fill(Key.ARROW_DOWN);

          await this.browser
            .actions({ bridge: true })
            .sendKeys(...arrowDownKeysArray, Key.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await expect({ selected }).to.matchImages();
        },
      },
    },
  },
};

export const SimpleTokenInput = () => {
  const [selectedItems, setSelectedItems] = React.useState<TokenInputItems>([]);

  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <TokenInput
        selectedItems={selectedItems}
        getItems={getTokenInputItems}
        onValueChange={(newItems: TokenInputItems) => setSelectedItems(newItems)}
      />
    </div>
  );
};

type TokenInputItems = string[];
const TokenInputItems: TokenInputItems = ['First', 'Second', 'Item with very very very very very long name'];

async function getTokenInputItems(itemName: string) {
  const valuesFilter = (value: string) => value.toLowerCase().includes(itemName.toLowerCase());

  return TokenInputItems.filter(valuesFilter);
}

SimpleTokenInput.story = {
  parameters: {
    creevey: {
      tests: {
        async itemFocused(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=TokenInput]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const focused = await element.takeScreenshot();

          await expect({ focused }).to.matchImages();
        },

        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=TokenInput]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .sendKeys('Item', Key.ARROW_DOWN, Key.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await expect({ selected }).to.matchImages();
        },

        async itemNotFound(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=TokenInput]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .sendKeys('!', Key.ARROW_DOWN)
            .perform();

          const notFound = await element.takeScreenshot();

          await expect({ notFound }).to.matchImages();
        },

        async itemRemovedFromSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=TokenInput]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .sendKeys('F', Key.ARROW_DOWN, Key.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .sendKeys(Key.BACK_SPACE, Key.BACK_SPACE)
            .perform();

          const absent = await element.takeScreenshot();

          await expect({ selected, absent }).to.matchImages();
        },
      },
    },
  },
};
