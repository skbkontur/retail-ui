// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Group from '../Group';
import Input from '../../Input';
import Button from '../../Button';
import Toast from '../../Toast';
import Icon from '../../Icon';

storiesOf('Group', module)
  .add('Simple Group with Input and Button', () => (
    <Group>
      <Input placeholder="Search" mainInGroup />
      <Button icon="Search" />
    </Group>
  ))
  .add('Simple Group with custom width', () => (
    <Group width="300px">
      <Input placeholder="Search" mainInGroup />
      <Button icon="Search" />
    </Group>
  ))
  .add('Group with Input and multiple Buttons', () => (
    <Group>
      <Button>Clear</Button>
      <Input placeholder="Search" mainInGroup />
      <Button icon="Search" />
      <Button>Cancel</Button>
    </Group>
  ))
  .add('Button group', () => (
    <Group>
      <Button onClick={() => Toast.push('Раз')}>Раз</Button>
      <Button onClick={() => Toast.push('Два')}>Два</Button>
      <Button onClick={() => Toast.push('Три')}>Три</Button>
    </Group>
  ))
  .add('Complex elements', () => (
    <Group>
      <Button icon="Delete" onClick={() => Toast.push('Clear!')} width="10px" />
      <Input
        placeholder="Disabled"
        disabled
        rightIcon={<Icon name="User" />}
        // @ts-ignore
        mainInGroup
      />
      <Button onClick={() => Toast.push('Push!')} error>
        Push
      </Button>
    </Group>
  ));
