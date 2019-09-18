import 'babel-polyfill';
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withCreeveyOld } from 'creevey';
import FlatTheme from '../lib/theming/themes/FlatTheme';
import ThemeProvider from '../components/ThemeProvider';

addDecorator(withCreeveyOld());

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));

if (process.env.STORYBOOK_FLAT_UI) {
  addDecorator(story => <ThemeProvider value={FlatTheme}>{story()}</ThemeProvider>);
}

const req = require.context('../components', true, /.stories.tsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
