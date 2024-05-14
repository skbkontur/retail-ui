import React from 'react';
import { Gapped, Input } from '@skbkontur/react-ui';

import {
  text,
  ValidationContainer,
  ValidationsFeatureFlagsContext,
  ValidationWrapper,
} from '../../../../src';

export default function FeatureFlagsExampleFixedValidationTextColors() {
  return (
    <ValidationsFeatureFlagsContext.Provider value={{ fixedValidationTextColors: true }}>
      <ValidationContainer>
        <Gapped style={{ padding: '10px 0 32px 10px' }}>
          <ValidationWrapper
            validationInfo={{
              level: 'error',
              type: 'immediate',
              independent: false,
              message: 'Error message',
            }}
            renderMessage={text('bottom')}
          >
            <Input />
          </ValidationWrapper>
          <ValidationWrapper
            validationInfo={{
              level: 'warning',
              type: 'immediate',
              independent: false,
              message: 'Warning message',
            }}
            renderMessage={text('bottom')}
          >
            <Input />
          </ValidationWrapper>
        </Gapped>
      </ValidationContainer>
    </ValidationsFeatureFlagsContext.Provider>
  );
}
