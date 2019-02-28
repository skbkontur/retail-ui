import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "styled-components";

import {
  configure,
  addDecorator,
  storiesOf,
  getStorybook
} from '@storybook/react';
import Upgrades from '../lib/Upgrades';
import { getDefaultTheme } from "../themes";

if (process.env.STORYBOOK_FLAT_UI) {
  Upgrades.enableFlatDesign();
}

let stories = null;

function renderStory({ kind, story }) {
  const root = document.getElementById('root');

  ReactDOM.unmountComponentAtNode(root);
  ReactDOM.render(stories[kind][story](), root);
}

storiesOf('All', module).add('Stories', () => {
  if (!stories) {
    stories = {};
    getStorybook().forEach(kind => {
      stories[kind.kind] = {};
      kind.stories.forEach(story => {
        stories[kind.kind][story.name] = story.render;
      });
    });
  }
  window.renderStory = renderStory;
  window.getStorybook = getStorybook;
  return <div />;
});

addDecorator(story => <ThemeProvider theme={getDefaultTheme()}>{story()}</ThemeProvider>);

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));

const req = require.context('../components', true, /.stories.tsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
