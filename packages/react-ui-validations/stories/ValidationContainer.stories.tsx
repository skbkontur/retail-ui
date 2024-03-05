import React from 'react';
import { Meta } from '@storybook/react';
import { Button, Input } from '@skbkontur/react-ui';

import { text, ValidationContainer, ValidationsFeatureFlagsContext, ValidationWrapper } from '../src';

export default {
  title: 'ValidationContainer',
} as Meta;

export const Default = () => (
  <ValidationContainer>
    <ValidationWrapper validationInfo={null}>
      <div>TODO</div>
    </ValidationWrapper>
  </ValidationContainer>
);

export const WithWrapperError = () => (
  <>
    <ValidationContainer>
      <Button>Submit</Button>
      <ValidationWrapper
        renderMessage={text('bottom')}
        validationInfo={{ message: 'Error', level: 'error', type: 'immediate', independent: true }}
      >
        <Input />
      </ValidationWrapper>
    </ValidationContainer>
    <ValidationContainer>
      <span>
        <Button>Submit</Button>
        <ValidationWrapper
          renderMessage={text('bottom')}
          validationInfo={{ message: 'Error', level: 'error', type: 'immediate', independent: true }}
        >
          <Input />
        </ValidationWrapper>
      </span>
    </ValidationContainer>
    <ValidationContainer>
      <div>
        <Button>Submit</Button>
        <ValidationWrapper
          renderMessage={text('bottom')}
          validationInfo={{ message: 'Error', level: 'error', type: 'immediate', independent: true }}
        >
          <Input />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
    <ValidationContainer>
      <div>
        <Button>Submit</Button>
        <ValidationWrapper
          renderMessage={text('bottom')}
          validationInfo={{ message: 'Error', level: 'error', type: 'immediate', independent: true }}
        >
          <Input />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  </>
);

export const WithWrapperErrorWithoutSpan = () => (
  <>
    <div style={{ paddingBottom: 20 }}>
      <ValidationsFeatureFlagsContext.Provider value={{ validationsRemoveExtraSpans: true }}>
        <ValidationContainer>
          <div>
            <Button>Submit</Button>
            <ValidationWrapper
              renderMessage={text('bottom')}
              validationInfo={{ message: 'Error', level: 'error', type: 'immediate', independent: true }}
            >
              <Input />
            </ValidationWrapper>
          </div>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
    </div>

    <div style={{ paddingBottom: 20 }}>
      <ValidationsFeatureFlagsContext.Provider value={{ validationsRemoveExtraSpans: false }}>
        <ValidationContainer>
          <div>
            <Button>Submit</Button>
            <ValidationWrapper
              renderMessage={text('bottom')}
              validationInfo={{ message: 'Error', level: 'error', type: 'immediate', independent: true }}
            >
              <Input />
            </ValidationWrapper>
          </div>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
    </div>
  </>
);
