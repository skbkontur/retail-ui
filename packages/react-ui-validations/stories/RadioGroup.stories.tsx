import React, { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup/RadioGroup';
import { Radio } from '@skbkontur/react-ui/components/Radio/Radio';

import type { ValidationInfo } from '../index.js';
import { ValidationContainer, ValidationWrapper } from '../index.js';
import type { Nullable } from '../typings/Types.js';
import { isNullable } from '../src/utils/isNullable/isNullable.js';

const meta: Meta = {
  title: 'RadioGroup',
};

export default meta;

type Sex = 'male' | 'female';

interface RadioGroupStoryState {
  sex: Nullable<Sex>;
}

export const RadioGroupWithItemsProp = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [sex, setSex] = useState<Nullable<Sex>>(null);

  const validateSex = (): Nullable<ValidationInfo> => {
    if (isNullable(sex)) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20, width: 300, height: 250 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateSex()}>
          <RadioGroup<RadioGroupStoryState['sex']>
            value={sex}
            items={['male', 'female'] as Sex[]}
            renderItem={(x) => <span>{x}</span>}
            onValueChange={setSex}
          />
        </ValidationWrapper>
        <div style={{ padding: '100px 0' }}>
          <Button data-tid="button" onClick={() => refContainer.current?.validate()}>
            Check
          </Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

export const RadioGroupWithChildrenRadio = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [sex, setSex] = useState<Nullable<Sex>>(null);

  const validateSex = (): Nullable<ValidationInfo> => {
    if (isNullable(sex)) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20, width: 300, height: 250 }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateSex()}>
          <RadioGroup<RadioGroupStoryState['sex']> value={sex} onValueChange={setSex}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Radio value={'male'}>male</Radio>
              <Radio value={'female'}>female</Radio>
            </div>
          </RadioGroup>
        </ValidationWrapper>
        <div style={{ padding: '100px 0' }}>
          <Button data-tid="button" onClick={() => refContainer.current?.validate()}>
            Check
          </Button>
        </div>
      </ValidationContainer>
    </div>
  );
};
