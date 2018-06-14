import 'babel-polyfill';
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import Upgrades from '../lib/Upgrades';

if (process.env.STORYBOOK_FLAT_UI) {
  Upgrades.enableFlatDesign();
}

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));

const req = require.context('../components', true, /.stories.(js|tsx?)$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
