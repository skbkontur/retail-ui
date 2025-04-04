import React from 'react';
import { Dropdown, MenuHeader, MenuItem, MenuSeparator, Gapped } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Menu/Dropdown',
  component: Dropdown,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <Dropdown caption="Click">
      <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
      <MenuSeparator />
      <MenuHeader>Here goes the header</MenuHeader>
      <MenuItem onClick={() => alert('Pow')} comment="With comment.">
        Pow
      </MenuItem>
    </Dropdown>
  );
};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  return (
    <Gapped vertical>
      <Dropdown caption="Маленький" size={'small'}>
        <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
        <MenuSeparator />
        <MenuHeader>Here goes the header</MenuHeader>
        <MenuItem onClick={() => alert('Pow')} comment="With comment.">
          Pow
        </MenuItem>
      </Dropdown>
      <Dropdown caption="Средний" size={'medium'}>
        <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
        <MenuSeparator />
        <MenuHeader>Here goes the header</MenuHeader>
        <MenuItem onClick={() => alert('Pow')} comment="With comment.">
          Pow
        </MenuItem>
      </Dropdown>
      <Dropdown caption="Большой" size={'large'}>
        <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
        <MenuSeparator />
        <MenuHeader>Here goes the header</MenuHeader>
        <MenuItem onClick={() => alert('Pow')} comment="With comment.">
          Pow
        </MenuItem>
      </Dropdown>
    </Gapped>
  );
};
Example2.storyName = 'Размер';
