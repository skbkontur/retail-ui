import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';

import type { ValidationInfo } from '../../src';
import { text, ValidationContainer, ValidationWrapper } from '../../src';
import type { Nullable } from '../../typings/Types';

interface SingleInputPageProps {
  initialValue?: string;
  validationType: ValidationInfo['type'];
  validationLevel?: ValidationInfo['level'];
}

export const SingleInputPage: FC<SingleInputPageProps> = ({
  initialValue,
  validationType,
  validationLevel = 'error',
}) => {
  const refContainer = useRef<ValidationContainer>(null);

  const [sending, setSending] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue || '');
  const [level, setLevel] = useState<ValidationInfo['level']>(validationLevel);
  const [validation, setValidation] = useState<string>('none');
  const [focused, setFocused] = useState<boolean>(false);

  const validate = (): Nullable<ValidationInfo> => {
    if (value.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect value',
        type: validationType,
        level,
      };
    }
    return null;
  };

  const handleSubmit = () => {
    setSending(true);
    setValidation('validating');

    setTimeout(async () => {
      if (refContainer.current) {
        const isValid = await refContainer.current.validate();
        setSending(false);
        setValidation(isValid ? 'valid' : 'invalid');
      }
    });
  };

  return (
    <ValidationContainer ref={refContainer}>
      <div style={{ padding: 30 }}>
        <Gapped vertical>
          <ValidationWrapper data-tid="InputValidation" validationInfo={validate()} renderMessage={text()}>
            <Input
              data-focused={String(focused)}
              data-tid={'Input'}
              value={value}
              onValueChange={setValue}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </ValidationWrapper>
          <Select<ValidationInfo['level']>
            value={level}
            data-tid={'ValidationLevel'}
            items={['error', 'warning']}
            onValueChange={setLevel}
          />
          <Gapped wrap verticalAlign="middle">
            <Button data-tid={'SubmitButton'} loading={sending} onClick={handleSubmit}>
              Submit
            </Button>
            <span data-tid={'ValidationState'}>{validation}</span>
          </Gapped>
        </Gapped>
      </div>
    </ValidationContainer>
  );
};
