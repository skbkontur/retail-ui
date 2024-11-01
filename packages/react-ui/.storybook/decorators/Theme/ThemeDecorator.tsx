import React from 'react';
import { Decorator } from '@storybook/react';

import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { LIGHT_THEME_MOBILE } from '../../../lib/theming/themes/LightThemeMobile';

export const themes = {
  LIGHT_THEME,
  DARK_THEME,
  LIGHT_THEME_MOBILE,
};

export const ThemeDecodator: Decorator = (Story, context) => {
  const storybookTheme = themes[context.globals.theme] || LIGHT_THEME;

  if ([DARK_THEME].includes(storybookTheme)) {
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
