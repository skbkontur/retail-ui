import React from 'react';
import { Story } from '../../../typings/stories';

import { CurrencyLabel } from '@skbkontur/react-ui';

export default {
  title: 'Display data/CurrencyLabel',
  component: CurrencyLabel,
  parameters: { creevey: { skip: true } },
};

export const Example1: Story = () => {
  return (
    <CurrencyLabel value={12356.1} currencySymbol={'₽'} />
  );

};
Example1.storyName = 'To render rubles';

export const Example2: Story = () => {
  return (
    <CurrencyLabel value={12356.1} currencySymbol={'$'} />
  );

};
Example2.storyName = '...or dollars';

export const Example3: Story = () => {
  return (
    <CurrencyLabel value={12356.1} />
  );

};
Example3.storyName = '...or nothing';

export const Example4: Story = () => {
  return (
    <CurrencyLabel value={3562001.1} fractionDigits={3} currencySymbol={'₽'} />
  );

};
Example4.storyName = 'Count of fraction digits can be changed';

export const Example5: Story = () => {
  return (
    <CurrencyLabel value={356.167} fractionDigits={5} hideTrailingZeros />
  );

};
Example5.storyName = 'Can hide trailing zeros';

