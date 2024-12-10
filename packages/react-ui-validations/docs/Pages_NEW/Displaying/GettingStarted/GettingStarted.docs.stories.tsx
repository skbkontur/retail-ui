import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';

export default {
  title: 'Displaying/Getting started',
  parameters: { creevey: { skip: true } },
} as Meta;

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
