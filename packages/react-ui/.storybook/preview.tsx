import React from 'react';
import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Meta } from '@storybook/react';

import { isTestEnv } from '../lib/currentEnvironment';
import { ThemeContext } from '../lib/theming/ThemeContext';
import { MOBILE_THEME } from '../lib/theming/themes/MobileTheme';
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
  THEME_2022,
  THEME_2022_DARK,
  MOBILE_THEME,
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
    const storybookTheme = themes[context.globals.theme] || THEME_2022;
    if ([THEME_2022_DARK].includes(storybookTheme)) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    if (storybookTheme !== THEME_2022) {
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
    defaultValue: 'THEME_2022',
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
