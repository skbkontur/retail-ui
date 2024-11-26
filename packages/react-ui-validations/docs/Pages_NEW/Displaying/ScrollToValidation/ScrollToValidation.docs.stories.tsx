import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';
import { SpaceFiller } from '../../../Common/SpaceFiller';
import { Nullable } from '../../../../typings/Types';

export default {
  title: 'Displaying/Scroll to validation',
  parameters: { creevey: { skip: true } },
} as Meta;

export const ScrollToValidation: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [value0, setValue0] = React.useState<string>('');
  const [value1, setValue1] = React.useState<string>('');
  const [value2, setValue2] = React.useState<string>('');
  const [value3, setValue3] = React.useState<string>('');

  function validate(value: string): Nullable<ValidationInfo> {
    if (!value) {
      return { message: 'Укажите значение', type: 'submit' };
    }
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры' };
    }
    return null;
  }

  async function handleSubmit(): Promise<void> {
    await container.current?.submit();
  }

  return (
    <ValidationContainer ref={container}>
      <Form>
        <SpaceFiller height={200}>Пустое место 200px</SpaceFiller>

        <Form.Line title={'value0'}>
          <ValidationWrapper validationInfo={validate(value0)}>
            <Input placeholder={'Только цифры'} value={value0} onValueChange={setValue0} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title={'value1'}>
          <ValidationWrapper validationInfo={validate(value1)}>
            <Input placeholder={'Только цифры'} value={value1} onValueChange={setValue1} />
          </ValidationWrapper>
        </Form.Line>

        <SpaceFiller height={1600}>Пустое место 1600px</SpaceFiller>

        <Form.Line title={'value2'}>
          <ValidationWrapper validationInfo={validate(value2)}>
            <Input placeholder={'Только цифры'} value={value2} onValueChange={setValue2} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title={'value3'}>
          <ValidationWrapper validationInfo={validate(value3)}>
            <Input placeholder={'Только цифры'} value={value3} onValueChange={setValue3} />
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
