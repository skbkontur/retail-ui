import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Center } from '@skbkontur/react-ui/components/Center';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Modal } from '@skbkontur/react-ui/components/Modal';
import { CSFStory } from 'creevey';

import { text, ValidationContainer, ValidationWrapper } from '../src';

import { delay, validateValue } from './tools/tools';

export default { title: `ModalWithSingleInput` };

export const ModalInputStory: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  return (
    <ValidationContainer scrollOffset={115} ref={refContainer}>
      <Modal>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <div style={{ padding: 10 }}>
            <div
              style={{
                height: 1000,
                backgroundColor: '#eee',
              }}
            />
            <div
              data-tid="ClickArea"
              style={{
                textAlign: 'center',
                marginBottom: 10,
                padding: 10,
                border: '1px solid #ddd',
              }}
            >
              Click here
            </div>
            <ValidationWrapper
              data-tid="ValidationWrapper"
              validationInfo={validateValue(
                value,
                value.split(' ').length !== 2,
                'Значение должно состоять из двух слов',
              )}
              renderMessage={text('bottom')}
            >
              <Input data-tid="SingleInput" value={value} onValueChange={setValue} />
            </ValidationWrapper>
            <div
              style={{
                height: 1000,
                backgroundColor: '#eee',
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <span id="button-wrapper">
            <Button onClick={() => container && container.submit()} use="primary">
              Кнопка
            </Button>
          </span>
        </Modal.Footer>
      </Modal>
    </ValidationContainer>
  );
};

ModalInputStory.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-wrapper button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-wrapper button' }))
            .perform();
          await delay(1100);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'label' }))
            .sendKeys(`test test`)
            .perform();
          await delay(1100);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-wrapper button' }))
            .perform();
          await delay(1100);
          await this.expect(await this.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};

export const SmallModalInputStory: CSFStory<JSX.Element> = () => {
  const [value, setValue] = React.useState<string>('');
  const [container, refContainer] = React.useState<ValidationContainer | null>(null);
  const [outerContainer, refOuterContainer] = React.useState<ValidationContainer | null>(null);

  React.useEffect(() => {
    window.scrollTo(1000, 1000);
  }, []);

  return (
      <ValidationContainer ref={refOuterContainer}>
        <div>
          <h1>
            <Center>Header</Center>
          </h1>
          <div
            style={{
              height: 3000,
              width: 3000,
              background: `repeating-linear-gradient(
                              45deg,
                              #606dbc,
                              #606dbc 10px,
                              #465298 10px,
                              #465298 20px
                            )`,
            }}
          />

          <ValidationWrapper
            data-tid="ValidationWrapper"
            validationInfo={validateValue(
              value,
              value.split(' ').length !== 2,
              'Значение должно состоять из двух слов',
            )}
            renderMessage={text('bottom')}
          >
            <Input data-tid="SingleInput" value={value} onValueChange={setValue} />
          </ValidationWrapper>
          <h2>
            <Center>Footer</Center>
          </h2>
        </div>

        <Modal>
          <ValidationContainer scrollOffset={115} ref={refContainer}>
            <Modal.Header>Заголовок</Modal.Header>
            <Modal.Body>
              <div style={{ padding: 10 }}>
                <div
                  data-tid="ClickArea"
                  style={{
                    textAlign: 'center',
                    marginBottom: 10,
                    padding: 10,
                    border: '1px solid #ddd',
                  }}
                >
                  Click here
                </div>
                <ValidationWrapper
                  data-tid="ValidationWrapper"
                  validationInfo={validateValue(
                    value,
                    value.split(' ').length !== 2,
                    'Значение должно состоять из двух слов',
                  )}
                  renderMessage={text('bottom')}
                >
                  <span id="input-wrapper">
                    <Input data-tid="SingleInput" value={value} onValueChange={setValue} />
                  </span>
                </ValidationWrapper>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div id="button-wrapper">
                <Button
                  onClick={() => {
                    if (container) {
                      container.submit();
                    }
                    if (outerContainer) {
                      outerContainer.submit();
                    }
                  }}
                  use="primary"
                >
                  Кнопка
                </Button>
              </div>
            </Modal.Footer>
          </ValidationContainer>
        </Modal>
      </ValidationContainer>
  );
};

SmallModalInputStory.story = {
  parameters: {
    creevey: {
      tests: {
        async ['not valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-wrapper button' }))
            .perform();
          await delay(1000);
          await this.expect(await this.takeScreenshot()).to.matchImage('notValid');
        },
        async ['valid']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#input-wrapper label' }))
            .sendKeys(`test test`)
            .perform();
          await delay(1100);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#button-wrapper button' }))
            .perform();
          await delay(1100);
          await this.expect(await this.takeScreenshot()).to.matchImage('valid');
        },
      },
    },
  },
};
