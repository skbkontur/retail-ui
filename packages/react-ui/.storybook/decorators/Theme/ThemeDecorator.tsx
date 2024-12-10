import React from 'react';
import { Decorator } from '@storybook/react';

import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import { LIGHT_THEME_2022_0 } from '../../../lib/theming/themes/LightTheme2022_0';
import { DARK_THEME_2022_0 } from '../../../lib/theming/themes/DarkTheme2022_0';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

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
