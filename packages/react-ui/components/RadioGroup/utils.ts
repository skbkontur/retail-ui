import { RadioValue } from '../Radio';

import { RadioGroupRef } from './RadioGroup';

export const getRadioButton = (element: RadioGroupRef['element']) => {
  const radio = element.querySelector('input[type="radio"]:checked') as HTMLInputElement;

  if (!radio || radio.disabled) {
    return element.querySelector('input[type="radio"]:not([disabled])') as HTMLInputElement;
  }

  return radio;
};

export function renderItem(_value: RadioValue, data: React.ReactNode) {
  return data;
}
