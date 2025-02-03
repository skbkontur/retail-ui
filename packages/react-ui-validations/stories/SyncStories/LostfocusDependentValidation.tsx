import React, { useRef, useState } from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input';

import { text, ValidationContainer, ValidationInfo, ValidationListWrapper, ValidationWrapper } from '../../src';
import { Nullable } from '../../typings/Types';

export const LostfocusDependentValidation = () => {
  const refContainer = useRef<ValidationContainer>(null);

  const [sending, setSending] = useState<boolean>(false);
  const [valueA, setValueA] = useState<string>('');
  const [valueB, setValueB] = useState<string>('');
  const [validation, setValidation] = useState<string>('none');

  const validateA = (): Nullable<ValidationInfo> => {
    if (valueA.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect value',
        type: 'lostfocus',
      };
    }
    if (valueA && valueB && valueA === valueB) {
      return {
        message: 'duplicate value',
        type: 'lostfocus',
      };
    }
    return null;
  };

  const validateB = (): Nullable<ValidationInfo> => {
    if (valueB.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect value',
        type: 'submit',
      };
    }
    if (valueA && valueB && valueA === valueB) {
      return {
        message: 'duplicate value',
        type: 'submit',
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

  const validationInfos = [validateA(), validateB()];

  return (
    <ValidationContainer ref={refContainer}>
      <ValidationListWrapper validationInfos={validationInfos}>
        <div style={{ padding: 30 }}>
          <Gapped vertical>
            <Gapped wrap verticalAlign="middle">
              <b>A</b>
              <ValidationWrapper data-tid="InputAValidation" validationInfo={validationInfos[0]} renderMessage={text()}>
                <Input data-tid={'InputA'} value={valueA} onValueChange={setValueA} />
              </ValidationWrapper>
            </Gapped>
            <Gapped wrap verticalAlign="middle">
              <b>B</b>
              <ValidationWrapper data-tid="InputBValidation" validationInfo={validationInfos[1]} renderMessage={text()}>
                <Input data-tid={'InputB'} value={valueB} onValueChange={setValueB} />
              </ValidationWrapper>
            </Gapped>
            <Gapped wrap verticalAlign="middle">
              <Button data-tid={'SubmitButton'} loading={sending} onClick={handleSubmit}>
                Submit
              </Button>
              <span data-tid={'ValidationState'}>{validation}</span>
            </Gapped>
          </Gapped>
        </div>
      </ValidationListWrapper>
    </ValidationContainer>
  );
};
