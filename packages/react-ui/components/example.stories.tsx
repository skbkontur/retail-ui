import { OkIcon } from './internal/icons/16px';

export default {
  title: '😌 TestRetreat',
};

export const LinkPressedThenReleased = () => {
  return (
    <Link>Enabled</Link>
  );
}

/**
 * Link
 * 
 * 0. История LinkPressedThenReleased
 * 1. Найти элемент на странице
 * 2. Сделать скриншот дефолтного состояния
 * 3. Навести курсор на ссылку
 * 4. Сделать скриншот состояния hover
 * 5. Нажать на ссылку
 * 6. Сделать скриншот состояния pressed/mouseDown
 * 7. Отпустить ссылку
 * 8. Сделать скриншот состояния hover
 */

LinkPressedThenReleased.story = {
  parameters: {
    creevey: {
      tests: {
        async pressedThenReleased(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const link = await this.browser.findElement({ css: '[data-comp-name~=Link]' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: link })
            .perform();

          const hover = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .press()
            .perform();

          const pressed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .release()
            .perform();

          const released = await element.takeScreenshot();

          await expect({ idle, hover, pressed, released }).to.matchImages();
        },
      },
    },
  },
};


export const LinkFocused = () => {
  return (
    <Link>Enabled</Link>
  );
}

LinkFocused.story = {
  parameters: {
    creevey: {
      tests: {
        async hover(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.TAB)
            .perform();

          const focused = await element.takeScreenshot();

          await expect({ focused }).to.matchImages();
        },
      },
    },
  },
};



export const LinkDisabled = () => {
  return (
    <Link disabled={true}>Disabled</Link>
  );
}

/**
 * Link
 * 
 * 0. История LinkDisabled
 * 1. Найти элемент на странице
 * 2. Сделать скриншот задизабленного состояния
 * 3. Навести курсор на ссылку
 * 4. Сделать скриншот состояния hover
 */

LinkDisabled.story = {
  parameters: {
    creevey: {
      tests: {
        async hover(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const link = await this.browser.findElement({ css: '[data-comp-name~=Link]' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: link })
            .perform();

          const hover = await element.takeScreenshot();

          await expect({ idle, hover }).to.matchImages();
        },
      },
    },
  },
};

export const LinkWithIcon = () => {
  return (
    <Link icon={<OkIcon/>}>OK</Link>
  );
}

export const LinkWithSpaces = () => {
  return (
    <Link>Link with spaces</Link>
  );
}

export const LinkSuccess = () => {
  return (
    <Link use="success">Link with spaces</Link>
  );
}

export const LinkDanger = () => {
  return (
    <Link use="danger">Link with spaces</Link>
  );
}

export const LinkGrayed = () => {
  return (
    <Link use="grayed">Link with spaces</Link>
  );
}

// TODO повторить первый тест для состояний выше


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
