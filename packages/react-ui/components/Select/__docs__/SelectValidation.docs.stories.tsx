import React from 'react';
import { Select, Button, Gapped } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations/src';
import type { ValidationInfo } from '@skbkontur/react-ui-validations/src';

import type { Meta, Story } from '../../../typings/stories';
export default {
  title: 'Input data/Select',
  component: Select,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleValidation: Story = () => {
  const [value, setValue] = React.useState();
  const [success, setSuccess] = React.useState(false);
  const containerRef = React.useRef(null);

  const validate = (v): ValidationInfo | null => {
    if (!v) {
      return { type: 'submit', message: 'Выберите документ' };
    }
    return null;
  };

  async function handleSubmit() {
    setSuccess(await containerRef.current?.validate());
  }

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return (
    <ValidationContainer ref={containerRef}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={validate(value)}>
          <Select items={items} value={value} onValueChange={setValue} placeholder="Выберите" />
        </ValidationWrapper>
        <Button use={success ? 'success' : 'primary'} onClick={handleSubmit}>
          {success ? 'Готово' : 'Отправить'}
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
