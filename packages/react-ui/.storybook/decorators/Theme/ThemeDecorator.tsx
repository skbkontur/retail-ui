import React from 'react';
import type { Decorator } from '@storybook/react';

import { LIGHT_THEME, LIGHT_THEME_6_0 } from '../../../lib/theming/themes/LightTheme.js';
import { DARK_THEME, DARK_THEME_6_0 } from '../../../lib/theming/themes/DarkTheme.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import { isDarkTheme } from '../../../lib/theming/ThemeHelpers.js';

export const themes = {
  LIGHT_THEME,
  DARK_THEME,
  LIGHT_THEME_6_0,
  DARK_THEME_6_0,
};

export const ThemeDecorator: Decorator = (Story, context) => {
  const storybookTheme = themes[context.userGlobals.theme] || LIGHT_THEME;

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
