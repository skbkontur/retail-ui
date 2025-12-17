import React from 'react';
import { Token, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/TokenInput/Token',
  component: Token,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  return <Token>mail@example.ru</Token>;
};

/** Проп `size` задаёт размер токена. По умолчанию `"small"`. */
export const ExampleSize: Story = () => {
  return (
    <Gapped vertical>
      <Token size="small">Маленький</Token>
      <Token size="medium">Средний</Token>
      <Token size="large">Большой</Token>
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `isActive` переводит токен в активное состояние. По умолчанию, это происходит, когда токен находится в фокусе. */
export const ExampleIsActive: Story = () => {
  return (
    <Gapped vertical>
      <Token>Обычный</Token>
      <Token isActive>Активный</Token>
    </Gapped>
  );
};
ExampleIsActive.storyName = 'Активный токен';

/** Проп `disabled` блокирует токен. */
export const ExampleDisabled: Story = () => {
  return <Token disabled>mail@example.ru</Token>;
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `error` меняет визуальное отображение поля на состояние ошибки, а `warning` — на предупреждение. */
export const ExampleErrorWarning: Story = () => {
  return (
    <Gapped gap={10}>
      <Token>Обычный</Token>
      <Token error>С ошибкой</Token>
      <Token warning>Предупреждающий</Token>
    </Gapped>
  );
};
ExampleErrorWarning.storyName = 'Состояния ошибки и предупреждения';
