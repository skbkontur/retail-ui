import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { Form } from '../../../Common/Form';
import {
  ValidationContainer,
  ValidationWrapper,
  createValidator,
  ValidationBuilder,
  ValidationRule,
} from '../../../../src';

export default {
  title: 'Validator/Reusable',
  parameters: { creevey: { skip: true } },
} as Meta;

export const Reusable: Story = () => {
  const isValidEmail = (value: string): boolean => {
    return value.includes('@');
  };

  const emailRequired = (b: ValidationBuilder<unknown, string>): void => {
    b.invalid((x) => !x, 'Укажите email', 'submit');
  };

  const emailFormat = (b: ValidationBuilder<unknown, string>): void => {
    b.invalid((x) => !isValidEmail(x), 'Неверный формат email');
  };

  const validateEmail: ValidationRule<unknown, string> = (b) => {
    emailRequired(b);
    emailFormat(b);
  };

  const validate = createValidator<string>(validateEmail);

  const container = React.useRef<ValidationContainer>(null);
  const [email, setEmail] = React.useState<string>('');

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const validation = validate(email);
  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="E-mail">
          <ValidationWrapper validationInfo={validation.get()}>
            <Input placeholder={'xxx@xxx.xx'} value={email} onValueChange={setEmail} />
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
