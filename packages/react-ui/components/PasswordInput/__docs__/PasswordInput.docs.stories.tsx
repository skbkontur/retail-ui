import React from 'react';
import { PasswordInput } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

const meta: Meta = {
  title: 'Input data/PasswordInput',
  component: PasswordInput,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Example1: Story = () => {
  return <PasswordInput />;
};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  return <PasswordInput detectCapsLock />;
};
Example2.storyName = 'Отслеживание нажатия CapsLock';
