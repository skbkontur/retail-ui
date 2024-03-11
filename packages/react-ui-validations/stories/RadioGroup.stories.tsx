import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup';
import { Radio } from '@skbkontur/react-ui/components/Radio';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';
import { isNullable } from '../src/utils/isNullable';

export default {
  title: 'RadioGroup',
} as Meta;

type Sex = 'male' | 'female';

interface RadioGroupStoryState {
  sex: Nullable<Sex>;
}

export const Example1 = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [sex, setSex] = useState<Nullable<Sex>>(null);

  const validateSex = (): Nullable<ValidationInfo> => {
    if (isNullable(sex)) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
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
          <Button onClick={() => refContainer.current?.validate()}>Check</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

export const RadioGroupWithChildren = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [sex, setSex] = useState<Nullable<Sex>>(null);

  const validateSex = (): Nullable<ValidationInfo> => {
    if (isNullable(sex)) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
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
          <Button onClick={() => refContainer.current?.validate()}>Check</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};
