import { addDecorator, configure } from '@storybook/react';
import { withCreevey } from 'creevey';
import React from 'react';
import { ThemeContext } from '../lib/theming/ThemeContext';

import { FLAT_THEME } from '../lib/theming/themes/FlatTheme';

addDecorator(withCreevey({ skip: 'Story tests migration process' }));

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));

if (process.env.STORYBOOK_FLAT_UI) {
  addDecorator(story => <ThemeContext.Provider value={FLAT_THEME}>{story()}</ThemeContext.Provider>);
}

configure(
  [require.context('../components', true, /.stories.tsx?$/), require.context('../internal', true, /.stories.tsx?$/)],
  module,
);
