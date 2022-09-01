import React from 'react';

import { CurrencyLabel } from '../CurrencyLabel';

export default { title: 'CurrencyLabel' };

export const Simple = () => <CurrencyLabel value={12356.1} />;
Simple.storyName = 'simple';

export const WithCurrencySymbol = () => <CurrencyLabel value={12356.1} currencySymbol={'₽'} />;
WithCurrencySymbol.storyName = 'with currency symbol';

export const WithFractionDigits = () => <CurrencyLabel value={12356.1} fractionDigits={3} />;
WithFractionDigits.storyName = 'with fraction digits';

export const WithHideTrailingZeros = () => <CurrencyLabel value={12356.14} fractionDigits={5} hideTrailingZeros />;
WithHideTrailingZeros.storyName = 'with hide trailing zeros';
