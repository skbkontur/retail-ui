import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';

import { ValidationBehaviour, ValidationContainer, ValidationInfo, ValidationWrapper } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Displaying/FormValidity',
  parameters: { creevey: { skip: true } },
} as Meta;

export const FormValidity: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [immediate, setImmediate] = React.useState<string>('');
  const [lostfocus, setLostfocus] = React.useState<string>('');
  const [submit, setSubmit] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  function renderFormState() {
    switch (isValid) {
      case null:
        return <b>Отправьте форму</b>;
      case false:
        return <b style={{ color: '#d70c17' }}>Форма невалидна</b>;
      case true:
        return <b style={{ color: '#5199db' }}>Форма валидна</b>;
      default:
        throw new Error('Invalid state');
    }
  }

  function validate(v: string, type: ValidationBehaviour): Nullable<ValidationInfo> {
    return !/^\d*$/.test(v) ? { message: 'Только цифры', type } : null;
  }

  async function handleSubmit(): Promise<void> {
    const isValid = Boolean(await container.current?.validate());
    setIsValid(isValid);
  }

  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title={'immediate'}>
          <ValidationWrapper validationInfo={validate(immediate, 'immediate')}>
            <Input
              placeholder={'Только цифры'}
              value={immediate}
              onValueChange={(value) => {
                setImmediate(value);
                setIsValid(null);
              }}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title={'lostfocus'}>
          <ValidationWrapper validationInfo={validate(lostfocus, 'lostfocus')}>
            <Input
              placeholder={'Только цифры'}
              value={lostfocus}
              onValueChange={(value) => {
                setLostfocus(value);
                setIsValid(null);
              }}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title={'submit'}>
          <ValidationWrapper validationInfo={validate(submit, 'submit')}>
            <Input
              placeholder={'Только цифры'}
              value={submit}
              onValueChange={(value) => {
                setSubmit(value);
                setIsValid(null);
              }}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.ActionsBar>
          <Gapped wrap verticalAlign="middle">
            <Button use={'primary'} onClick={handleSubmit}>
              Submit
            </Button>
            {renderFormState()}
          </Gapped>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};
