import React, { useEffect, useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Center } from '@skbkontur/react-ui/components/Center';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Modal } from '@skbkontur/react-ui/components/Modal';

import type { ValidationInfo } from '../src';
import { text, ValidationContainer, ValidationWrapper } from '../src';
import type { Nullable } from '../typings/Types';

export default {
  title: 'ModalWithSingleInput',
  parameters: { creevey: { captureElement: null } },
} as Meta;

export const Example1 = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<string>('');

  const validateValue = (): Nullable<ValidationInfo> => {
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return {
        message: 'Значение должно состоять из двух слов',
        type: 'lostfocus',
      };
    }
    return null;
  };

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
              validationInfo={validateValue()}
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
          <Button onClick={() => refContainer.current?.submit()} use="primary">
            Кнопка
          </Button>
        </Modal.Footer>
      </Modal>
    </ValidationContainer>
  );
};
export const Example2 = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const refOuterContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    window.scrollTo(1000, 1000);
  }, []);

  const validateValue = (): Nullable<ValidationInfo> => {
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return {
        message: 'Значение должно состоять из двух слов',
        type: 'lostfocus',
      };
    }
    return null;
  };

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

        <ValidationWrapper data-tid="ValidationWrapper" validationInfo={validateValue()} renderMessage={text('bottom')}>
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
                validationInfo={validateValue()}
                renderMessage={text('bottom')}
              >
                <Input data-tid="SingleInput" value={value} onValueChange={setValue} />
              </ValidationWrapper>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                refContainer.current?.submit();
                refOuterContainer.current?.submit();
              }}
              use="primary"
            >
              Кнопка
            </Button>
          </Modal.Footer>
        </ValidationContainer>
      </Modal>
    </ValidationContainer>
  );
};
