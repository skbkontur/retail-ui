import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { ValidationContainer } from '../../../../src';
import { Form } from '../../../Common/Form';
import { WrappedInput, WrappedDatePicker, lessThanDate } from './ControlsWithValidations';

export default {
  title: 'Concepts/Inline validations',
  parameters: { creevey: { skip: true } },
} as Meta;

export const InlineValidations: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [born, setBorn] = React.useState<string>('');

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="Имя">
          <WrappedInput required value={name} onValueChange={setName} />
        </Form.Line>

        <Form.Line title="E-mail">
          <WrappedInput required email value={email} onValueChange={setEmail} />
        </Form.Line>

        <Form.Line title="Дата рождения">
          <WrappedDatePicker
            required
            validations={[lessThanDate(new Date('2010-01-01'))]}
            value={born}
            onValueChange={setBorn}
          />
        </Form.Line>

        <Form.ActionsBar>
          <Button use="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};
