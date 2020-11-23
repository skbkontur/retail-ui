import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
import { CSFStory } from 'creevey';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

export default {
  title: 'Checkbox',
};

export const CheckboxStoryComponent: CSFStory<JSX.Element> = () => {
  const [checked, update] = React.useState<boolean>(false);

  let container: ValidationContainer | null = null;

  const refContainer = (el: ValidationContainer | null) => (container = el);

  const validateSex = (): Nullable<ValidationInfo> => {
    if (!checked) {
      return { message: 'Поле обязательно', type: 'submit' };
    }
    return null;
  };
  return (
    <div style={{ padding: '20px 20px' }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateSex()}>
          <Checkbox checked={checked} onValueChange={update}>
            Checkbox
          </Checkbox>
        </ValidationWrapper>
        <div style={{ padding: '20px 0' }}>
          <Button onClick={() => container && container.validate()}>Check</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

CheckboxStoryComponent.parameters = {
  creevey: {
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage('idle');
      },
    },
  },
}

