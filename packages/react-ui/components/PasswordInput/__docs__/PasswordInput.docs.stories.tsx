import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { PasswordInput } from '@skbkontur/react-ui';

export default {
  title: 'Input elements/PasswordInput',
  component: PasswordInput,
} as Meta;

export const Example1: Story = () => {
  return (
    <PasswordInput />
  );

};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  return (
    <PasswordInput detectCapsLock />
  );

};
Example2.storyName = 'Отслеживание нажатия CapsLock';

