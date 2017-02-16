// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Select from '../Select';

storiesOf('Select', module)
  .addDecorator(story => (
    <div
      className="dropdown-test-container"
      style={{ height: 150, width: 200, padding: 4 }}
    >
      {story()}
    </div>
  ))
  .add('Simple', () =>
    <Select items={['one', 'two', 'three']} />
  );
