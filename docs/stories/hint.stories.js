// @flow
import React from 'react';
import {storiesOf} from '@kadira/storybook';

import Hint from '../../components/Hint';

storiesOf('Hint', module).
  addDecorator(story => (
    <div style={{padding: '100px 300px'}}>
      {story()}
    </div>
  )).
  add('default', () => (
    <Hint text="Something will never be changed">
      <span className="hint-content">
        Ich Liebe dich
      </span>
    </Hint>
  )).
  add('left', () => (
    <Hint pos="left" text="Something will never be changed">
      <span className="hint-content">
        Je t'aime
      </span>
    </Hint>
  )).
  add('right', () => (
    <Hint pos="right" text="Something will never be changed">
      <span className="hint-content">
        Ti voglio bene
      </span>
    </Hint>
  )).
  add('bottom', () => (
    <Hint pos="bottom" text="Something will never be changed">
      <span className="hint-content">
        Te amo
      </span>
    </Hint>
  ));
