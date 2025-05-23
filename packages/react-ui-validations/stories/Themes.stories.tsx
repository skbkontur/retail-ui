import React from 'react';
import { Meta } from '@storybook/react';
import { DARK_THEME, Gapped, Input, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

import { text, ValidationContainer, ValidationWrapper } from '../src';

export default {
  title: 'Themes',
} as Meta;

function ValidationExamples() {
  return (
    <ValidationContainer>
      <Gapped style={{ padding: '10px 10px 30px' }}>
        <ValidationWrapper
          validationInfo={{
            level: 'error',
            type: 'immediate',
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
            message: 'Error message',
          }}
          renderMessage={text('bottom')}
        >
          <Input />
        </ValidationWrapper>
      </Gapped>
    </ValidationContainer>
  );
}

function LightTheme() {
  return <ValidationExamples />;
}

function DarkTheme() {
  return (
    <div style={{ background: '#2b2b2b' }}>
      <ThemeContext.Provider value={DARK_THEME}>
        <ValidationExamples />
      </ThemeContext.Provider>
    </div>
  );
}

function CustomTheme() {
  return (
    <div style={{ background: '#faf7f3' }}>
      <ThemeContext.Provider
        value={ThemeFactory.create({
          validationsTextColorWarning: 'sandybrown',
          validationsTextColorError: 'red',
        })}
      >
        <ValidationExamples />
      </ThemeContext.Provider>
    </div>
  );
}

export const ThemesStory = () => (
  <Gapped vertical>
    <LightTheme />
    <DarkTheme />
    <CustomTheme />
  </Gapped>
);
ThemesStory.storyName = 'themes';
