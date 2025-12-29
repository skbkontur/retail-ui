import React from 'react';
import { ComboBox, type ComboBoxItem } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations/src';
import type { ValidationInfo } from '@skbkontur/react-ui-validations/src';

import type { Meta, Story } from '../../../typings/stories';
export default {
  title: 'Input data/ComboBox',
  component: ComboBox,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleValidation: Story = () => {
  const [value, setValue] = React.useState<ComboBoxItem>();

  const validate = (v?: ComboBoxItem): ValidationInfo | null => {
    if (!v) {
      return { type: 'immediate', message: 'Укажите город' };
    }
    return null;
  };

  const isSimpleItem = (x: unknown): x is ComboBoxItem => {
    return x !== null && typeof x === 'object' && 'label' in x;
  };

  const getItems = (q: string) => {
    return Promise.resolve(
      [
        { value: '1', label: 'Абакан' },
        { value: '2', label: 'Алексин' },
        { value: '3', label: 'Алматы' },
        { value: '4', label: 'Альметьевск' },
      ].filter((x) => !isSimpleItem(x) || x.label.toLowerCase().includes(q.toLowerCase())),
    );
  };

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={validate(value)}>
        <ComboBox getItems={getItems} onValueChange={setValue} placeholder="Выберите город" value={value} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
