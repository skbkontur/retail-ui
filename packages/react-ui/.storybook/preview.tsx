import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withCreevey } from 'creevey';
import { ThemeContext } from '../lib/theming/ThemeContext';

import { FLAT_THEME } from '../lib/theming/themes/FlatTheme';

// TODO This need to hack enableFastLoading option
import { delay } from '../lib/utils';
import Icons from '@skbkontur/react-icons';
delay(0);
Icons;
// TODO This need to hack enableFastLoading option

addDecorator(
  withCreevey({
    captureElement: '#test-element',
    skip: [
      {
        in: ['chromeFlat', 'firefoxFlat', 'ie11Flat'],
        kinds: /^(?!\bButton\b|\bCheckbox\b|\bInput\b|\bRadio\b|\bTextarea\b|\bToggle\b|\bSwitcher\b|\bTokenInput\b)/,
      },
    ],
  }),
);

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));

if (process.env.STORYBOOK_FLAT_UI) {
  addDecorator(story => <ThemeContext.Provider value={FLAT_THEME}>{story()}</ThemeContext.Provider>);
}

addParameters({
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
});
