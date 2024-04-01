import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';

import { ValidationContainer, ValidationInfo, ValidationWrapper, ValidationsFeatureFlagsContext } from '../src';
import { Nullable } from '../typings/Types';

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
    <ValidationsFeatureFlagsContext.Provider value={{ validationsRemoveExtraSpans: true }}>
      <div style={{ padding: 20 }}>
        <ValidationContainer ref={refContainer}>
          <ValidationWrapper validationInfo={validateSex()}>
            <Checkbox checked={checked ? checked : false} onValueChange={setChecked}>
              Checkbox
            </Checkbox>
          </ValidationWrapper>
          <div style={{ padding: '20px 0' }}>
            <Button onClick={() => refContainer.current?.validate()}>Check</Button>
          </div>
        </ValidationContainer>
      </div>
    </ValidationsFeatureFlagsContext.Provider>
  );
};
