import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input/Input';

import type { Meta, Story } from '../../../../typings/stories.js';
import { ValidationContainer, ValidationWrapper } from '../../../../index.js';
import { Form } from '../../../Common/Form.js';

const meta: Meta = {
  title: 'Displaying/Getting started',
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ConditionalValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');
  const validationInfo = !/^\d*$/.test(value) ? { message: 'Только цифры' } : null;

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Номер">
          <ValidationWrapper validationInfo={validationInfo}>
            <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const StaticValidation: Story = () => {
  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Поле с ошибкой">
          <ValidationWrapper validationInfo={{ message: <b>Ошибка</b> }}>
            <Input value={'bad'} />
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="Поле без ошибки">
          <ValidationWrapper validationInfo={null}>
            <Input value={'ok'} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};
