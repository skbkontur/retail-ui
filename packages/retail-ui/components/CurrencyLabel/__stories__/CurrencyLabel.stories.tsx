import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CurrencyLabel } from '../CurrencyLabel';

storiesOf('CurrencyLabel', module)
  .add('simple', () => <CurrencyLabel value={12356.1} />)
  .add('with currency symbol', () => <CurrencyLabel value={12356.1} currencySymbol={'₽'} />)
  .add('with fraction digits', () => <CurrencyLabel value={12356.1} fractionDigits={3} />);
