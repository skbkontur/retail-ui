import React from 'react';
import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Meta } from '@storybook/react';

import { isTestEnv } from '../lib/currentEnvironment';
import { ThemeContext } from '../lib/theming/ThemeContext';
import { DEFAULT_THEME } from '../lib/theming/themes/DefaultTheme';
import { DARK_THEME } from '../lib/theming/themes/DarkTheme';
import { DEFAULT_THEME_MOBILE } from '../lib/theming/themes/DefaultThemeMobile';
import { DEFAULT_THEME_8PX_OLD } from '../lib/theming/themes/DefaultTheme8pxOld';
import { FLAT_THEME_8PX_OLD } from '../lib/theming/themes/FlatTheme8pxOld';
import { THEME_2022 } from '../lib/theming/themes/Theme2022';
import { THEME_2022_DARK } from '../lib/theming/themes/Theme2022Dark';
import { ThemeFactory } from '../lib/theming/ThemeFactory';

const customViewports = {
  iphone: {
    name: 'Iphone',
    styles: {
      width: '375px',
      height: '667px',
    },
    type: 'mobile',
  },
  iphonePlus: {
    name: 'Iphone Plus',
    styles: {
      width: '414px',
      height: '736px',
    },
    type: 'mobile',
  },
};

const themes = {
  DEFAULT_THEME,
  DARK_THEME,
  DEFAULT_THEME_8PX_OLD,
  FLAT_THEME_8PX_OLD,
  DEFAULT_THEME_MOBILE,
  THEME_2022,
  THEME_2022_DARK,
};

setFilter((fiber) => {
  // Транслируем все пропы только для контролов
  const isControlComponent = !!findAmongParents(
    fiber,
    (fiberParent) => fiberParent.type && typeof fiberParent.type.__KONTUR_REACT_UI__ === 'string',
  );
  if (isTestEnv && isControlComponent) {
    return null;
  }
  // Для остальных компонентов ограничиваемся тестовыми идентификаторами
  return ['data-tid', 'data-testid'];
});

const MOBILE_REGEXP = /Mobile.*/i;

export const decorators: Meta['decorators'] = [
  (Story, context) => {
    const storybookTheme = themes[context.globals.theme] || DEFAULT_THEME;

    if ([DARK_THEME, THEME_2022_DARK].includes(storybookTheme)) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    if (storybookTheme !== DEFAULT_THEME) {
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
  },
  (Story) => (
    <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
      <Story />
    </div>
  ),
  (Story) => {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  mobileMediaQuery: '(max-width: 576px)',
                },
                theme,
              )}
            >
              <Story />
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  },
];

export const parameters: Meta['parameters'] = {
  creevey: {
    captureElement: '#test-element',
    skip: {
      'not flat stories in flat browsers': {
        in: ['chromeFlat8px', 'firefoxFlat8px', 'ie11Flat8px'],
        kinds: /^(?!\bButton\b|\bCheckbox\b|\bInput\b|\bRadio\b|\bTextarea\b|\bToggle\b|\bSwitcher\b|\bTokenInput\b)/,
      },
      'not mobile stories in mobile browser': { in: MOBILE_REGEXP, stories: /^((?!Mobile).)*$/i },
      'mobile stories in not mobile browsers': { stories: MOBILE_REGEXP, in: /^((?!Mobile).)*$/i },
    },
  },
  options: {
    storySort: (a, b) => (a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
  },
  viewport: {
    viewports: { ...MINIMAL_VIEWPORTS, ...customViewports },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'React UI Theme',
    defaultValue: 'DEFAULT_THEME',
    toolbar: {
      icon: 'paintbrush',
      items: Object.keys(themes),
      showName: true,
    },
  },
};

if (isTestEnv) {
  import('../lib/styles/HoldSelectionColor');
}
