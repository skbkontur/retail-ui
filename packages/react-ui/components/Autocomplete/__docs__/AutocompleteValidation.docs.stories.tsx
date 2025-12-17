import React from 'react';
import { Autocomplete, Button, Gapped } from '@skbkontur/react-ui';
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
  const [success, setSuccess] = React.useState(false);
  const containerRef = React.useRef(null);

  const validate = (v): ValidationInfo | null => {
    if (!v) {
      return { type: 'submit', message: 'Укажите город' };
    }
    return null;
  };

  async function handleSubmit() {
    setSuccess(await containerRef.current?.validate());
  }

  return (
    <ValidationContainer ref={containerRef}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={validate(value)}>
          <Autocomplete source={items} value={value} onValueChange={setValue} placeholder="Введите город на букву А" />
        </ValidationWrapper>
        <Button use={success ? 'success' : 'primary'} onClick={handleSubmit}>
          {success ? 'Готово' : 'Отправить'}
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
