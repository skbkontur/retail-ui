import React from 'react';
import { Input } from '@skbkontur/react-ui';
import { type ValidationInfo, ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations/src';

import type { Meta, Story } from '../../../typings/stories';
import type { Nullable } from '../../../typings/utility-types';

export default {
  title: 'Input data/Input',
  component: Input,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');
  function validate(value: string): Nullable<ValidationInfo> {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'lostfocus' } : null;
  }
  return (
    <ValidationContainer>
      <Gapped>
        <label htmlFor="input-id">Номер</label>
        <ValidationWrapper validationInfo={validate(value)}>
          <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />
        </ValidationWrapper>
      </Gapped>
    </ValidationContainer>
  );
};
