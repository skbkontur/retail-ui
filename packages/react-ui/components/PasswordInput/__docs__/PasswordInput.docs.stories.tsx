import React from 'react';
import { PasswordInput } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Input data/PasswordInput/index.js',
  component: PasswordInput,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return <PasswordInput />;
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `detectCapsLock` визуально покажет пользователю, что клавиша CapsLock активна. */
export const ExampleDetectCapsLock: Story = () => {
  return <PasswordInput detectCapsLock />;
};
ExampleDetectCapsLock.storyName = 'Индикатор включения CapsLock';
