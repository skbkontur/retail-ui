import React, { useRef, useState } from 'react';

import { Checkbox } from './Checkbox';

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

export const CheckBoxDefault = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const checkbox = useRef<Checkbox>(null);

  const handleChangeIndeterminate = () => {
    const currentCheckBox = checkbox?.current;
    if (currentCheckBox?.state.indeterminate) {
      currentCheckBox?.resetIndeterminate();
    } else {
      currentCheckBox?.setIndeterminate();
    }
  };

  return (
    <section>
      <Checkbox ref={checkbox} checked={checked} onClick={() => setChecked(!checked)} />
      <br />
      <br />
      <Button onClick={handleChangeIndeterminate}>Изменить initialIndeterminate</Button>
    </section>
  );
};

/**
 *  CheckBox.
 *
 *  0. История CheckBoxDefault
 *  1. Найти элемент на странице
 *  2. hover
 *  3. 📸 состояние hovered
 *  4. click
 *  5. 📸 состояние clicked
 *  7. indeterminate
 *  8. 📸 состояние indeterminate
 *  9. reset indeterminate
 *  10. 📸 состояние reset indeterminate
 *
 */

CheckBoxDefault.story = {
  parameters: {
    creevey: {
      tests: {
        async hover(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const checkbox = await this.browser.findElement({ css: '[data-comp-name~=Checkbox]' });
          const button = await this.browser.findElement({ css: 'button' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: checkbox })
            .perform();
          const hover = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();
          const checked = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();
          const unChecked = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(button)
            .perform();
          const setInitialIndeterminate = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(button)
            .perform();
          const resetInitialIndeterminate = await element.takeScreenshot();

          await expect({
            idle,
            hover,
            checked,
            unChecked,
            setInitialIndeterminate,
            resetInitialIndeterminate,
          }).to.matchImages();
        },
      },
    },
  },
};

export const InputWithError = () => {
  const [value, setValue] = useState<string>('');
  const isError = value === 'error';
  const disabled = value === 'disabled';
  const warning = value === 'warning';

  return (
    <section>
      <Input
        value={value}
        error={isError}
        disabled={disabled}
        warning={warning}
        onChange={event => setValue(event.currentTarget.value)}
      />
    </section>
  );
};

/**
 *  Input.
 *
 *  0. История InputDefault
 *  1. Найти элемент на странице
 *  2. focus
 *  3. 📸 состояние focus
 *  4. ввести текст err
 *  5. 📸 состояние с текстом
 *  7. ввести текст error
 *  8. 📸 состояние error
 *  9. ввести текст disable
 *  10. 📸 состояние disable
 *
 */

InputWithError.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Input]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const focused = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('err')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('or')
            .perform();

          const withError = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .doubleClick(input)
            .sendKeys('warning')
            .perform();

          const withWarning = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .doubleClick(input)
            .sendKeys('disabled')
            .perform();

          const disabled = await element.takeScreenshot();

          await expect({ focused, typed, withError, withWarning, disabled }).to.matchImages();
        },
      },
    },
  },
};
