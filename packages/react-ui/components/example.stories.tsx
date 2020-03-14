export default {
  title: '😌 TestRetreat',
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

export const BasicAutocomplete = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />
    </div>
  );
};

BasicAutocomplete.story = {
  parameters: {
    creevey: {
      tests: {
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
        
/**
 *  Autocomplete. Независимость от регистра
 *
 *  0. История BasicAutocomplete
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. Ввести "ONE"
 *  4. 📸 состояние “введенное слово"
 *
 *  Profit!
 */
        async shouldSuggestCaseIndependent(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('ONE')
            .perform();

          const upperCaseTyped = await element.takeScreenshot();

          await expect({ typed: upperCaseTyped }).to.matchImages();
        },
/**
 *  Autocomplete. Обрезает пробелы
 *
 *  0. История BasicAutocomplete
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. Ввести "   two   "
 *  4. 📸 состояние “введенное слово"
 *
 *  Profit!
 */
        async shouldIgnoreSpacesAfterOrBefore(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('   two   ')
            .perform();

          const typedWithSpaces = await element.takeScreenshot();

          await expect({ typed: typedWithSpaces }).to.matchImages();
        }
      },
    },
  },
};

export const AutocompleteWithScroll = () => {
  const [value, updateValue] = React.useState('');
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(`Abba ${i}`);
  }
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete source={items} value={value} onValueChange={updateValue} />
    </div>
  );
};

AutocompleteWithScroll.story = {
  parameters: {
    creevey: {
      tests: {
/**
 *  Autocomplete. При большом количестве вариантов виден скроллбар
 *
 *  0. История AutocompleteWithScroll
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. Ввести "Abba"
 *  4. 📸 состояние дропдауна со скроллбаром
 *
 *  Profit!
 */
        async scrollBarShouldBeVisible(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const autocomplete = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(autocomplete)
            .perform();

          await this.browser
            .actions({ bridge: true})
            .sendKeys('Abba')
            .perform();

          const autocompleteWithScroll = await element.takeScreenshot();

          await expect({ autocompleteWithScroll }).to.matchImages();
        },
/**
 *  Autocomplete. Скроллбар расширяется при наведении
 *
 *  0. История AutocompleteWithScroll
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. Ввести "Abba"
 *  4. Находим скроллбар
 *  5. Наводим на него мышь
 *  6. 📸 состояние скроллбара в дропдауне
 *
 *  Profit!
 */
        async scrollBarShouldEnlargeOnHover(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const autocomplete = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(autocomplete)
            .perform();

          await this.browser
            .actions({ bridge: true})
            .sendKeys('Abba')
            .perform();

          const scrollBar = await this.browser.findElement({ className: 'react-ui-ejkfzu'});
          await this.browser
            .actions({ bridge: true })
            .move({origin: scrollBar})
            .perform(); //Hover не работает на IE11
          const scrollBarOnHover = await element.takeScreenshot();

          await expect({ scrollBarOnHover }).to.matchImages();
        },
      },
    },
  },
};

export const AutocompleteWithSelectAllOnFocus = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete source={['one', 'two', 'three']} value={value} selectAllOnFocus={true} onValueChange={updateValue} />
    </div>
  );
};

/**
 *  Autocomplete. При введеном тексте фокус на элементе влечет выделение этого текста 
 *
 *  0. История AutocompleteWithSelectAllOnFocus
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. Ввести "shouldSelectThisTextOnFocus"
 *  4. Нажать TAB для потери фокуса (не проходит на Firefox)
 *  5. Кликаем вновь по полю ввода
 *  6. 📸 состояние поля ввода
 *
 *  Profit!
 */

AutocompleteWithSelectAllOnFocus.story = {
  parameters: {
    creevey: {
      tests: {
        async shouldSelectTextOnFocus(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const autocomplete = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(autocomplete)
            .perform();

          await this.browser
            .actions({ bridge: true})
            .sendKeys('shouldSelectThisTextOnFocus')
            .sendKeys(Key.TAB) //TODO: Не работает в Firefox, нужно либо по другому терять фокус, либо разобраться в чем проблема Firefox
            .perform();

          await this.browser
            .actions({ bridge: true })
            .click(autocomplete)
            .perform();

          const selectedOnFocus = await element.takeScreenshot();

          await expect({ selectedOnFocus }).to.matchImages();
        },
      },
    },
  },
};

/**
 *  Autocomplete. Текст вводится с выравниванием по правому краю / по центру 
 *
 *  0. История AutocompleteWithRightTextAlignment
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. Ввести "text"
 *  4. 📸 состояние поля ввода
 *
 *  Profit!
 */

export const AutocompleteWithRightTextAlignment = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete align={"right"}  source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />
    </div>
  );
};

const textAlignmentTest = {
  async textShouldBeAligned(this: { browser: WebDriver }) {
    const element = await this.browser.findElement({ css: '#test-element' });
    const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

    await this.browser
      .actions({ bridge: true })
      .click(input)
      .perform();

    await this.browser
      .actions({ bridge: true })
      .sendKeys('text')
      .perform();

    const typed = await element.takeScreenshot();
    await expect({typed}).to.matchImages();
  },
};

AutocompleteWithRightTextAlignment.story = {
  parameters: {
    creevey: {
      tests: textAlignmentTest 
    },
  },
};

export const AutocompleteWithCenterTextAlignment = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete align={"center"}  source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />
    </div>
  );
};

AutocompleteWithCenterTextAlignment.story = {
  parameters: {
    creevey: {
      tests: textAlignmentTest 
    },
  },
};
