import React, { useState } from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';
import type { Meta } from '@storybook/react';

import type { ValidationInfo} from '../../src';
import { text, ValidationContainer, ValidationWrapper } from '../../src';
import type { Nullable } from '../../typings/Types';

export default {
  title: 'DependentInputs',
} as Meta;

export const Example_1 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  const validateValue1 = (): Nullable<ValidationInfo> => {
    if (value1 === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value1 !== value2.replace(/1$/, '')) {
      return { message: "Значение 1 должно быть равняться value + '1'" };
    }
    return null;
  };

  const validateValue2 = (): Nullable<ValidationInfo> => {
    if (value2 === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value1 + '1' !== value2) {
      return { message: "Значение 1 должно быть равняться value + '1'" };
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
        <ValidationWrapper
          data-tid="ValidationWrapper1"
          validationInfo={validateValue1()}
          renderMessage={text('bottom')}
        >
          <Input data-tid="Input1" value={value1} onValueChange={setValue1} />
        </ValidationWrapper>
        <br />
        <br />
        <br />
        <ValidationWrapper
          data-tid="ValidationWrapper2"
          validationInfo={validateValue2()}
          renderMessage={text('bottom')}
        >
          <Input data-tid="Input2" value={value2} onValueChange={setValue2} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};
