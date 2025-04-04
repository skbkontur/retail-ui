import React from 'react';
import { Token, Gapped } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/TokenInput/Token',
  component: Token,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return <Token>Example</Token>;
};
Example1.storyName = 'Базовый пример';

export const Example3: Story = () => {
  return (
    <Gapped gap={20} vertical>
      <Gapped gap={10}>
        <Token>Correct</Token>
        <Token warning>Warned</Token>
        <Token error>Errored</Token>
      </Gapped>
      <Gapped gap={10}>
        <Token isActive>Correct</Token>
        <Token isActive warning>
          Warned
        </Token>
        <Token isActive error>
          Errored
        </Token>
      </Gapped>
    </Gapped>
  );
};
Example3.storyName = 'Состояние валидации';

export const Example4: Story = () => {
  return (
    <Gapped vertical>
      <Token size="small">Маленький</Token>
      <Token size="medium">Средний</Token>
      <Token size="large">Большой</Token>
    </Gapped>
  );
};
Example4.storyName = 'Размер';
