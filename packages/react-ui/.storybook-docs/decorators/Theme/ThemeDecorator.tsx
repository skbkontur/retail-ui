import React from 'react';
import type { Decorator } from '@storybook/react';

import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { isDarkTheme } from '../../../lib/theming/ThemeHelpers';
import * as ALL_LIGHT_THEMES from '../../../lib/theming/themes/LightTheme';
import * as ALL_DARK_THEMES from '../../../lib/theming/themes/DarkTheme';

export const themes = {
  ...ALL_LIGHT_THEMES,
  ...ALL_DARK_THEMES,
};

export const ThemeDecorator: Decorator = (Story, context) => {
  const storybookTheme = themes[context.globals.theme] || LIGHT_THEME;

  if (isDarkTheme(storybookTheme)) {
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
