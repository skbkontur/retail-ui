import React from 'react';
import { Meta } from '@storybook/react';
import { Button, Gapped, Input } from '@skbkontur/react-ui';

import { text, ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';

import { ScrollMessage } from './Input.stories';
import { IframeRenderer } from './StoryHelpers';

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

export const InIframe = () => {
  return (
    <IframeRenderer height="2200px" width="100%">
      <ScrollMessage />
    </IframeRenderer>
  );
};

InIframe.parameters = { creevey: { skip: true } };
