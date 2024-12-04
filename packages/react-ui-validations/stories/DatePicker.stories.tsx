import React, { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';
import { isNonNullable } from '@skbkontur/react-ui/lib/utils';

import type { ValidationInfo } from '../src';
import { ValidationContainer, ValidationWrapper } from '../src';
import type { Nullable } from '../typings/Types';

export default {
  title: 'DatePicker',
} as Meta;

export const Example1 = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<Date | string | null>(null);

  const validateValue = (): Nullable<ValidationInfo> => {
    if (isNonNullable(value)) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateValue()}>
          <DatePicker value={value as any} onValueChange={setValue} />
        </ValidationWrapper>
        <div style={{ padding: '100px 0' }}>
          <Button onClick={() => refContainer.current?.validate()}>Check</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};
