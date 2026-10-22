import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import React from 'react';

import { ValidationContainer, ValidationWrapper, text, tooltip } from '../../../index.js';
import type { ValidationInfo } from '../../../index.js';
import type { Meta, Story } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/Types.js';
import { Form } from '../../Common/Form.js';
import { SpaceFiller } from '../../Common/SpaceFiller.js';

const meta: Meta = {
  title: 'ValidationWrapper',
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ImmediateValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');

  function validate(value: string): Nullable<ValidationInfo> {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'immediate' } : null;
  }

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Номер">
          <ValidationWrapper validationInfo={validate(value)}>
            <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const LostfocusValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');
  function validate(value: string): Nullable<ValidationInfo> {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'lostfocus' } : null;
  }
  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Номер">
          <ValidationWrapper validationInfo={validate(value)}>
            <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const SubmitValidation: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [value, setValue] = React.useState<string>('');
  function validate(value: string): Nullable<ValidationInfo> {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'submit' } : null;
  }
  async function handleSubmit(): Promise<void> {
    await container.current?.submit();
  }

  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="Номер">
          <ValidationWrapper validationInfo={validate(value)}>
            <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />
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

export const ValidationError: Story = () => {
  const validate = (value: string): Nullable<ValidationInfo> => {
    if (!/^\d*$/.test(value)) {
      return { message: 'Разрешены только цифры', type: 'lostfocus' };
    }

    return null;
  };

  const [value, setValue] = React.useState('');
  const validationInfo = validate(value);

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="error">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={text()}>
            <Input width={250} placeholder={'Только цифры'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const ValidationWarning: Story = () => {
  const validate = (value: string): Nullable<ValidationInfo> => {
    if (!/^\d*$/.test(value)) {
      return {
        message: 'Если возможно - используйте только цифры',
        level: 'warning',
        type: 'lostfocus',
      };
    }
    return null;
  };

  const [value, setValue] = React.useState('');
  const validationInfo = validate(value);

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="warning">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={text()}>
            <Input width={250} placeholder={'Можно и буквы, но лучше цифры'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const TextValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');

  function renderInput() {
    return <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />;
  }

  function validate(value: string): Nullable<ValidationInfo> {
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры', type: 'lostfocus' };
    }
    return null;
  }

  const validationInfo = validate(value);

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="text()">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={text()}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="text('right')">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={text('right')}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="text('bottom')">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={text('bottom')}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const TooltipValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');
  function renderInput() {
    return <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />;
  }

  function validate(value: string): Nullable<ValidationInfo> {
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры', type: 'lostfocus' };
    }
    return null;
  }

  const validationInfo = validate(value);
  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="default">
          <ValidationWrapper validationInfo={validationInfo}>{renderInput()}</ValidationWrapper>
        </Form.Line>
        <Form.Line title="tooltip('right top')">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={tooltip('right top')}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="tooltip('top left')">
          <ValidationWrapper validationInfo={validationInfo} renderMessage={tooltip('top left')}>
            {renderInput()}
          </ValidationWrapper>
        </Form.Line>
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
