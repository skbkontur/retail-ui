import React, { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Switcher } from '@skbkontur/react-ui/components/Switcher/Switcher';

import type { ValidationInfo } from '../src';
import { ValidationContainer, ValidationWrapper } from '../src';
import type { Nullable } from '../typings/Types';

export default {
  title: 'Switcher',
} as Meta;

export const Required = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<string>('');

  const validateValue = (): Nullable<ValidationInfo> => {
    if (!value) {
      return { message: 'Поле обязательно', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={value === '' ? validateValue() : undefined}>
          <Switcher value={value} items={['string1', 'string2']} onValueChange={setValue} />
        </ValidationWrapper>
        <div style={{ padding: '20px 0' }}>
          <Button onClick={() => refContainer.current?.validate()}>Check</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};
