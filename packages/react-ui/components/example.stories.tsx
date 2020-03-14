export default {
  title: 'TestRetreat',
};

export const BasicCheckbox = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox
      checked={value}
      onValueChange={updateValue}
    >
      text
    </Checkbox>
  )
};

/**
 *  CheckBox. Состояние “hover”
 *
 *  0. История CheckBox
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на CheckBox
 *  4. 📸 состояние “hover”
 *  5. Наблюдаем изменение цвета фона
 *
 *  Profit!
 */

BasicCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: "#test-element" });
          // находим чекбокс
          const checkbox = await this.browser.findElement({ css: "[data-comp-name~=Checkbox]" });
          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: checkbox })
            .perform();

          // 4. делаем скриншот "при наведении"
          const afterClicked = await element.takeScreenshot();
          // 5. сравниваем результаты
          await expect({ idle, afterClicked }).to.matchImages();
        }
      }
    }
  }
};

export const CheckboxLongValue = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <>
      <div>
        <Checkbox
          checked={value}
          onValueChange={updateValue}
        >
          long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text
        </Checkbox>
      </div>
      <div>
        <Checkbox
          checked={value}
          onValueChange={updateValue}
        >
        </Checkbox>
      </div>
    </>
  )
};

/**
 *  CheckBox. Состояние “Длиинный текст и еще один чекбокс”
 *
 *  0. 📸 дефолтное состояние
 *
 *  Profit!
 */

CheckboxLongValue.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: "#test-element" });
          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();
          // 3. сравниваем результаты
          await expect({ idle }).to.matchImages();
        }
      }
    }
  }
};

export const IndeterminateCheckbox = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox
      checked={value}
      onValueChange={updateValue}
      initialIndeterminate
    >
      text
    </Checkbox>
  )
};

/**
 *  CheckBox. Состояние из промежуточного в checked
 *
 *  0. История CheckBox
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние - промежуточное
 *  3. Кликнуть на CheckBox
 *  4. 📸 состояние “checked”
 *  5. Наблюдаем изменение состояния
 *
 *  Profit!
 */

IndeterminateCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: "#test-element" });
          // находим чекбокс
          const checkbox = await this.browser.findElement({ css: "[data-comp-name~=Checkbox]" });
          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. кликаем на  checkbox
          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          // 4. делаем скриншот "checked"
          const afterClicked = await element.takeScreenshot();
          // 5. сравниваем результаты
          await expect({ idle, afterClicked }).to.matchImages();
        }
      }
    }
  }
};
