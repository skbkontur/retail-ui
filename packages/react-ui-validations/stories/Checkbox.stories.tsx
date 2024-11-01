import React, { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';

import type { ValidationInfo } from '../src';
import { ValidationContainer, ValidationWrapper } from '../src';
import type { Nullable } from '../typings/Types';

export default {
  title: 'Checkbox',
} as Meta;

export const Required = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [checked, setChecked] = useState<boolean>(false);

  const validateSex = (): Nullable<ValidationInfo> => {
    if (!checked) {
      return { message: 'Поле обязательно', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20, width: 250, height: 80 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateSex()}>
          <Checkbox data-tid="checkbox" checked={checked ? checked : false} onValueChange={setChecked}>
            Checkbox
          </Checkbox>
        </ValidationWrapper>
        <div style={{ padding: '20px 0' }}>
          <Button data-tid="button" onClick={() => refContainer.current?.validate()}>
            Check
          </Button>
        </div>
      </ValidationContainer>
    </div>
  );
};
