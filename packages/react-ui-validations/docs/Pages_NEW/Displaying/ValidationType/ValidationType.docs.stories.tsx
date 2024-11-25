import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, ValidationInfo } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Displaying/ValidationType',
  parameters: { creevey: { skip: true } },
} as Meta;

export const ImmediateValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');

  function validate(value: string): Nullable<ValidationInfo> {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'immediate' } : null;
  }

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Номер">
          <ValidationWrapper validationInfo={validate(value)}>
            <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const LostfocusValidation: Story = () => {
  const [value, setValue] = React.useState<string>('');
  function validate(value: string): Nullable<ValidationInfo> {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'lostfocus' } : null;
  }
  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="Номер">
          <ValidationWrapper validationInfo={validate(value)}>
            <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};

export const SubmitValidation: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [value, setValue] = React.useState<string>('');
  function validate(value: string): Nullable<ValidationInfo> {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'submit' } : null;
  }
  async function handleSubmit(): Promise<void> {
    await container.current?.submit();
  }

  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="Номер">
          <ValidationWrapper validationInfo={validate(value)}>
            <Input placeholder={'Только цифры'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </Form.Line>

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};
