import React from 'react';
import { action } from '@storybook/addon-actions';

import { Nullable } from '../typings/utility-types'

import { Button } from './Button';
import { Toast } from './Toast';
import { Tooltip } from './Tooltip';
import { Indeterminate } from './Checkbox/__stories__/Checkbox.stories';
import { Input } from './Input';


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

export const ToastDissapearWhenNext = () => {
  let toast1: Nullable<Toast>;
  let toast2: Nullable<Toast>;

    return (
      <div style={{ padding: '4px 200px 200px 4px' }}>
        <Toast ref={el => (toast1 = el)} onClose={action('close')} onPush={action('push')} />
        <Toast ref={el => (toast2 = el)} onClose={action('close')} onPush={action('push')} />
        <div style={{ padding: '4px 200px 200px 4px' }} />
        <Button data-tid="firstButton" onClick={showToast1}>Show 1st toast</Button>
        <Button data-tid="secondButton" onClick={showToast2}>Show 2nd toast</Button>
      </div>
    );

  function showToast1() {
    if (toast1) {
      toast1.push('Toast with long name long long');
    }
  }

  function showToast2() {
    if (toast2) {
      toast2.push('Toast');
    }
  }
};


// BUG: Не выполняется требование гайдов:
// Всегда показывается только 1 тост. Перед появлением следующего тоста, текущий скрывается, даже если время его показа еще не истекло.

// 0. Кнопка 1 вызывает длинный тост. Кнопка 2 вызывает короткий тост
// 1. Найти кнопку 1. Нажать ее, запустить таймер на 1 секунду
// 2. По истечению таймера сфотографировать 1 тост
// 3. Найти кнопку 2. Нажать ее, запустить таймер на 1 сек
// 4. По истечению таймера сфотографировать 2 тост (1 пропал)

ToastDissapearWhenNext.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const button1 = await this.browser.findElement({ css: '[data-tid~=firstButton]' });
          const button2 = await this.browser.findElement({ css: '[data-tid~=secondButton]' });

          await this.browser
            .actions({bridge: true})
            .click(button1)
            .perform();

          const toast1 = await element.takeScreenshot();

          await this.browser
            .actions({bridge: true})
            .click(button2)
            .perform();

          const toast2 = await element.takeScreenshot();

          await expect({ toast1, toast2 }).to.matchImages();
        },
      },
    },
  },
};


// 0. Имеется поле ввода и тултип с кнопкой, по клику на которую поле ввода фокусится
// 1. Триггерим тултип по клику, сфотографируем
// 2. Кликаем по кнопке в тултипе
// 3. Тултип должен закрыться, сфотографируем

export const ToolptipWithLinkInside = () => {
  let input: Nullable<Input>;

  const renderTooltip = () => {
    return <div>
      Text and <Button onClick={handleButtonClick} data-tid={`buttonToClick`} use="link">Button</Button>
    </div>
  };

  const handleButtonClick = () => {
    if (input) {
      input.focus();
    }
  };

  return <div>
    <Tooltip trigger="click" render={renderTooltip}>
      <Input data-tid={`inputWithTooltip`}/>
    </Tooltip>
    <div><Input ref={el => (input = el)} data-tid={`inputToFocus`}/></div>
  </div>
};

ToolptipWithLinkInside.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: {browser: WebDriver}) {
          const element = await this.browser.findElement({css: `#test-element`});
          const inputField1 = await this.browser.findElement( {css: `[data-tid~=inputWithTooltip]`});

          await this.browser
            .actions({bridge: true})
            .click(inputField1)
            .perform();

          const tooltip = await element.takeScreenshot();

          const button = await this.browser.findElement({css: `[data-tid~=buttonToClick]`});

          await this.browser
            .actions({bridge: true})
            .click(button)
            .sendKeys(`this is very long text to enter into inputField`)
            .perform();

          const focusedInputWithText = await element.takeScreenshot();

          await expect({ tooltip, focusedInputWithText }).to.matchImages();
        }
      }
    }
  }
}
