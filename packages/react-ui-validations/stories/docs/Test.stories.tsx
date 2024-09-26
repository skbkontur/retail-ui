import { Meta, Story as St } from '@skbkontur/react-ui/typings/stories';
import { Test } from './Test';
import React from 'react';
import { Story } from '@storybook/react';

export default {
  title: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
  component: Test,
} as Meta;

export const Example1: St = () => <Test />;

export const Default: Story = {};

Default.args = {
  children: 'The Quick Brown Fox Jumps Over The Lazy Dog',
};
