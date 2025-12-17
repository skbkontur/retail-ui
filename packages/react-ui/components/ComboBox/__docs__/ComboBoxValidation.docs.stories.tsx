import React from 'react';
import { ComboBox, Button, Gapped } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations/src';
import type { ValidationInfo } from '@skbkontur/react-ui-validations/src';

import type { Meta, Story } from '../../../typings/stories';
export default {
  title: 'Input data/ComboBox',
  component: ComboBox,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleValidation: Story = () => {
  const [value, setValue] = React.useState();
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

  const getItems = (q) => {
    return Promise.resolve(
      [
        { value: 1, label: 'Абакан' },
        { value: 2, label: 'Алексин' },
        { value: 3, label: 'Алматы' },
        { value: 4, label: 'Альметьевск' },
      ].filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
    );
  };

  return (
    <ValidationContainer ref={containerRef}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={validate(value)}>
          <ComboBox getItems={getItems} onValueChange={setValue} placeholder="Выберите город" value={value} />
        </ValidationWrapper>
        <Button use={success ? 'success' : 'primary'} onClick={handleSubmit}>
          {success ? 'Готово' : 'Отправить'}
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
