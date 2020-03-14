import until from 'selenium-webdriver/lib/until';

export default {
  title: '_TestRetreat',
};

// Utils

/**
 * Ожидает, пока пройдёт указанное кол-во милисекунд
 *
 * @param driver
 * @param msTime
 */
async function sleep(driver: WebDriver, msTime: number) {
  let isDone = false;
  setTimeout(() => (isDone = true), msTime);
  await driver.wait(() => isDone, msTime);
}

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

export const BasicLink = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Link href="#">Base link</Link>
    </div>
  );
};

/**
 *  Link. Клик по ссылке
 *
 *  0. История BasicLink
 *  1. Найти элемент на странице
 *  2. Наведение на ссылку
 *  3. 📸 состояние "hover"
 *  4. Нажать клавишу MOUSE_DOWN
 *  5. 📸 состояние “зажатая кнопка мыши”
 *  4. Нажать клавишу MOUSE_UP
 *  5. 📸 состояние “кликнули по ссылке”
 *
 *  Profit!
 */

BasicLink.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const link = await this.browser.findElement({ css: 'a' });

          const started = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: link })
            .perform();

          const hovered = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .press()
            .perform();

          const pressed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click()
            .perform();

          const clicked = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ x: 0, y: 0 })
            .perform();

          const activated = await element.takeScreenshot();

          await expect({ started, hovered, pressed, clicked, activated }).to.matchImages();
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

export const BasicToggle = () => {
  const initialState = false;
  const [checked, checkSet] = React.useState(initialState);
  const toggleCheck = () => {
    checkSet(!checked);
  };
  return (
    <div>
      <Toggle checked={checked} onChange={toggleCheck} /> {checked ? 'On' : 'Off'}
    </div>
  );
};

/**
 * Toggle. Переключение
 *
 *  0. История BasicToggle
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на переключатель
 *  4. 📸 состояние “hover”
 *  5. Фокус на переключателе
 *  6. 📸 состояние "в фокусе"
 *  7. Кликнуть на переключатель
 *  8. 📸 состояние "включен"
 *  Profit!
 */

BasicToggle.story = {
  parameters: {
    creevey: {
      tests: {
        async toggleItem(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const inputLabel = await this.browser.findElement({ css: 'label' });

          const defaultToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: inputLabel })
            .perform();

          const hoverToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: inputLabel })
            .press()
            .perform();

          const focusToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(inputLabel)
            .perform();

          const toggled = await element.takeScreenshot();

          await expect({ defaultToggle, hoverToggle, focusToggle, toggled }).to.matchImages();
        },
      },
    },
  },
};

export const SimpleTabs = () => {
  const initialState = 'first';
  const [current, currentSet] = React.useState(initialState);
  const changeHandler = (value: string) => currentSet(value);

  return (
    <Tabs value={current} onValueChange={changeHandler}>
      <Tabs.Tab id="first">first</Tabs.Tab>
      <Tabs.Tab disabled id="second">
        second (disabled)
      </Tabs.Tab>
      <Tabs.Tab id="third">third</Tabs.Tab>
    </Tabs>
  );
};

/**
 * Tabs. Выбор нужного таба
 *
 *  0. История BasicToggle
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на таб
 *  4. 📸 состояние “hover”
 *  5. Фокус на табе
 *  6. 📸 состояние "в фокусе"
 *  7. Кликнуть на таб
 *  8. 📸 состояние "включен"
 *
 *  Profit!
 */

SimpleTabs.story = {
  parameters: {
    creevey: {
      tests: {
        async selectTab(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const thirdTab = await this.browser.findElement({ css: 'a[data-prop-id~=third]' });

          const defaultToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: thirdTab })
            .perform();

          const hoverTab = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(thirdTab)
            .perform();

          const activeTabChanged = await element.takeScreenshot();

          await expect({ defaultToggle, hoverTab, activeTabChanged }).to.matchImages();
        },

        async selectDisabledTab(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const secondTab = await this.browser.findElement({ css: 'a[data-prop-id~=second]' });

          const defaultToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: secondTab })
            .perform();

          const hoverTab = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(secondTab)
            .perform();

          const activeTabChanged = await element.takeScreenshot();

          await expect({ defaultToggle, hoverTab, activeTabChanged }).to.matchImages();
        },

        async selectActiveTab(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const firstTab = await this.browser.findElement({ css: 'a[data-prop-id~=first]' });

          const defaultToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: firstTab })
            .perform();

          const hoverTab = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(firstTab)
            .perform();

          const activeTabChanged = await element.takeScreenshot();

          await expect({ defaultToggle, hoverTab, activeTabChanged }).to.matchImages();
        },
      },
    },
  },
};

export const ComplexToast = () => {
  function showComplexNotification() {
    Toast.push('Successfully saved', {
      label: 'Cancel',
      handler: () => Toast.push('Canceled'),
    });
  }

  return (
    <div style={{ height: '100px', width: '100vw' }} id="test-element-wrapper">
      <Button onClick={showComplexNotification}>Show notification</Button>
    </div>
  );
};

/**
 * ComplexToast. Тост с действиями
 *
 * 0. История showToast
 * 1. Найти контрол вызова тоста
 * 2. Клик по контролу
 * 3. 📸 тост появился
 *
 * 0. История hideToast
 * 1. Найти контрол вызова тоста
 * 2. Клик по контролу
 * 3. Тост появился
 * 4. 📸 спустя 7сек тост закрылся
 * 5. Клик по контролу
 * 6. Тост появился
 * 7. Навести мышь на тост
 * 8. 📸 спустя 7сек тост не закрылся
 *
 *  Profit!
 */

ComplexToast.story = {
  parameters: {
    creevey: {
      tests: {
        async showToast(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element-wrapper' });
          const toastControl = await this.browser.findElement({ css: 'button' });

          await this.browser
            .actions({ bridge: true })
            .click(toastControl)
            .perform();

          await this.browser.wait(until.elementLocated({ css: '[data-tid~="ToastView__root"]' }), 3000);
          const toastToggled = await element.takeScreenshot();

          await expect({ toastToggled }).to.matchImages();
        },

        async hideToast(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element-wrapper' });
          const toastControl = await this.browser.findElement({ css: 'button' });

          await this.browser
            .actions({ bridge: true })
            .click(toastControl)
            .perform();

          await this.browser.wait(until.elementLocated({ css: '[data-tid~="ToastView__root"]' }), 3000);
          await sleep(this.browser, 7000);

          const toastClosedTimeout = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(toastControl)
            .perform();

          const toast = await this.browser.wait(until.elementLocated({ css: '[data-tid~="ToastView__root"]' }), 3000);
          await this.browser
            .actions({ bridge: true })
            .move({ origin: toast })
            .perform();

          await sleep(this.browser, 7000);
          const toastNotClosingOnHover = await element.takeScreenshot();

          await expect({ toastClosedTimeout, toastNotClosingOnHover }).to.matchImages();
        },
      },
    },
  },
};
