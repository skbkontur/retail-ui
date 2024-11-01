import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Input } from '@skbkontur/react-ui/components/Input';

import type { ValidationInfo} from '../../src';
import { text, ValidationContainer, ValidationWrapper } from '../../src';
import type { Nullable } from '../../typings/Types';

export default {
  title: 'SingleInput',
} as Meta;

export const Example_1 = () => {
  const [value, setValue] = useState<string>('');

  const validateValue = (): Nullable<ValidationInfo> => {
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: 'Значение должно состоять из двух слов', type: 'lostfocus' };
    }
    return null;
  };

  return (
    <ValidationContainer>
      <div style={{ padding: 10 }}>
        <div
          data-tid="ClickArea"
          style={{ textAlign: 'center', marginBottom: 10, padding: 10, border: '1px solid #ddd' }}
        >
          Click here
        </div>
        <ValidationWrapper data-tid="ValidationWrapper" validationInfo={validateValue()} renderMessage={text('bottom')}>
          <Input data-tid="SingleInput" value={value} onValueChange={setValue} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};
