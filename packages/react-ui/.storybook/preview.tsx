import React from 'react';
import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { addDecorator, addParameters } from '@storybook/react';
import { withCreevey } from 'creevey';
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

addParameters({
  creevey: {
    captureElement: '#test-element',
    delay: 500,
    skip: [
      {
        in: ['chromeFlat', 'firefoxFlat', 'ie11Flat', 'chromeFlat8px', 'firefoxFlat8px', 'ie11Flat8px'],
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

const getTheme = () => {
  switch (true) {
    case Boolean(process.env.STORYBOOK_OLD):
      return DEFAULT_THEME_OLD;
    case Boolean(process.env.STORYBOOK_FLAT):
      return FLAT_THEME;
    case Boolean(process.env.STORYBOOK_FLAT_OLD):
      return FLAT_THEME_OLD;
    default:
      return DEFAULT_THEME;
  }
};

const ThemeWrapper: React.FC = ({ children }) => {
  const theme = getTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return <ThemeContext.Provider value={mounted ? theme : DEFAULT_THEME}>{children}</ThemeContext.Provider>;
};

addDecorator(story => {
  return <ThemeWrapper>{story()}</ThemeWrapper>;
});

addParameters({
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
});

if (isTestEnv) {
  import('../lib/styles/HoldSelectionColor');
}
