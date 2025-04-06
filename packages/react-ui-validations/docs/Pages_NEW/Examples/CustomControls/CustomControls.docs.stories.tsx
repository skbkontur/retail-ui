import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';

import { ValidationBehaviour, ValidationContainer, ValidationInfo, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';

export default {
  title: 'Examples/Custom controls',
  parameters: { creevey: { skip: true } },
} as Meta;

export const CustomControls: Story = () => {
  interface CustomControlProps<Elem = HTMLElement> {
    ref?: React.ForwardedRef<Elem>;
    error?: boolean;
    warning?: boolean;
    onBlur?: React.FocusEventHandler<Elem>;
    onChange?: React.ChangeEventHandler<Elem>;
  }

  interface CustomInputProps extends CustomControlProps<HTMLInputElement>, React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange?: unknown;
  }

  const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(function MyInput(
    { error, warning, onValueChange, ...props },
    ref,
  ) {
    const style: React.CSSProperties = {};
    if (error) {
      style.borderColor = 'red';
      style.backgroundColor = '#ff000020';
    }
    if (warning) {
      style.borderColor = 'orange';
      style.backgroundColor = '#ffa50020';
    }
    return <input type="text" ref={ref} style={style} {...props} />;
  });

  const container = React.useRef<ValidationContainer>(null);
  const [value1, setValue1] = React.useState('error');
  const [value2, setValue2] = React.useState('error');
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const [type, setType] = React.useState<ValidationBehaviour>('submit');

  const submitHandler = async () => {
    setIsValid(Boolean(await container.current?.validate()));
  };

  const typeChangeHandler = (typeValue: ValidationBehaviour) => {
    if (typeValue !== 'submit') {
      setIsValid(null);
    }
    setType(typeValue);
  };

  const renderValidStatus = () => {
    switch (isValid) {
      case null:
        return <b>Отправьте форму</b>;
      case false:
        return <b style={{ color: '#d70c17' }}>Форма невалидна</b>;
      case true:
        return <b style={{ color: '#5199db' }}>Форма валидна</b>;
      default:
        return null;
    }
  };

  const validate = (value: string): ValidationInfo | null => {
    switch (value) {
      case 'error':
        return { type, message: <b>Ошибка</b>, level: 'error' };
      case 'warning':
        return {
          type,
          message: <b>Предупреждение</b>,
          level: 'warning',
        };
    }
    return null;
  };

  return (
    <Form>
      <ValidationContainer ref={container}>
        <Gapped gap={10} vertical>
          <Form.Line title="Тип валидации">
            <Gapped>
              <Select
                onValueChange={typeChangeHandler}
                items={[
                  ['lostfocus', 'lostfocus'],
                  ['immediate', 'immediate'],
                  ['submit', 'submit'],
                ]}
                defaultValue={type}
              />
              {type === 'submit' && (
                <Gapped>
                  <Button use="primary" onClick={submitHandler}>
                    Submit
                  </Button>
                  {renderValidStatus()}
                </Gapped>
              )}
            </Gapped>
          </Form.Line>
          <span>
            Введите <code>«error»</code> или <code>«warning»</code> для вызова соответствующих уровней валидации
          </span>
          <Form.Line title="Кастомный input">
            <ValidationWrapper validationInfo={validate(value1)}>
              <CustomInput value={value1} onChange={(e) => setValue1(e.target.value)} />
            </ValidationWrapper>
          </Form.Line>
          <Form.Line title="Input из react-ui">
            <ValidationWrapper validationInfo={validate(value2)}>
              <Input value={value2} onValueChange={setValue2} />
            </ValidationWrapper>
          </Form.Line>
        </Gapped>
      </ValidationContainer>
    </Form>
  );
};
