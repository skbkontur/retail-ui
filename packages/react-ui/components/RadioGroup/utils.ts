import { RadioValue } from '../Radio';

import { RadioGroupRef } from './RadioGroup';

export const getRadioButton = (element: RadioGroupRef['element']) => {
  const radio = element.querySelector('input[type="radio"]:checked') as HTMLInputElement;

  if (!radio || radio.disabled) {
    return element.querySelector('input[type="radio"]:not([disabled])') as HTMLInputElement;
  }

  return radio;
};

export const normalizeEntry = (entry: RadioValue | [RadioValue, React.ReactNode]) => {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }

  return entry;
};
