import React from 'react';
import { Decorator } from '@storybook/react';

import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import { LIGHT_THEME_0 } from '../../../lib/theming/themes/LightTheme_5_0';
import { DARK_THEME_0 } from '../../../lib/theming/themes/DarkTheme_5_0';
import { LIGHT_THEME_1 } from '../../../lib/theming/themes/LightTheme_5_1';
import { DARK_THEME_1 } from '../../../lib/theming/themes/DarkTheme_5_1';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { isDarkTheme } from '../../../lib/theming/ThemeHelpers';

export const themes = {
  LIGHT_THEME,
  DARK_THEME,
  LIGHT_THEME_0,
  DARK_THEME_0,
  LIGHT_THEME_1,
  DARK_THEME_1,
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
