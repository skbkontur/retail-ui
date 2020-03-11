import { addDecorator, configure } from '@storybook/react';
import { withCreevey } from 'creevey';
import React from 'react';
import { expect } from 'chai';
import { ThemeProvider } from '../components/ThemeProvider';
import { FLAT_THEME } from '../lib/theming/themes/FlatTheme';
import * as Components from '../index';
import { Key } from '../lib/WebDriver';

Object.assign(global, { React, expect, Key }, Components, React);

addDecorator(withCreevey());

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: '0 200px 200px 0' }}>
    {story()}
  </div>
));

if (process.env.STORYBOOK_FLAT_UI) {
  addDecorator(story => <ThemeProvider value={FLAT_THEME}>{story()}</ThemeProvider>);
}

configure(require.context('../components', true, /.stories.tsx?$/), module);
