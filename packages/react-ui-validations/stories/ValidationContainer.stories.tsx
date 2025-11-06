import React from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input';

import type { ValidationInfo } from '../src';
import { text, ValidationContainer, ValidationWrapper } from '../src';

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
      <div style={{ display: 'inline' }}>
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
