import 'core-js/stable';
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withCreevey } from 'creevey';
import FlatTheme from '../lib/theming/themes/FlatTheme';
import ThemeProvider from '../components/ThemeProvider';

addDecorator(withCreevey({ skip: 'Story tests migration process' }));

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));

if (process.env.STORYBOOK_FLAT_UI) {
  addDecorator(story => <ThemeProvider value={FlatTheme}>{story()}</ThemeProvider>);
}

configure(require.context('../components', true, /.stories.tsx?$/), module);

if (process.env.enableReactTesting) {
  require('../lib/styles/HoldSelectionColor');
}
