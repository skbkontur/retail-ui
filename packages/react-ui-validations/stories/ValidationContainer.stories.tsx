import React from 'react';
import { Meta } from '@storybook/react';
import { Button, Gapped, Input } from '@skbkontur/react-ui';

import { text, ValidationContainer, ValidationInfo, ValidationsFeatureFlagsContext, ValidationWrapper } from '../src';

export default {
  title: 'ValidationContainer',
} as Meta;

const validation: ValidationInfo = { message: 'Error', type: 'immediate', level: 'error', independent: true };
const validationWarning: ValidationInfo = {
  message: 'Warning',
  type: 'immediate',
  level: 'warning',
  independent: true,
};

export const Default = () => (
  <ValidationContainer data-tid="TestTid">
    <Gapped vertical gap={20}>
      <ValidationWrapper validationInfo={validation}>
        <div>Tooltip</div>
      </ValidationWrapper>
      <ValidationWrapper renderMessage={text()} validationInfo={validation}>
        <div>Text</div>
      </ValidationWrapper>
      <ValidationWrapper renderMessage={text('bottom')} validationInfo={validationWarning}>
        <div>TextBottom</div>
      </ValidationWrapper>
      <ValidationWrapper renderMessage={text('right')} validationInfo={validation}>
        <div>TextRight</div>
      </ValidationWrapper>
    </Gapped>
  </ValidationContainer>
);

export const WithWrapperError = () => (
  <>
    <ValidationContainer>
      <Button>Submit</Button>
      <ValidationWrapper renderMessage={text('bottom')} validationInfo={validation}>
        <Input />
      </ValidationWrapper>
    </ValidationContainer>
    <ValidationContainer>
      <span>
        <Button>Submit</Button>
        <ValidationWrapper renderMessage={text('bottom')} validationInfo={validation}>
          <Input />
        </ValidationWrapper>
      </span>
    </ValidationContainer>
    <ValidationContainer>
      <div>
        <Button>Submit</Button>
        <ValidationWrapper renderMessage={text('bottom')} validationInfo={validation}>
          <Input />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
    <ValidationContainer>
      <div>
        <Button>Submit</Button>
        <ValidationWrapper renderMessage={text('bottom')} validationInfo={validation}>
          <Input />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  </>
);

export const WithWrapperErrorWithoutSpan = () => (
  <Gapped vertical gap={20}>
    <ValidationsFeatureFlagsContext.Provider value={{ validationsRemoveExtraSpans: true }}>
      <ValidationContainer>
        <div>
          <Button>Submit</Button>
          <ValidationWrapper renderMessage={text('bottom')} validationInfo={validation}>
            <Input />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    </ValidationsFeatureFlagsContext.Provider>

    <ValidationsFeatureFlagsContext.Provider value={{ validationsRemoveExtraSpans: false }}>
      <ValidationContainer>
        <div>
          <Button>Submit</Button>
          <ValidationWrapper renderMessage={text('bottom')} validationInfo={validation}>
            <Input />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    </ValidationsFeatureFlagsContext.Provider>
  </Gapped>
);
