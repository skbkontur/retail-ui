import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import type { ValidationInfo } from '@skbkontur/react-ui-validations';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Switcher } from '@skbkontur/react-ui/components/Switcher/Switcher';
import type { Meta } from '@storybook/react';
import React from 'react';

import type { Story } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/utility-types.js';

const meta: Meta = {
  title: 'Switcher',
};

export default meta;

export const ExampleValidation: Story = () => {
  const refContainer = React.useRef<ValidationContainer>(null);
  const [value, setValue] = React.useState<string>('');

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
          <Switcher value={value} items={['Первый', 'Второй']} onValueChange={setValue} />
        </ValidationWrapper>
        <div style={{ padding: '20px 0' }}>
          <Button onClick={() => refContainer.current?.validate()}>Проверить</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};
