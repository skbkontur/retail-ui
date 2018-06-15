
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Dropdown from '../Dropdown';
import MenuItem from '../../MenuItem';

storiesOf('Dropdown', module)
  .addDecorator(story => (
    <div
      className="dropdown-test-container"
      style={{ height: 150, width: 400, padding: 4 }}
    >
      {story()}
    </div>
  ))
  .add('Simple Dropdown', () => (
    <Dropdown caption="Items">
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  ))
  .add('With fixed width', () => (
    <Dropdown caption="Items" width={300}>
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  ))
  .add('With overflow', () => (
    <Dropdown caption="Lorem ipsum dollar all mubarak ibn ahmed" width={100}>
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  ))
  .add('With icon', () => (
    <Dropdown caption="Care" icon="child">
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  ))
  .add('With MenuItem icon', () => (
    <Dropdown caption="Care" icon="child">
      <MenuItem icon="add">Menu item</MenuItem>
      <MenuItem>Another item</MenuItem>
    </Dropdown>
  ))
  .add('With icon and overflow', () => (
    <Dropdown
      icon="add"
      caption="Lorem ipsum dollar all mubarak ibn ahmed"
      width="100px"
    >
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  ));
