// @flow
import React from 'react';
import {storiesOf} from '@kadira/storybook';

import Dropdown, {MenuItem} from '../../components/Dropdown';

storiesOf('Dropdown', module).
  add('Somple Dropdown', () => (
    <Dropdown caption="Items">
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  )).
  add('With fixed width', () => (
    <Dropdown caption="Items" width="300">
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  )).
  add('With fixed width and long caption', () => (
    <Dropdown caption="Lorem ipsum dollar all mubarak ibn ahmed" width="100">
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  ));
