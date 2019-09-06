import { ValidationBuilder } from './ValidationBuilder';
import { ValidationWriter } from './ValidationWriter';
import { RootValidationRule, ValidationRule, ItemValidationRule } from './Types';
import { ValidationReader } from './ValidationReader';
import { PathTokensCache } from './PathHelper';

function validate<T>(data: T, validationRule: RootValidationRule<T>, tokens: PathTokensCache): ValidationReader<T> {
  const validationWriter = new ValidationWriter<T>();
  const builder = new ValidationBuilder<T, T>(validationWriter, tokens, [], data);
  validationRule(builder, data);
  return validationWriter.getReader(tokens);
}

export type Validator<T> = (value: T) => ValidationReader<T>;

export function createValidator<T>(rule: RootValidationRule<T>): Validator<T> {
  const tokens = new PathTokensCache();
  return (value: T): ValidationReader<T> => {
    return validate(value, rule, tokens);
  };
}

export { ValidationReader, ValidationBuilder, RootValidationRule, ValidationRule, ItemValidationRule };
