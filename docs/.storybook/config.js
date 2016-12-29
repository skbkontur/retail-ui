import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';

addDecorator((story) => (
  <div id="test-element" style={{display: 'inline-block', padding: 4}}>
    {story()}
  </div>
));

const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
