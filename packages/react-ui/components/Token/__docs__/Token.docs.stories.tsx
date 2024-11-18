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

/** У разных токенов может быть разный цвет. */
export const Example2: Story = () => {
  const colors = {
    default: {
      idle: 'defaultIdle',
      active: 'defaultActive',
    },
    gray: {
      idle: 'grayIdle',
      active: 'grayActive',
    },
    blue: {
      idle: 'blueIdle',
      active: 'blueActive',
    },
    green: {
      idle: 'greenIdle',
      active: 'greenActive',
    },
    yellow: {
      idle: 'yellowIdle',
      active: 'yellowActive',
    },
    red: {
      idle: 'redIdle',
      active: 'redActive',
    },
    mono: {
      idle: 'white',
      active: 'black',
    },
  };

  return (
    <Gapped gap={20} vertical>
      <Gapped gap={10}>
        <Token colors={colors.default}>Default</Token>
        <Token isActive colors={colors.default}>
          Default
        </Token>
      </Gapped>
      <Gapped gap={10}>
        <Token colors={colors.gray}>Gray</Token>
        <Token isActive colors={colors.gray}>
          Gray
        </Token>
      </Gapped>
      <Gapped gap={10}>
        <Token colors={colors.blue}>Blue</Token>
        <Token isActive colors={colors.blue}>
          Blue
        </Token>
      </Gapped>
      <Gapped gap={10}>
        <Token colors={colors.green}>Green</Token>
        <Token isActive colors={colors.green}>
          Green
        </Token>
      </Gapped>
      <Gapped gap={10}>
        <Token colors={colors.yellow}>Yellow</Token>
        <Token isActive colors={colors.yellow}>
          Yellow
        </Token>
      </Gapped>
      <Gapped gap={10}>
        <Token colors={colors.red}>Red</Token>
        <Token isActive colors={colors.red}>
          Red
        </Token>
      </Gapped>
      <Gapped gap={10}>
        <Token colors={colors.mono}>Monochrome</Token>
        <Token isActive colors={colors.mono}>
          Monochrome
        </Token>
      </Gapped>
    </Gapped>
  );
};
Example2.storyName = 'Цвет токена';

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
