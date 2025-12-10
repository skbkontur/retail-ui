import React from 'react';
import { PasswordInput } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/PasswordInput',
  component: PasswordInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  return <PasswordInput />;
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `detectCapsLock` визуально покажет пользователю, что клавиша CapsLock активна. */
export const ExampleDetectCapsLock: Story = () => {
  return <PasswordInput detectCapsLock />;
};
ExampleDetectCapsLock.storyName = 'Индикатор включения CapsLock';
