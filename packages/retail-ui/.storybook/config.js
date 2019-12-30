import { addDecorator, configure } from '@storybook/react';
import 'core-js/stable';
import { withCreevey } from 'creevey';
import React from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { FLAT_THEME } from '../lib/theming/themes/FlatTheme';

addDecorator(withCreevey({ skip: 'Story tests migration process' }));

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));

if (process.env.STORYBOOK_FLAT_UI) {
  addDecorator(story => <ThemeProvider value={FLAT_THEME}>{story()}</ThemeProvider>);
}

configure(require.context('../components', true, /.stories.tsx?$/), module);
