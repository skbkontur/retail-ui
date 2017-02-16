// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DatePicker from '../DatePicker';

storiesOf('DatePicker', module)
  .add('with mouseevent handlers', () => (
    <DatePicker
      onMouseEnter={() => console.count('enter')}
      onMouseLeave={() => console.count('leave')}
    />
  ));
