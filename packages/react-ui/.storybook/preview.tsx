import React from 'react';
import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { addDecorator, addParameters } from '@storybook/react';
import { withCreevey } from 'creevey';
import { isTestEnv } from '../lib/currentEnvironment';
import { ThemeContext } from '../lib/theming/ThemeContext';

import { FLAT_THEME } from '../lib/theming/themes/FlatTheme';
import { FLAT_THEME_8PX } from '../lib/theming/themes/FlatTheme8px';
import { DEFAULT_THEME } from '../lib/theming/themes/DefaultTheme';
import { DEFAULT_THEME_8PX } from '../lib/theming/themes/DefaultTheme8px';

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

addParameters({
  creevey: {
    captureElement: '#test-element',
    skip: [
      {
        in: ['chromeFlat', 'firefoxFlat', 'ie11Flat'],
        kinds: /^(?!\bButton\b|\bCheckbox\b|\bInput\b|\bRadio\b|\bTextarea\b|\bToggle\b|\bSwitcher\b|\bTokenInput\b)/,
      },
    ],
  },
});
addDecorator(withCreevey());

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));

addDecorator(story => {
  const getTheme = () => {
    switch (true) {
      case Boolean(process.env.STORYBOOK_8PX):
        return DEFAULT_THEME_8PX;
      case Boolean(process.env.STORYBOOK_FLAT_8PX):
        return FLAT_THEME_8PX;
      case Boolean(process.env.STORYBOOK_FLAT_UI):
        return FLAT_THEME;
      default:
        return DEFAULT_THEME;
    }
  };
  const theme = getTheme();
  if (theme !== DEFAULT_THEME) {
    return <ThemeContext.Provider value={theme}>{story()}</ThemeContext.Provider>;
  }
  return story();
});

addParameters({
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
});

if (isTestEnv) {
  import('../lib/styles/HoldSelectionColor');
}
