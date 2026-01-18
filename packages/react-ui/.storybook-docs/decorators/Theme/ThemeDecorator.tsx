import React from 'react';
import type { Decorator } from '@storybook/react';

import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import { isDarkTheme } from '../../../lib/theming/ThemeHelpers.js';
import * as ALL_LIGHT_THEMES from '../../../lib/theming/themes/LightTheme.js';
import * as ALL_DARK_THEMES from '../../../lib/theming/themes/DarkTheme.js';

export const themes = {
  ...ALL_LIGHT_THEMES,
  ...ALL_DARK_THEMES,
};

export const ThemeDecorator: Decorator = (Story, context) => {
  const storybookTheme = themes[context.globals.theme] || LIGHT_THEME;
  const themeAttribute = context.userGlobals.theme === 'LIGHT_THEME' ? 'light' : 'dark';

  if (isDarkTheme(storybookTheme)) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider value={ThemeFactory.create(theme, storybookTheme)}>
            <div
              data-k-brand={context.userGlobals.brand}
              data-k-accent={context.userGlobals.accent}
              data-k-theme={themeAttribute}
            >
              <Story />
            </div>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
