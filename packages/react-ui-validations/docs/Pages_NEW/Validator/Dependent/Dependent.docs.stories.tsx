import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';

import { ValidationContainer, ValidationWrapper, createValidator } from '../../../../src';
import { Form } from '../../../Common/Form';

export default {
  title: 'Validator/Dependent',
  parameters: { creevey: { skip: true } },
} as Meta;

export const Dependent: Story = () => {
  interface Data {
    onlyDigits: boolean;
    value: string;
  }

  const validate = createValidator<Data>((b, root) => {
    b.prop(
      (x) => x.value,
      (b) => {
        b.invalid((x) => root.onlyDigits && !/^\d*$/.test(x), 'Только цифры');
      },
    );
  });

  const [value, setValue] = React.useState<string>('');
  const [onlyDigits, setOnlyDigits] = React.useState<boolean>(false);

  const validationInfo = validate({ value, onlyDigits });
  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Только цифры">
          <Toggle checked={onlyDigits} onValueChange={setOnlyDigits} />
        </Form.Line>
        <Form.Line title="Значение">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.value).get()}>
            <Input placeholder={onlyDigits ? 'Только цифры' : 'Любые символы'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};
