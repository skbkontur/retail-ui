import React from 'react';
import { Textarea } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper, createValidator } from '@skbkontur/react-ui-validations/src';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Textarea',
  component: Textarea,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleValidation: Story = () => {
  const validate = createValidator((b) => {
    b.prop(
      (x) => x,
      (b) => {
        b.invalid((x) => !x, 'Укажите информацию', 'immediate');
        b.invalid((x) => x.trim().length < 10, 'Минимум 10 символов', 'lostfocus', 'warning');
      },
    );
  });
  const [value, setValue] = React.useState('');
  const validationInfo = validate(value);
  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={validationInfo.getNode((x) => x).get()}>
        <Textarea placeholder="Введите текст" value={value} onValueChange={setValue} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
