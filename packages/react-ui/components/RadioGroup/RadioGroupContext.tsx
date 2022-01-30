import React from 'react';

import { RadioValue } from '../Radio';

export type RadioGroupContextType = {
  activeItem: RadioValue | undefined;
  onSelect: (value: RadioValue) => void;
  name: string;
  disabled: boolean | undefined;
  error: boolean | undefined;
  warning: boolean | undefined;
};

export const RadioGroupContext = React.createContext<RadioGroupContextType>({
  activeItem: undefined,
  onSelect: () => undefined,
  name: '',
  disabled: undefined,
  error: undefined,
  warning: undefined,
});

RadioGroupContext.displayName = 'RadioGroupContext';
