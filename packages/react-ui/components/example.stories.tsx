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
 *  ¾. Найти элемент на странице
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
  return (
    <Autocomplete
      source={['first value', 'first one more time', 'second value', 'third value']}
      value={value}
      onValueChange={updateValue}
    />
  );
};

/**
 *  Autocomplete. Выбор значения по Enter
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. 📸 состояние "в фокусе"
 *  3. Ввести символ "f"
 *  4. 📸 состояние “введенный символ”
 *  5. Нажать клавишу ARROW_DOWN
 *  6. 📸 состояние “подсвечен первый элемент”
 *  7. Нажать клавишу ENTER
 *  8. 📸 состояние “выбран элемент”
 *
 *  Profit!
 */

/**
 *  Autocomplete. Пропадание выпадашки после ввода неподходящего значения
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символ "f"
 *  3. 📸 состояние “введенный символ”
 *  4. Ввести символ "s"
 *  5. 📸 состояние “введено несуществующее значение”
 *
 */

/**
 *  Autocomplete. Поиск и выбор значения по двум словам
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "first value"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Поиск и выбор значения по символам внутри слова
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "rst"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Сохранение введенного текста после потери фокуса
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "rst"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Нажатие Enter при невыбранном элементе
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "first"
 *  3. Нажать клавишу ENTER
 *  4. 📸 состояние “не выбран элемент”
 *
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
            .sendKeys('f')
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

        async wrongTyped(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('f')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('x')
            .perform();

          const typedWrong = await element.takeScreenshot();

          await expect({ typed, typedWrong }).to.matchImages();
        },

        async severalWords(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first value')
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

          await expect({ typed, highlighted, selected }).to.matchImages();
        },

        async notFirstSymbol(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('rst')
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

          await expect({ typed, highlighted, selected }).to.matchImages();
        },

        async saveTextOnBlur(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.TAB)
            .perform();

          const noFocus = await element.takeScreenshot();

          await expect({ typed, noFocus }).to.matchImages();
        },

        async enterWhenNoSelectedItem(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const empty = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first')
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await expect({ empty, selected }).to.matchImages();
        },
      },
    },
  },
};

export const AutocompleteWithMask = () => {
  const [value, updateValue] = React.useState('');
  return (
    <Autocomplete
      source={['+79001234567', '+79002345678', '+790034567890', '+790092 3456789']}
      value={value}
      onValueChange={updateValue}
      mask="+79999999999"
    />
  );
};

/**
 *  Autocomplete. Маска показывается при вводе
 *
 *  0. История AutocompleteWithMask
 *  1. 📸 состояние “поле не в фокусе”
 *  2. Фокус на поле ввода
 *  3. 📸 состояние “поле в фокусе”
 *  4. Ввести символы "900"
 *  5. 📸 состояние “частичное отображение маски”
 *
 */

/**
 *  Autocomplete. Ввод не подходящего под маску символа
 *
 *  0. История AutocompleteWithMask
 *  1. Фокус на поле ввода
 *  2. 📸 состояние “поле в фокусе”
 *  3. Ввести символ "a"
 *  4. 📸 состояние “введен неверный символ”
 *
 */

/**
 *  Autocomplete. Ввод значения длиной больше маски
 *
 *  0. История AutocompleteWithMask
 *  1. Ввести символы "790034567890888"
 *  4. 📸 состояние “маска полностью заполнена”
 *
 */

/**
 *  Autocomplete. Выбор значения в поле с маской
 *
 *  0. История AutocompleteWithMask
 *  1. Фокус на поле ввода
 *  2. Ввести символы "900"
 *  3. 📸 состояние “заполнена часть маски”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. Нажать клавишу ENTER
 *  6. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Подгон выбранного значения под маску (не реализован, т.к. не работает тест "Выбор значения в поле с маской")
 *
 *  0. История AutocompleteWithMask
 *  1. Фокус на поле ввода
 *  2. Ввести символы "9009"
 *  3. 📸 состояние “заполнена часть маски”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. Нажать клавишу ENTER
 *  6. 📸 состояние “выбран элемент”, отображается текст +79009234567
 *
 */

AutocompleteWithMask.story = {
  parameters: {
    creevey: {
      tests: {
        async showMask(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withMask = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('900')
            .perform();

          const partialMask = await element.takeScreenshot();

          await expect({ withMask, partialMask }).to.matchImages();
        },

        async incorrectInput(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withMask = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('9a')
            .perform();

          const partialMask = await element.takeScreenshot();

          await expect({ withMask, partialMask }).to.matchImages();
        },

        async tooLongInput(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withMask = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('90034567890888')
            .perform();

          const filledMask = await element.takeScreenshot();

          await expect({ withMask, filledMask }).to.matchImages();
        },

        // Тест падает, потому что не срабатывает событие Key.ARROW_DOWN, значение из списка не подсвечивается
        // async itemSelected(this: { browser: WebDriver }) {
        //   const element = await this.browser.findElement({ css: '#test-element' });
        //   const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

        //   await this.browser
        //     .actions({ bridge: true })
        //     .click(input)
        //     .perform();

        //   const focused = await element.takeScreenshot();

        //   await this.browser
        //     .actions({ bridge: true })
        //     .sendKeys('900')
        //     .perform();

        //   const typed = await element.takeScreenshot();

        //   await this.browser
        //     .actions({ bridge: true })
        //     .sendKeys(Key.ARROW_DOWN)
        //     .perform();

        //   const highlighted = await element.takeScreenshot();

        //   await this.browser
        //     .actions({ bridge: true })
        //     .sendKeys(Key.ENTER)
        //     .perform();

        //   const selected = await element.takeScreenshot();

        //   await expect({ focused, typed, highlighted, selected }).to.matchImages();
        // },
      },
    },
  },
};

export const AutocompleteWithWarning = () => {
  const [value, updateValue] = React.useState('');
  return (
    <Autocomplete source={['first value', 'second value']} value={value} onValueChange={updateValue} warning={true} />
  );
};

/**
 *  Autocomplete. Подсветка при предупреждении
 *
 *  0. История AutocompleteWithWarning
 *  1. 📸 состояние "не в фокусе"
 *  2. Фокус на поле ввода
 *  3. 📸 состояние "в фокусе"
 *  4. Ввести символ "f"
 *  5. 📸 состояние “введенный символ”
 *  6. Нажать клавишу ARROW_DOWN
 *  7. 📸 состояние “подсвечен первый элемент”
 *  8. Нажать клавишу ENTER
 *  9. 📸 состояние “выбран элемент”
 *
 */

AutocompleteWithWarning.story = {
  parameters: {
    creevey: {
      tests: {
        async showWarning(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          const noFocus = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withFocus = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('f')
            .perform();

          const witnElements = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.ENTER)
            .perform();

          const valueSelected = await element.takeScreenshot();

          await expect({ noFocus, withFocus, witnElements, highlighted, valueSelected }).to.matchImages();
        },
      },
    },
  },
};
