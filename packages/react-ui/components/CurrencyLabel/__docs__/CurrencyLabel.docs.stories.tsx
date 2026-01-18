import React from 'react';
import { CurrencyLabel, Gapped } from '@skbkontur/react-ui';

import type { Story } from '../../../typings/stories';

export default {
  title: 'Display data/CurrencyLabel',
  component: CurrencyLabel,
  parameters: { creevey: { skip: true } },
};

export const ExampleBasic: Story = () => {
  return <CurrencyLabel value={12345.6} currencySymbol={'₽'} />;
};

/** В пропе `currencySymbol` указывается нужный символ валюты. */
export const ExampleCurrencySymbol: Story = () => {
  return (
    <Gapped vertical>
      <CurrencyLabel value={123.0} />
      <CurrencyLabel value={123.0} currencySymbol={'₽'} />
      <CurrencyLabel value={123.1} currencySymbol={'$'} />
      <CurrencyLabel value={123.2} currencySymbol={'€'} />
    </Gapped>
  );
};
ExampleCurrencySymbol.storyName = 'Символ валюты';

/** Проп `fractionDigits` устанавливает минимальное количество знаков после запятой. */
export const ExampleFractionDigits: Story = () => {
  return <CurrencyLabel value={123456.7} fractionDigits={3} currencySymbol={'₽'} />;
};
ExampleFractionDigits.storyName = 'Минимальное количество знаков после запятой';

/** Проп `hideTrailingZeros` удаляет лишние нули, если они есть в конце значения. */
export const ExampleHideTrailingZeros: Story = () => {
  return <CurrencyLabel value={123.4} hideTrailingZeros />;
};
ExampleHideTrailingZeros.storyName = 'Удаление лишних нулей';
