import { Gapped, Token } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Input data/TokenInput',
  component: Token,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleTokenBasic: Story = () => {
  return <Token>mail@example.ru</Token>;
};

/** Проп `size` задаёт размер токена. */
export const ExampleTokenSize: Story = () => {
  return (
    <Gapped vertical>
      <Token size="small">Маленький</Token>
      <Token size="medium">Средний</Token>
      <Token size="large">Большой</Token>
    </Gapped>
  );
};
ExampleTokenSize.storyName = 'Размер';

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
export const ExampleTokenDisabled: Story = () => {
  return <Token disabled>mail@example.ru</Token>;
};
ExampleTokenDisabled.storyName = 'Состояние блокировки';

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
