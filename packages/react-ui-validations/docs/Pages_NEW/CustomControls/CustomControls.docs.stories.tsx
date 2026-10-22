import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Gapped } from '@skbkontur/react-ui/components/Gapped/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { Select } from '@skbkontur/react-ui/components/Select/Select';
import React from 'react';

import type { ValidationBehaviour, ValidationInfo } from '../../../index.js';
import { ValidationContainer, ValidationWrapper } from '../../../index.js';
import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Custom controls',
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleCustomControl: Story = () => {
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

  // eslint-disable-next-line react/no-unstable-nested-components
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
        return <span>Отправьте форму</span>;
      case false:
        return <span style={{ color: '#d70c17' }}>Форма невалидна</span>;
      case true:
        return <span style={{ color: '#5199db' }}>Форма валидна</span>;
      default:
        return null;
    }
  };

  const validate = (value: string): ValidationInfo | null => {
    switch (value) {
      case 'error':
        return { type, message: <span>Ошибка</span>, level: 'error' };
      case 'warning':
        return {
          type,
          message: <span>Предупреждение</span>,
          level: 'warning',
        };
    }
    return null;
  };

  return (
    <div>
      <ValidationContainer ref={container}>
        <Gapped gap={10} vertical>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 160, textAlign: 'right' }}>Тип валидации</div>
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
                  <Button use="accent" onClick={submitHandler}>
                    Отправить
                  </Button>
                  {renderValidStatus()}
                </Gapped>
              )}
            </Gapped>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 160, textAlign: 'right' }}>Input из react-ui</div>
            <ValidationWrapper validationInfo={validate(value2)}>
              <Input value={value2} onValueChange={setValue2} />
            </ValidationWrapper>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 160, textAlign: 'right' }}>Кастомный input</div>
            <ValidationWrapper validationInfo={validate(value1)}>
              <CustomInput value={value1} onChange={(e) => setValue1(e.target.value)} />
            </ValidationWrapper>
          </div>
        </Gapped>
      </ValidationContainer>
    </div>
  );
};
ExampleCustomControl.storyName = 'Собственный контрол';
