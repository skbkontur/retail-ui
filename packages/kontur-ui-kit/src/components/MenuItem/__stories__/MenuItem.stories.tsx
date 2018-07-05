import { storiesOf } from '@storybook/react';
import React from 'react';
import MenuItem from '../';

storiesOf('MenuItem', module).add('Example', () => (
  <div>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
  </div>
));
