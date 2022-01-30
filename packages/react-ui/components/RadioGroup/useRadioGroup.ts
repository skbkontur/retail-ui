import { useContext } from 'react';

import { RadioValue } from '../Radio';

import { RadioGroupContext } from './RadioGroupContext';

export const useRadioGroup = (value?: RadioValue) => {
  const radioGroupContext = useContext(RadioGroupContext);

  const isRadioGroupChecked = value === radioGroupContext.activeItem;

  const isInRadioGroup = !!radioGroupContext.name;

  /**
   * Returns content passed into the argument if called inside of RadioGroup component.
   * @param content Any value that should be accessed only in RadioGroup.
   * @returns Content from argument if inside RadioGroup, else null.
   */
  const returnContentIfInRadioGroup = <T>(content: T) => {
    if (isInRadioGroup) {
      return content;
    }

    return null;
  };

  return { isRadioGroupChecked, isInRadioGroup, returnContentIfInRadioGroup, radioGroupContext };
};
