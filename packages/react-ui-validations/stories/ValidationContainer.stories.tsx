import React from 'react';
import { Meta } from '@storybook/react';
import { Button, DARK_THEME, Gapped, Input, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

import { text, ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';

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
  <ThemeContext.Provider
    value={ThemeFactory.create({
      validationsTextColorWarning: '',
      validationsTextColorError: '',
    })}
  >
    <Gapped vertical gap={20}>
      <ThemeContext.Provider value={DARK_THEME}>
        <ValidationContainer>
          <div>
            <Button>Submit</Button>
            <ValidationWrapper renderMessage={text('bottom')} validationInfo={validationWarning}>
              <Input />
            </ValidationWrapper>
          </div>
        </ValidationContainer>
      </ThemeContext.Provider>

      <ValidationContainer>
        <div>
          <Button>Submit</Button>
          <ValidationWrapper renderMessage={text('bottom')} validationInfo={validation}>
            <Input />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    </Gapped>
  </ThemeContext.Provider>
);
