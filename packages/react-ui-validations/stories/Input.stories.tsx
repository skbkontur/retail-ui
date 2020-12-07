import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Select } from '@skbkontur/react-ui/components/Select';
import { CSFStory } from 'creevey';

import { text, ValidationContainer, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

import { delay, submit, validateValue } from './tools/tools';

export default { title: `Input` };

const styles = {
  display: 'inline-block',
  verticalAlign: 'middle',
  minWidth: '350px',
  minHeight: '80px',
};

const stylesWithTooltip = {
  display: 'inline-block',
  verticalAlign: 'middle',
  minWidth: '600px',
  padding: '5px',
};

export const Example1: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  return (
    <div id="small-input-wrapper" style={styles}>
      <ValidationContainer>
        <div style={{ padding: 10 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value,
              value.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
            renderMessage={text('bottom')}
          >
            <Input value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    </div>
  );
};

Example1.story = {
  name: `1. Простое сообщение`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys('Test')
            .sendKeys(this.keys.TAB)
            .perform();
          const element = await this.browser.findElement({ css: '#small-input-wrapper' });
          await this.expect(await element.takeScreenshot()).to.matchImage('notValid');
        },
        async ['valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys('Test Test')
            .sendKeys(this.keys.TAB)
            .perform();
          const element = await this.browser.findElement({ css: '#small-input-wrapper' });
          await this.expect(await element.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};

export const Example2: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  return (
    <div id="small-input-wrapper" style={styles}>
      <ValidationContainer>
        <div style={{ padding: 10 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value,
              value.split(' ').length !== 2,
              <div>Значение должно состоять из двух слов</div>,
            )}
            renderMessage={text('bottom')}
          >
            <Input value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    </div>
  );
};

// Example2.storyName = `2. ReactElement в сообщении`;

Example2.story = {
  name: `2. ReactElement в сообщении`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#small-input-wrapper input' }))
            .sendKeys('Test')
            .sendKeys(this.keys.TAB)
            .perform();
          const element = await this.browser.findElement({ css: '#small-input-wrapper' });
          await this.expect(await element.takeScreenshot()).to.matchImage('notValid');
        },
        async ['valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys('Test Test')
            .sendKeys(this.keys.TAB)
            .perform();
          const element = await this.browser.findElement({ css: '#small-input-wrapper' });
          await this.expect(await element.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};

export const Example3: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);

  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 10 }}>
        <span id="button-top">
          <Button onClick={() => submit(container)}>Отправить</Button>
        </span>
        <div style={{ height: 1000, backgroundColor: 'eee' }} />
        <div id="small-input-wrapper" style={styles}>
          <ValidationWrapper
            validationInfo={validateValue(
              value,
              value.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
            renderMessage={text('bottom')}
          >
            <Input value={value} onValueChange={setValue} />
          </ValidationWrapper>
          <span id="button">
            <Button onClick={() => submit(container)}>Отправить</Button>
          </span>
        </div>
        <div style={{ height: 1000, backgroundColor: 'eee' }} />
        <span id="button-bottom">
          <Button onClick={() => submit(container)}>Отправить</Button>
        </span>
      </div>
    </ValidationContainer>
  );
};

Example3.story = {
  name: `3. Промотка сообщении`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid after click top button']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-top button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['not valid after click middle button']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button button' }))
            .perform();
          await delay(1500);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['not valid after click bottom button']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-bottom button' }))
            .perform();
          await delay(2000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button button' }))
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys('test test')
            .click(this.browser.findElement({ css: '#button button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};

export const Example4: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer} scrollOffset={{ top: 150, bottom: 150 }}>
      <div
        id="button-top"
        style={{
          position: 'fixed',
          zIndex: 1000,
          top: 0,
          right: 0,
          left: 0,
          background: '#1e79be',
          padding: 10,
          height: 80,
        }}
      >
        <Button onClick={() => submit(container)}>Отправить сверху</Button>
      </div>
      <div style={{ padding: 10 }}>
        <div style={{ height: 600, backgroundColor: '#eee' }} />
        <div id="small-input-wrapper" style={stylesWithTooltip}>
          <ValidationWrapper
            validationInfo={validateValue(
              value,
              value.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </div>
        <div style={{ height: 1000, backgroundColor: '#eee' }} />
      </div>
      <div
        id="button-bottom"
        style={{
          position: 'fixed',
          zIndex: 1000,
          top: 600,
          right: 0,
          left: 0,
          bottom: 0,
          background: '#1e79be',
          padding: 10,
          height: 80,
        }}
      >
        <Button onClick={() => submit(container)}>Отправить снизу</Button>
      </div>
    </ValidationContainer>
  );
};

Example4.story = {
  name: `4. Промотка с фиксированной плашкой снизу`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid after click top button']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-top button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['not valid after click bottom button']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-bottom button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            // .click(this.browser.findElement({ css: '#button-top button' }))
            .click(this.browser.findElement({ css: '#small-input-wrapper input' }))
            .sendKeys('Test Test')
            .perform();
          await delay(1000);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-top button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};

type Sex = 'male' | 'female';

export const Example5: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [type, setType] = React.useState<Nullable<Sex>>(null);
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 10 }}>
        <Select<Nullable<Sex>> items={['male', 'female']} value={type} onValueChange={setType} />
        <ValidationWrapper
          validationInfo={validateValue(value, type !== null && value !== type, `Значение должно быть равно type.`)}
          renderMessage={text('bottom')}
        >
          <Input value={value} onValueChange={setValue} />
        </ValidationWrapper>
        <div style={{ height: 1000, backgroundColor: 'eee' }} />
        <Button onClick={() => container && container.submit()}>Отправить</Button>
      </div>
    </ValidationContainer>
  );
};

Example5.story = {
  name: `5. Зависимые поля`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['not valid 2']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
            .perform();
          await delay(1000);

          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name="MenuItem"]' }))
            .perform();
          await delay(1000);

          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys(`test`)
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};

export const Example6: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 50 }}>
        <br />
        <br />
        <br />
        <br />
        <div style={{ height: 300, width: 300, overflow: 'scroll' }}>
          <div style={{ height: 1000, width: 1000, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 500, left: 500 }}>
              <ValidationWrapper
                validationInfo={validateValue(
                  value,
                  value.split(' ').length !== 2,
                  'Значение должно состоять из двух слов',
                )}
                renderMessage={text('bottom')}
              >
                <Input value={value} onValueChange={setValue} />
              </ValidationWrapper>
            </div>
          </div>
        </div>
        <Button onClick={() => container && container.submit()}>Отправить</Button>
      </div>
    </ValidationContainer>
  );
};

Example6.story = {
  name: `6. Промотка внутри котейнера`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
      },
    },
  },
};

export const Example7: CSFStory<JSX.Element> = () => {
  const [value1, setValue1] = React.useState<string>('');
  const [value2, setValue2] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 50, height: 200, position: 'relative' }}>
        <div id="input-wrapper-1" style={{ position: 'absolute', top: 100 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value1,
              value1.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value1} onValueChange={setValue1} />
          </ValidationWrapper>
        </div>
        <div id="input-wrapper-2" style={{ position: 'absolute', top: 20 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value2,
              value2.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value2} onValueChange={setValue2} />
          </ValidationWrapper>
        </div>
      </div>
      <Button onClick={() => container && container.submit()}>Отправить</Button>
    </ValidationContainer>
  );
};

Example7.story = {
  name: `7. Выбор первого контра для валидации`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['not valid 2']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#input-wrapper-2 input' }))
            .sendKeys(`test test`)
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid2');
        },
        async ['not valid 3']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#input-wrapper-1 input' }))
            .sendKeys(`test test`)
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid3');
        },
        async ['valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#input-wrapper-1 input' }))
            .sendKeys(`test test`)
            .click(this.browser.findElement({ css: '#input-wrapper-2 input' }))
            .sendKeys(`test test`)
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};

export const Example8: CSFStory<JSX.Element> = () => {
  const [value1, setValue1] = React.useState<string>('');
  const [value2, setValue2] = React.useState<string>('');
  const [value3, setValue3] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer ref={refContainer}>
      <div>
        <div id="input-wrapper-1" style={{ padding: 20 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value1,
              value1.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value1} onValueChange={setValue1} />
          </ValidationWrapper>
        </div>
        <div id="input-wrapper-2" style={{ padding: 20 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value2,
              value2.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value2} onValueChange={setValue2} />
          </ValidationWrapper>
        </div>
        <div id="input-wrapper-3" style={{ padding: 20 }}>
          <ValidationWrapper
            validationInfo={validateValue(
              value3,
              value3.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
          >
            <Input value={value3} onValueChange={setValue3} />
          </ValidationWrapper>
        </div>
      </div>
      <Button onClick={() => container && container.submit()}>Отправить</Button>
    </ValidationContainer>
  );
};

Example8.story = {
  name: `8. Три невалидных поля по сабмиту`,
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#input-wrapper-1 input' }))
            .sendKeys(`test test`)
            .click(this.browser.findElement({ css: '#input-wrapper-2 input' }))
            .sendKeys(`test test`)
            .click(this.browser.findElement({ css: '#input-wrapper-3 input' }))
            .sendKeys(`test test`)
            .click(this.browser.findElement({ css: 'button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};
