import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Gapped } from '@skbkontur/react-ui/components/Gapped/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import React from 'react';

import { ValidationContainer, ValidationWrapper } from '../../../index.js';
import type { ValidationInfo, ValidationBehaviour } from '../../../index.js';
import type { Meta, Story } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/Types.js';
import { Form } from '../../Common/Form.js';
import { SpaceFiller } from '../../Common/SpaceFiller.js';

const meta: Meta = {
  title: 'ValidationContainer',
  parameters: { creevey: { skip: true } },
};

export default meta;

export const FormValidity: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [immediate, setImmediate] = React.useState<string>('');
  const [lostfocus, setLostfocus] = React.useState<string>('');
  const [submit, setSubmit] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  function renderFormState() {
    switch (isValid) {
      case null:
        return <b>Отправьте форму</b>;
      case false:
        return <b style={{ color: '#d70c17' }}>Форма невалидна</b>;
      case true:
        return <b style={{ color: '#5199db' }}>Форма валидна</b>;
      default:
        throw new Error('Invalid state');
    }
  }

  function validate(v: string, type: ValidationBehaviour): Nullable<ValidationInfo> {
    return !/^\d*$/.test(v) ? { message: 'Только цифры', type } : null;
  }

  async function handleSubmit(): Promise<void> {
    const isValid = Boolean(await container.current?.validate());
    setIsValid(isValid);
  }

  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title={'immediate'}>
          <ValidationWrapper validationInfo={validate(immediate, 'immediate')}>
            <Input
              placeholder={'Только цифры'}
              value={immediate}
              onValueChange={(value) => {
                setImmediate(value);
                setIsValid(null);
              }}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title={'lostfocus'}>
          <ValidationWrapper validationInfo={validate(lostfocus, 'lostfocus')}>
            <Input
              placeholder={'Только цифры'}
              value={lostfocus}
              onValueChange={(value) => {
                setLostfocus(value);
                setIsValid(null);
              }}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title={'submit'}>
          <ValidationWrapper validationInfo={validate(submit, 'submit')}>
            <Input
              placeholder={'Только цифры'}
              value={submit}
              onValueChange={(value) => {
                setSubmit(value);
                setIsValid(null);
              }}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.ActionsBar>
          <Gapped wrap verticalAlign="middle">
            <Button use={'primary'} onClick={handleSubmit}>
              Отправить
            </Button>
            {renderFormState()}
          </Gapped>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};

export const ScrollToValidation: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [value0, setValue0] = React.useState<string>('');
  const [value1, setValue1] = React.useState<string>('');
  const [value2, setValue2] = React.useState<string>('');
  const [value3, setValue3] = React.useState<string>('');

  function validate(value: string): Nullable<ValidationInfo> {
    if (!value) {
      return { message: 'Укажите значение', type: 'submit' };
    }
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры' };
    }
    return null;
  }

  async function handleSubmit(): Promise<void> {
    await container.current?.submit();
  }

  return (
    <ValidationContainer ref={container}>
      <Form>
        <SpaceFiller height={200}>Пустое место 200px</SpaceFiller>

        <Form.Line title={'Поле 0'}>
          <ValidationWrapper validationInfo={validate(value0)}>
            <Input placeholder={'Только цифры'} value={value0} onValueChange={setValue0} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title={'Поле 1'}>
          <ValidationWrapper validationInfo={validate(value1)}>
            <Input placeholder={'Только цифры'} value={value1} onValueChange={setValue1} />
          </ValidationWrapper>
        </Form.Line>

        <SpaceFiller height={1600}>Пустое место 1600px</SpaceFiller>

        <Form.Line title={'Поле 2'}>
          <ValidationWrapper validationInfo={validate(value2)}>
            <Input placeholder={'Только цифры'} value={value2} onValueChange={setValue2} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title={'Поле 3'}>
          <ValidationWrapper validationInfo={validate(value3)}>
            <Input placeholder={'Только цифры'} value={value3} onValueChange={setValue3} />
          </ValidationWrapper>
        </Form.Line>

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Отправить
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};
