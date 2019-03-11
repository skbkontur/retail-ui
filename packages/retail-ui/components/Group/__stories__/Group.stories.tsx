// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Group from '../Group';
import Input from '../../Input';
import Button from '../../Button';
import Toast from '../../Toast';
import UserIcon from '@skbkontur/react-icons/User';
import SearchIcon from '@skbkontur/react-icons/Search';
import DeleteIcon from '@skbkontur/react-icons/Delete';

storiesOf('Group', module)
  .add('Simple Group with Input and Button', () => (
    <Group width="300px">
      <Input placeholder="Search" mainInGroup />
      <Button icon={<SearchIcon />} />
    </Group>
  ))
  .add('Simple Group with custom Inputs width', () => (
    <Group>
      <Input placeholder="Search" width="300px" />
      <Button icon={<SearchIcon />} />
      <Input placeholder="Search" width="100px" />
    </Group>
  ))
  .add('Group with Input and multiple Buttons', () => (
    <Group>
      <Button>Clear</Button>
      <Input placeholder="Search" mainInGroup />
      <Button icon={<SearchIcon />} />
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
      <Button icon={<DeleteIcon />} onClick={() => Toast.push('Clear!')} width="10px" />
      <Input placeholder="Disabled" disabled rightIcon={<UserIcon />} mainInGroup />
      <Button onClick={() => Toast.push('Push!')} error>
        Push
      </Button>
    </Group>
  ));
