import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Story1 from './AsyncStories/Story1';
import StoryXxx from './AsyncStories/StoryXxx';

storiesOf('Async', module)
  .add('Story1', () => <Story1 />)
  .add('StoryXxx', () => <StoryXxx />);
