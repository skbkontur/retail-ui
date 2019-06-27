import { RootValidationRule } from './Types';
import { Validation } from './Validation';

export const createValidation = <T, TExtra = unknown, TSubmit = unknown>(
  rule: RootValidationRule<T, TExtra, TSubmit>,
): Validation<T, TExtra, TSubmit> => {
  return new Validation(rule);
};
