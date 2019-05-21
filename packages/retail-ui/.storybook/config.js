import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { configure, addDecorator, storiesOf, getStorybook } from '@storybook/react';
import ThemeFactory from "../lib/theming/ThemeFactory";
import FlatTheme from "../lib/theming/themes/FlatTheme";

if (process.env.STORYBOOK_FLAT_UI) {
  ThemeFactory.overrideDefaultTheme(FlatTheme)
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
