import { storiesOf } from '@storybook/react';
import React from 'react';

import MenuItem from '../../../MenuItem';
import InternalMenu from '../InternalMenu';

storiesOf('Internal menu', module).add('Example', () => (
  <div style={{ border: '1px solid tomato', width: 200 }}>
    <InternalMenu hasShadow={false} cyclicSelection={false} initialSelectedItemIndex={0}>
      <MenuItem>One</MenuItem>
      <MenuItem>Two</MenuItem>
      <MenuItem>Four</MenuItem>
    </InternalMenu>
  </div>
));
