import { useContext } from 'react';

import { RadioGroupContext } from './RadioGroupContext';

export const useRadioGroup = (value?: any) => {
  const radioGroupContext = useContext(RadioGroupContext);

  const isRadioGroupChecked = value === radioGroupContext.activeItem;

  const isInRadioGroup = !!radioGroupContext.name;

  const getIfInRadioGroup = (content: any) => {
    if (isInRadioGroup) {
      return content;
    }

    return null;
  };

  return { isRadioGroupChecked, isInRadioGroup, getIfInRadioGroup, radioGroupContext };
};
