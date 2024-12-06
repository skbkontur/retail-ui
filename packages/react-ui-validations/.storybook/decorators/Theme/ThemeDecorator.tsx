import React from 'react';
import { Decorator } from '@storybook/react';
import {
  DARK_THEME,
  DARK_THEME_2022_0,
  LIGHT_THEME,
  LIGHT_THEME_2022_0,
  ThemeContext,
  ThemeFactory,
} from '@skbkontur/react-ui';

export const themes = {
  LIGHT_THEME,
  DARK_THEME,
  LIGHT_THEME_2022_0,
  DARK_THEME_2022_0,
};

export const ThemeDecorator: Decorator = (Story, context) => {
  const storybookTheme = themes[context.globals.theme] || LIGHT_THEME;

  if ([DARK_THEME].includes(storybookTheme) || [DARK_THEME_2022_0].includes(storybookTheme)) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  if (storybookTheme !== LIGHT_THEME) {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <ThemeContext.Provider value={ThemeFactory.create(theme, storybookTheme)}>
              <Story />
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
  return <Story />;
};
