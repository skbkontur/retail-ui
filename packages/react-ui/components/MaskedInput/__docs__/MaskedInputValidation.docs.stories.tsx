import { Gapped, MaskedInput } from '@skbkontur/react-ui';
import { ValidationContainer, type ValidationInfo, ValidationWrapper } from '@skbkontur/react-ui-validations';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/utility-types.js';

export default {
  title: 'Input data/MaskedInput',
  component: MaskedInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleValidation: Story = () => {
  const [value, setValue] = React.useState<string>('/');
  function validate(value: string): Nullable<ValidationInfo> {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'immediate' } : null;
  }
  return (
    <ValidationContainer>
      <Gapped>
        <label htmlFor="input-id">Номер</label>
        <ValidationWrapper validationInfo={validate(value)}>
          <MaskedInput mask="9999" placeholder={'Только цифры'} value={value} onValueChange={setValue} />
        </ValidationWrapper>
      </Gapped>
    </ValidationContainer>
  );
};
