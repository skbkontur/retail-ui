import React from 'react';
import { Autocomplete } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations/src';
import type { ValidationInfo } from '@skbkontur/react-ui-validations/src';

import type { Meta, Story } from '../../../typings/stories';
export default {
  title: 'Input data/Autocomplete',
  component: Autocomplete,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleValidation: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [value, setValue] = React.useState('');
  const containerRef = React.useRef(null);

  const validate = (v): ValidationInfo | null => {
    if (!v) {
      return { type: 'immediate', message: 'Укажите город' };
    }
    return null;
  };

  return (
    <ValidationContainer ref={containerRef}>
      <ValidationWrapper validationInfo={validate(value)}>
        <Autocomplete source={items} value={value} onValueChange={setValue} placeholder="Введите город на букву А" />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
