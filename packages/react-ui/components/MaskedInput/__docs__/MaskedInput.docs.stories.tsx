import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { MaskedInput } from '@skbkontur/react-ui';

export default {
  title: 'Input elements/MaskedInput',
  component: MaskedInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <MaskedInput mask={'+7 999 999-99-99'} placeholder={"Номер телефона"} />
  );

};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  return (
    <MaskedInput mask={'9999 9999 9999 9999'} maskChar={'X'} placeholder={"Номер карты"}  />
  );

};
Example2.storyName = 'Изменение символа значения с маской';

/** **alwaysShowMask** позволяет показывать маску всегда. Placeholder в этом случае игнорируется. */
export const Example3: Story = () => {
  return (
    <MaskedInput mask={'9999 9999 9999 9999'} alwaysShowMask maskChar={'X'} placeholder={"Номер карты"} />
  );

};
Example3.storyName = 'Всегда показывать маску';

