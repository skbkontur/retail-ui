import React from 'react';

export interface RadioGroupContextType<T> {
  activeItem: T | undefined;
  onSelect: (value: T) => void;
  name: string;
  disabled: boolean | undefined;
  error: boolean | undefined;
  warning: boolean | undefined;
}

export const RadioGroupContext = React.createContext<RadioGroupContextType<any>>({
  activeItem: undefined,
  onSelect: () => undefined,
  name: '',
  disabled: undefined,
  error: undefined,
  warning: undefined,
});

RadioGroupContext.displayName = 'RadioGroupContext';
