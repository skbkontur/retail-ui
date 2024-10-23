import React from 'react';
import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Preview } from '@storybook/react';

import { isTestEnv } from '../lib/currentEnvironment';
import { ThemeContext } from '../lib/theming/ThemeContext';
import { LIGHT_THEME_MOBILE } from '../lib/theming/themes/LightThemeMobile';
import { LIGHT_THEME } from '../lib/theming/themes/LightTheme';
import { DARK_THEME } from '../lib/theming/themes/DarkTheme';
import { ThemeFactory } from '../lib/theming/ThemeFactory';

import { LocaleDecorator, toolbarItems } from './decorators/Locale/LocaleDecorator';
import FeatureFlagsDecorator from './decorators/Features/FeatureFlagsDecorator';
import { featureFlagsConfig } from './featureFlagsConfig/featureFlagsConfig';

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
  LIGHT_THEME,
  DARK_THEME,
  LIGHT_THEME_MOBILE,
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
const preview: Preview = {
  parameters: {
    docs: {
      toc: {
        title: 'Содержание',
        headingSelector: 'h2, h3, h4',
      },
      controls: {
        sort: 'alpha',
      },
    },
    creevey: {
      captureElement: '#test-element',
      skip: {
        'not mobile stories in mobile browser': { in: MOBILE_REGEXP, stories: /^((?!Mobile).)*$/i },
        'mobile stories in not mobile browsers': { stories: MOBILE_REGEXP, in: /^((?!Mobile).)*$/i },
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Versioning',
          ['Versions', 'Migration', 'Changelog'],
          'Information',
          ['Accessibility', 'Contributing', 'Ecosystem', 'Mobiles', 'Server Side Rendering'],
          'Button',
          'Input data',
          'Display data',
          'Menu',
          'Overlay',
          'Layout',
          '*',
        ],
      },
    },
    viewport: {
      viewports: { ...MINIMAL_VIEWPORTS, ...customViewports },
    },
    multiselect: featureFlagsConfig,
  },
  decorators: [
    (Story, context) => {
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
    LocaleDecorator,
    FeatureFlagsDecorator,
  ],
};

export default preview;

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
  locale: {
    name: 'Locale',
    description: 'React UI Locale',
    defaultValue: 'ru',
    toolbar: {
      icon: 'globe',
      items: Object.keys(toolbarItems),
      showName: true,
      dynamicTitle: true,
    },
  },
};

if (isTestEnv) {
  import('../lib/styles/HoldSelectionColor');
}
