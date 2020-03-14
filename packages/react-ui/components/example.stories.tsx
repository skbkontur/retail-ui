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

export const BasicAutocomplete = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />
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
      },
    },
  },
};

export const DisabledCheckbox = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox
      checked={value}
      onValueChange={updateValue}
      disabled
    >
      text
    </Checkbox>
  )
};

/**
* Checkbox: клик по заблокированному чекбоксу
*
* 1. Найти элемент на странице
* 2. Скриншот idle
* 3. Клик на чекбоксе
* 4. Скриншот после клика
* */

DisabledCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: "#test-element" });
          const checkbox = await this.browser.findElement({ css: "[data-comp-name~=Checkbox]" });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          const afterClicked = await element.takeScreenshot();

          await expect({ idle, afterClicked }).to.matchImages();
        }
      }
    }
  }
};

export const DisableCheckedCheckbox = () => {
  return (
    <Checkbox checked disabled>text</Checkbox>
  );
};

export const ClickCheckBox = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox
    checked={value}
    onValueChange={updateValue}>text</Checkbox>
  );
};
/**
 *  CheckBox. клик по чек-боксу поверяем, что в нем стоит галочка
 *
 *  0. История BasicCheckBoxClick
 *  1. Найти элемент на странице
 *  3. 📸 состояние элемента
 *  4. клик по чек-боксу
 *  5. 📸 состояние “выбран чек-бокс”
 *  не получилось кликнуть отдельно по чек-боксу и отдельно по тексту
 *  6. клик по тексту
 *  7.📸 состояние “не выбран чек-бокс”
 */
ClickCheckBox.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: "#test-element" });
          const checkbox = await this.browser.findElement({ css: "[data-comp-name~=Checkbox]" });
		      /*const text = await this.browser.findElement({ css: "#react-ui-1u5errz" });*/

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          const afterClicked = await element.takeScreenshot();
		  
		        await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          const aftertwoClicked = await element.takeScreenshot();

          await expect({ idle, afterClicked,aftertwoClicked }).to.matchImages();
        }
      }
    }
  }
};

DisableCheckedCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async disableChecked(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: "#test-element" });
          const image = await element.takeScreenshot();

          await expect({ image }).to.matchImages();
        }
      }
    }
  }
};

export const ErrorCheckbox = () => {
  return (
    <Checkbox error>
      text
    </Checkbox>
  );
};

ErrorCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async showError(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: "#test-element" });

          const error = await element.takeScreenshot();

          await expect({ error }).to.matchImages();
        }
      }
    }
  }
};

export const WarningCheckbox = () => {
  const [checked, update] = React.useState(false);
  return (
    <Checkbox warning checked={checked} onValueChange={update}>
      text
    </Checkbox>
  );
};

WarningCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async warning(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: "#test-element" });
          const image = await element.takeScreenshot();

          await expect({ image }).to.matchImages();
        },
        async warningChecked(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: "#test-element" });
          const checkbox = await this.browser.findElement({ css: "[data-comp-name~=Checkbox]" });

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          const image = await element.takeScreenshot();

          await expect({ image }).to.matchImages();
        }
      }
    }
  }
}
