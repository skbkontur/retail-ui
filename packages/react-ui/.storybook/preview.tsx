import React from 'react';
import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { Meta } from '@storybook/react';
import { isTestEnv } from '../lib/currentEnvironment';
import { ThemeContext } from '../lib/theming/ThemeContext';

import { FLAT_THEME_OLD } from '../lib/theming/themes/FlatThemeOld';
import { FLAT_THEME } from '../lib/theming/themes/FlatTheme';
import { DEFAULT_THEME_OLD } from '../lib/theming/themes/DefaultThemeOld';
import { DEFAULT_THEME } from '../lib/theming/themes/DefaultTheme';

setFilter(fiber => {
  // Транслируем все пропы только для контролов
  const isControlComponent = !!findAmongParents(
    fiber,
    fiberParent => fiberParent.type && typeof fiberParent.type.__KONTUR_REACT_UI__ === 'string',
  );
  if (isTestEnv && isControlComponent) {
    return null;
  }
  // Для остальных компонентов ограничиваемся тестовыми идентификаторами
  return ['data-tid', 'data-testid'];
});

export const decorators: Meta['decorators'] = [
  (Story, context) => {
    const getTheme = theme => {
      switch (theme) {
        case 'DefaultOld':
          return DEFAULT_THEME_OLD;
        case 'Flat':
          return FLAT_THEME;
        case 'FlatOld':
          return FLAT_THEME_OLD;
        default:
          return DEFAULT_THEME;
      }
    };
    const theme = getTheme(context.globals.theme);
    if (theme !== DEFAULT_THEME) {
      return <ThemeContext.Provider value={theme}>{<Story />}</ThemeContext.Provider>;
    }
    return <Story />;
  },
  Story => (
    <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
      {<Story />}
    </div>
  ),
];

export const parameters: Meta['parameters'] = {
  creevey: {
    captureElement: '#test-element',
    skip: [
      {
        in: ['chromeFlat', 'firefoxFlat', 'ie11Flat', 'chromeFlat8px', 'firefoxFlat8px', 'ie11Flat8px'],
        kinds: /^(?!\bButton\b|\bCheckbox\b|\bInput\b|\bRadio\b|\bTextarea\b|\bToggle\b|\bSwitcher\b|\bTokenInput\b)/,
      },
    ],
  },
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'React UI Theme',
    defaultValue: 'Default',
    toolbar: {
      icon: 'paintbrush',
      items: ['Default', 'DefaultOld', 'Flat', 'FlatOld'],
      showName: true,
    },
  },
};

if (isTestEnv) {
  import('../lib/styles/HoldSelectionColor');
}
