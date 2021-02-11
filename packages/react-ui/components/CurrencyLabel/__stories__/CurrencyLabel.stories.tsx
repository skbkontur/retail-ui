import React from 'react';

import { CurrencyLabel } from '../CurrencyLabel';

export default { title: 'CurrencyLabel' };

export const Simple = () => <CurrencyLabel value={12356.1} />;
Simple.story = { name: 'simple' };

export const WithCurrencySymbol = () => <CurrencyLabel value={12356.1} currencySymbol={'₽'} />;
WithCurrencySymbol.story = { name: 'with currency symbol' };

export const WithFractionDigits = () => <CurrencyLabel value={12356.1} fractionDigits={3} />;
WithFractionDigits.story = { name: 'with fraction digits' };
