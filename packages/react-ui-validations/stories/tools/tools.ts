import React from 'react';

import { Nullable } from '../../typings/Types';
import { ValidationContainer, ValidationInfo } from '../../src';

export const validateValue = (
  value: string,
  condition = true,
  message: React.ReactNode = ``,
): Nullable<ValidationInfo> => {
  if (value === '') {
    return { message: 'Должно быть не пусто', type: 'submit' };
  }
  if (condition) {
    return { message, type: 'lostfocus' };
  }
  return null;
};

export const submit = (container: ValidationContainer | null): Promise<void> | void => {
  if (container) {
    return container.submit();
  }
};

export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
