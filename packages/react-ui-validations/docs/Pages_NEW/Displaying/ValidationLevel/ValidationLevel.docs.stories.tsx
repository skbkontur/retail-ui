import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, ValidationInfo, text } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Displaying/Validation level',
  parameters: { creevey: { skip: true } },
} as Meta;

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
