import React from 'react';
import { addDecorator } from '@storybook/react';
import { withCreevey } from 'creevey';
import { ThemeContext } from '../lib/theming/ThemeContext';

import { FLAT_THEME } from '../lib/theming/themes/FlatTheme';

// TODO This need to hack enableFastLoading option
import { delay } from '../lib/utils';
delay(0);

addDecorator(
  withCreevey({
    captureElement: '#test-element',
    skip: [
      {
        in: ['chromeFlat', 'firefoxFlat', 'ie11Flat'],
        kinds: /^(?!Button$|Checkbox$|Input$|Radio$|Textarea$|Toggle$|Switcher$|TokenInput$|).*/g,
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
