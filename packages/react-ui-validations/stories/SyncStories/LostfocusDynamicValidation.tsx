import React, { useRef, useState } from 'react';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input';

import { text, ValidationContainer, ValidationInfo, ValidationListWrapper, ValidationWrapper } from '../../src';
import { Nullable } from '../../typings/Types';

export const LostfocusDynamicValidation = () => {
  const counter = useRef<number>(0);

  const [valueA, setValueA] = useState<string>('');
  const [valueB, setValueB] = useState<string>('');

  const validateA = (): Nullable<ValidationInfo> => {
    if (valueA.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect times: ' + ++counter.current,
        type: 'lostfocus',
      };
    }
    return null;
  };

  const validationInfos = [validateA()];

  return (
    <ValidationContainer>
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
              <ValidationWrapper
                data-tid="InputBValidation"
                validationInfo={null /*it is important to wrap input with ValidationWrapper*/}
              >
                <Input data-tid={'InputB'} value={valueB} onValueChange={setValueB} />
              </ValidationWrapper>
            </Gapped>
          </Gapped>
        </div>
      </ValidationListWrapper>
    </ValidationContainer>
  );
};
